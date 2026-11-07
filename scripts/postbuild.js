import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, "..")
const distDir = path.join(rootDir, "dist")
const projectsDir = path.join(rootDir, "src", "projects")

// 1. Copy projects directory to dist/projects
if (fs.existsSync(projectsDir)) {
  const distProjectsDir = path.join(distDir, "projects")
  fs.cpSync(projectsDir, distProjectsDir, { recursive: true })
  console.log("✓ Copied src/projects/ to dist/projects/")
}

// 2. Preserve standalone freelancer iframe entry points as app.html
// On case-insensitive filesystems (macOS/Windows), dist/freelancer/f1 and dist/freelancer/F1
// share the same directory, so writing the SPA fallback to index.html would overwrite the iframe HTML.
const standaloneApps = ["F1", "MINARD"]
for (const appName of standaloneApps) {
  const srcAppHtml = path.join(rootDir, "public", "freelancer", appName, "index.html")
  const publicAppCopy = path.join(rootDir, "public", "freelancer", appName, "app.html")
  const distAppHtml = path.join(distDir, "freelancer", appName, "app.html")
  if (fs.existsSync(srcAppHtml)) {
    fs.copyFileSync(srcAppHtml, publicAppCopy)
    fs.mkdirSync(path.dirname(distAppHtml), { recursive: true })
    fs.copyFileSync(srcAppHtml, distAppHtml)
  }
}

// 3. Read dist/index.html
const indexHtmlPath = path.join(distDir, "index.html")
if (!fs.existsSync(indexHtmlPath)) {
  console.error("dist/index.html does not exist!")
  process.exit(1)
}
const indexHtml = fs.readFileSync(indexHtmlPath, "utf8")

// 4. Static fallback routes for static web servers (e.g. Live Server, GitHub Pages, Apache)
const routes = [
  "freelancer",
  "freelancer/f1",
  "freelancer/minard",
  "f1-circuits",
  "gisp-test",
]

// Add all job IDs from 01 to 22
for (let i = 1; i <= 22; i++) {
  const id = String(i).padStart(2, "0")
  routes.push(`job/${id}`)
}

for (const route of routes) {
  const routeDir = path.join(distDir, route)
  fs.mkdirSync(routeDir, { recursive: true })
  fs.writeFileSync(path.join(routeDir, "index.html"), indexHtml, "utf8")
  const routeHtml = path.join(distDir, `${route}.html`)
  fs.mkdirSync(path.dirname(routeHtml), { recursive: true })
  fs.writeFileSync(routeHtml, indexHtml, "utf8")
}

// 4. Create dist/404.html for static SPA hosts (GitHub Pages, Netlify, etc.)
fs.writeFileSync(path.join(distDir, "404.html"), indexHtml, "utf8")

console.log(`✓ Generated static SPA fallbacks for ${routes.length} routes + 404.html`)
