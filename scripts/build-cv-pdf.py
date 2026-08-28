# -*- coding: utf-8 -*-
"""Genera el PDF de la hoja de vida desde src/data/cv.json.

    python3 scripts/build-cv-pdf.py

Salida: public/cv/hoja-de-vida-john-miraba-2026.pdf

El layout FLUYE (sin altura fija): si el contenido crece, se añaden páginas en
vez de recortarse en silencio. Verificar siempre el número de páginas al final.
Requiere Google Chrome instalado (motor de impresión).
"""
import base64, io, json, os, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

cv = json.load(io.open(os.path.join(ROOT, 'src/data/cv.json'), encoding='utf-8'))
profile = json.load(io.open(os.path.join(ROOT, 'src/data/profile.json'), encoding='utf-8'))

with open(os.path.join(ROOT, 'public/images/profile.png'), 'rb') as f:
    PHOTO = 'data:image/png;base64,' + base64.b64encode(f.read()).decode()

DATOS = {
    'tel': '+593 98 726 6751',
    'dir': 'Nelson Valencia y 24 de Mayo · 080401 Quinindé, Esmeraldas',
    'nac': '25 de enero de 1994 · Ecuatoriano',
}

def esc(s):
    return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')

def loc(v, k='es'):
    return v[k] if isinstance(v, dict) else v

# ── Columna lateral ────────────────────────────────────────────
side = ['<div class="photo-wrap"><img src="%s" alt=""></div>' % PHOTO,
        '<h1 class="name">John Jayro<br>Miraba Nieves</h1>',
        '<p class="role">%s</p>' % esc(cv['headline']['es']),
        '<h2>Contacto</h2><ul class="plain">']
for t in [profile['email'], DATOS['tel'], DATOS['dir'], DATOS['nac']]:
    side.append('<li>%s</li>' % esc(t))
side.append('</ul>')

side.append('<h2>Enlaces y redes</h2><ul class="plain links">')
enlaces = [('github.com/elJohn72', profile['social']['github']),
           ('eljohn72.github.io', 'https://eljohn72.github.io'),
           ('ajtecnology.com', 'https://ajtecnology.com'),
           ('ajdent.site', 'https://ajdent.site'),
           ('linkedin.com/in/john-miraba', profile['social']['linkedin']),
           ('WhatsApp ' + DATOS['tel'], cv['whatsapp']['url'])]
for red, clave in [('Instagram', 'instagram'), ('TikTok', 'tiktok'), ('YouTube', 'youtube'), ('Facebook', 'facebook')]:
    if clave in profile['social']:
        enlaces.append((red, profile['social'][clave]))
for txt, url in enlaces:
    side.append('<li><a href="%s">%s</a></li>' % (url, esc(txt)))
side.append('</ul>')

side.append('<h2>Idiomas</h2><ul class="plain">')
for lg in cv['languages']:
    side.append('<li>%s — %s</li>' % (esc(lg['locales']['es']), esc(lg['level']['es'])))
side.append('</ul>')

side.append('<h2>Stack técnico</h2>')
for g in cv['stackGroups']:
    side.append('<div class="sgrp"><p class="grp">%s</p><p class="tags">%s</p></div>'
                % (esc(g['locales']['es']), ' · '.join(esc(i) for i in g['items'])))

side.append('<h2>Certificados</h2><ul class="plain">')
for c in ['Certificación en Higienista Dental (2023)',
          'Certificado de inglés — Nivel B1',
          'Jornada pedagógica de robótica (Líderes)',
          'Seguridad Industrial, SSO y Ambiente — Enkador (2018)',
          'Nuevas Tecnologías XL y Montaje de Rodamientos — INA FAG (2018)']:
    side.append('<li>%s</li>' % esc(c))
side.append('</ul>')

# ── Columna principal ──────────────────────────────────────────
main = ['<h2 class="m">Perfil</h2><p class="lead">%s</p>' % esc(cv['pitch']['es']), '<div class="kpis">']
for m in cv['metrics']:
    main.append('<div class="kpi"><span class="kpi-v">%s%s</span><span class="kpi-l">%s</span></div>'
                % (m['value'], esc(m['suffix']), esc(m['locales']['es']['label'])))
main.append('</div>')

main.append('<h2 class="m">Experiencia</h2>')
for x in cv['experience']:
    main.append('<div class="job">'
                '<p class="j-head"><span class="j-role">%s</span><span class="j-date">%s — %s</span></p>'
                '<p class="j-org">%s · %s</p><p class="j-sum">%s</p><ul class="j-b">%s</ul>'
                '<p class="j-stack">%s</p></div>'
                % (esc(x['role']['es']), esc(x['start']), esc(loc(x['end'])), esc(x['org']), esc(x['place']),
                   esc(x['summary']['es']),
                   ''.join('<li>%s</li>' % esc(b) for b in x['bullets']['es']),
                   ' · '.join(esc(s) for s in x['stack'])))

main.append('<h2 class="m">Portafolio de proyectos</h2><div class="projs">')
for p in cv['projects']:
    link = p['url'] or p['repo']
    tail = '<span class="p-link">%s</span>' % esc(link.replace('https://', '')) if link else ''
    main.append('<div class="proj"><p class="p-n">%s <span class="p-st st-%s">%s</span></p>'
                '<p class="p-meta">%s · %s</p><p class="p-d">%s</p>'
                '<p class="j-stack">%s</p>%s</div>'
                % (esc(p['name']), p['status'], esc(cv['projectStatus'][p['status']]['es']),
                   esc(p['year']), esc(p['role']['es']), esc(p['locales']['es']),
                   ' · '.join(esc(s) for s in p['stack']), tail))
main.append('</div>')

main.append('<h2 class="m">Formación</h2>')
for e in cv['education']:
    main.append('<div class="edu"><p class="j-head"><span class="j-role">%s</span>'
                '<span class="j-date">%s</span></p><p class="j-org">%s · %s</p>'
                '<p class="j-sum">%s</p></div>'
                % (esc(e['degree']['es']), esc(e['period']['es']), esc(loc(e['school'])),
                   esc(e['place']), esc(e['note']['es'])))

main.append('<h2 class="m">Cursos y capacitaciones</h2><div class="courses">')
for g in cv['courseGroups']:
    main.append('<div class="cgrp"><p class="grp">%s</p><ul class="plain small">%s</ul></div>'
                % (esc(g['locales']['es']), ''.join('<li>%s</li>' % esc(i) for i in g['items'])))
main.append('</div>')

CSS = """
@page { size: A4; margin: 0; }
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; color: #22272f;
       font-size: 8.4pt; line-height: 1.45; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.sheet { display: flex; width: 210mm; min-height: 297mm; }
aside { width: 62mm; flex: 0 0 62mm; background: #0b1b33; color: #cfd9e6; padding: 10mm 7mm; }
main  { flex: 1; padding: 11mm 9mm 10mm 8mm; }

.photo-wrap { width: 34mm; height: 34mm; margin: 0 auto 5mm; border-radius: 50%;
              overflow: hidden; border: 2.2pt solid #2ea6ff; }
.photo-wrap img { width: 100%; height: 100%; object-fit: cover; object-position: top; display: block; }
.name { font-size: 16pt; line-height: 1.12; color: #fff; font-weight: 700; letter-spacing: -0.2pt; }
.role { margin-top: 2mm; font-size: 7.6pt; color: #6fc4ff; line-height: 1.35; }

aside h2 { margin: 6mm 0 1.8mm; font-size: 8.4pt; color: #fff; text-transform: uppercase;
           letter-spacing: 0.9pt; padding-bottom: 1.2mm; border-bottom: 0.6pt solid #2ea6ff66; }
main h2.m { margin: 5.5mm 0 2.2mm; font-size: 11pt; color: #0b1b33; font-weight: 700;
            padding-bottom: 1.2mm; border-bottom: 0.8pt solid #2ea6ff; }
main h2.m:first-child { margin-top: 0; }

ul.plain { list-style: none; }
ul.plain li { margin-bottom: 1.1mm; font-size: 7.7pt; line-height: 1.38; }
ul.plain.small li { margin-bottom: 0.7mm; font-size: 7.2pt; }
.links a { color: #6fc4ff; text-decoration: none; }
.grp { margin-top: 2.4mm; font-size: 7.4pt; font-weight: 700; color: #2ea6ff; }
aside .tags { font-size: 7pt; line-height: 1.4; color: #a8b7c9; }
.sgrp { break-inside: avoid; page-break-inside: avoid; }
main .grp { color: #0b1b33; margin-top: 0; margin-bottom: 1mm; }

.lead { font-size: 8.6pt; line-height: 1.5; text-align: justify; }

.kpis { display: flex; flex-wrap: wrap; gap: 2mm; margin: 3.5mm 0 1mm; }
.kpi { flex: 1 1 30%; border: 0.6pt solid #d3dceb; border-left: 2pt solid #2ea6ff;
       border-radius: 1.4mm; padding: 1.8mm 2.2mm; background: #f6f9fd; }
.kpi-v { display: block; font-size: 12.5pt; font-weight: 700; color: #0b1b33; line-height: 1.1; }
.kpi-l { display: block; font-size: 6.6pt; color: #55606f; line-height: 1.3; margin-top: 0.4mm; }

.job, .edu { margin-bottom: 3.4mm; break-inside: avoid; page-break-inside: avoid; }
.j-head { display: flex; justify-content: space-between; align-items: baseline; gap: 3mm; }
.j-role { font-size: 9.2pt; font-weight: 700; color: #0b1b33; }
.j-date { font-size: 6.9pt; color: #7a8698; white-space: nowrap; letter-spacing: 0.3pt; }
.j-org  { font-size: 7.6pt; color: #2f7fc4; font-weight: 600; margin-top: 0.2mm; }
.j-sum  { font-size: 8pt; margin-top: 0.9mm; line-height: 1.42; }
.j-b    { list-style: none; margin-top: 1.2mm; }
.j-b li { font-size: 7.8pt; line-height: 1.42; padding-left: 3.1mm; position: relative; margin-bottom: 0.7mm; }
.j-b li::before { content: ""; position: absolute; left: 0; top: 1.35mm;
                  width: 1.1mm; height: 1.1mm; border-radius: 50%; background: #2ea6ff; }
.j-stack { margin-top: 1mm; font-size: 6.8pt; color: #7a8698; letter-spacing: 0.15pt; }

.projs, .courses { display: flex; flex-wrap: wrap; gap: 2.4mm; }
.proj { flex: 1 1 46%; border: 0.6pt solid #e0e7f1; border-radius: 1.4mm; padding: 2mm 2.4mm;
        break-inside: avoid; page-break-inside: avoid; }
.p-n { font-size: 8.2pt; font-weight: 700; color: #0b1b33; }
.p-st { display: inline-block; font-size: 5.8pt; font-weight: 700; text-transform: uppercase;
        letter-spacing: 0.4pt; padding: 0.3mm 1mm; border-radius: 0.8mm; vertical-align: 0.4mm; }
.st-produccion { background: #dcfce7; color: #15803d; }
.st-desarrollo { background: #cffafe; color: #0e7490; }
.st-validacion { background: #fef3c7; color: #b45309; }
.st-publico    { background: #ede9fe; color: #6d28d9; }
.st-programa   { background: #e2e8f0; color: #475569; }
.p-meta { font-size: 6.4pt; color: #7a8698; text-transform: uppercase; letter-spacing: 0.3pt; margin-top: 0.4mm; }
.p-link { display: block; font-size: 6.6pt; color: #2f7fc4; margin-top: 0.8mm; }
.p-d { font-size: 7.4pt; line-height: 1.38; margin-top: 0.8mm; }
.cgrp { flex: 1 1 46%; break-inside: avoid; page-break-inside: avoid; margin-bottom: 1mm; }
"""

html = ('<!doctype html><html lang="es"><head><meta charset="utf-8">'
        '<title>Hoja de vida — John Miraba</title><style>%s</style></head>'
        '<body><div class="sheet"><aside>%s</aside><main>%s</main></div></body></html>'
        % (CSS, '\n'.join(side), '\n'.join(main)))

tmp_html = os.path.join(ROOT, 'public/cv/.cv-build.html')
out_pdf = os.path.join(ROOT, 'public/cv/hoja-de-vida-john-miraba-2026.pdf')
io.open(tmp_html, 'w', encoding='utf-8').write(html)

if not os.path.exists(CHROME):
    sys.exit('No se encontró Google Chrome en %s' % CHROME)
if os.path.exists(out_pdf):
    os.remove(out_pdf)
subprocess.run([CHROME, '--headless', '--disable-gpu', '--no-pdf-header-footer',
                '--print-to-pdf=' + out_pdf, 'file://' + tmp_html], check=True, capture_output=True)
os.remove(tmp_html)
print('PDF generado:', out_pdf, os.path.getsize(out_pdf), 'bytes')
