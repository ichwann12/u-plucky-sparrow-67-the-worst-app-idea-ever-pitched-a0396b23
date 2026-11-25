// Napkin — the worst app idea ever pitched.
// Reads the entry sentence from entry.txt at the repo root and writes it
// to entry.txt in the harness output directory. Node stdlib only, no
// network, no wall clock.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(fileURLToPath(import.meta.url));
const text = readFileSync(join(repoRoot, "entry.txt"), "utf8").trim();

// The gate requires 1 to 240 characters; refuse to write an invalid entry.
if (text.length < 1 || text.length > 240) {
  throw new Error(`entry.txt must be 1-240 characters, got ${text.length}`);
}

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR ??
  process.env.MAKEFUN_BOT_DIR ??
  "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), text + "\n", "utf8");
