const fs = require("fs");
const path = require("path");

const outDir = path.join(process.cwd(), "out");

function walkAndCleanTxt(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      walkAndCleanTxt(full);
      continue;
    }
    if (!ent.isFile()) continue;
    const lower = ent.name.toLowerCase();
    if (lower.endsWith(".txt") && lower !== "robots.txt") {
      fs.unlinkSync(full);
    }
  }
}

if (!fs.existsSync(outDir)) {
  process.exit(0);
}

walkAndCleanTxt(outDir);
