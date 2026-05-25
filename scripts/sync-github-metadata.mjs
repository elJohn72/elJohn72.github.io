import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const curatedPath = join(root, 'src/data/curated-projects.json');
const outputPath = join(root, 'src/data/projects.json');

const curated = JSON.parse(readFileSync(curatedPath, 'utf-8'));

async function fetchRepo(owner, name, token) {
  const headers = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'eljohn72-portfolio-sync',
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`https://api.github.com/repos/${owner}/${name}`, { headers });
  if (!res.ok) {
    console.warn(`Warning: could not fetch ${owner}/${name} (${res.status})`);
    return null;
  }
  return res.json();
}

async function main() {
  const token = process.env.GITHUB_TOKEN;
  const merged = [];

  for (const project of curated) {
    if (!project.repo) {
      merged.push({
        ...project,
        stars: 0,
        forks: 0,
        updatedAt: new Date().toISOString(),
        githubDescription: null,
        htmlUrl: project.demoUrl ?? '#',
      });
      continue;
    }

    const [owner, name] = project.repo.split('/');
    let github = null;
    try {
      github = await fetchRepo(owner, name, token);
    } catch (err) {
      console.warn(`Warning: fetch failed for ${project.repo}`, err.message);
    }

    merged.push({
      ...project,
      stars: github?.stargazers_count ?? 0,
      forks: github?.forks_count ?? 0,
      updatedAt: github?.updated_at ?? new Date().toISOString(),
      githubDescription: github?.description ?? null,
      htmlUrl: github?.html_url ?? `https://github.com/${project.repo}`,
    });

    await new Promise((r) => setTimeout(r, 120));
  }

  writeFileSync(outputPath, JSON.stringify(merged, null, 2) + '\n');
  console.log(`Synced ${merged.length} projects → src/data/projects.json`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
