#!/usr/bin/env node
/**
 * Netlify build: build Quartz notes, copy into main site, then build main site.
 */
import { execSync } from "node:child_process";
import { cpSync, mkdirSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

function run(cmd, cwd = root) {
  console.log(`\n> ${cmd}`);
  execSync(cmd, { cwd, stdio: "inherit" });
}

console.log("=== Building Quartz notes ===");
run("npm ci", path.join(root, "quartz"));
run("npx quartz build", path.join(root, "quartz"));

console.log("\n=== Copying Quartz output to main-site/public/content ===");
const contentDir = path.join(root, "main-site", "public", "content");
rmSync(contentDir, { recursive: true, force: true });
mkdirSync(contentDir, { recursive: true });
cpSync(path.join(root, "quartz", "public"), contentDir, { recursive: true });

console.log("\n=== Building main site ===");
run("npm ci", path.join(root, "main-site"));
run("npm run build", path.join(root, "main-site"));

console.log("\n=== Build complete. Publish directory: main-site/dist ===");
