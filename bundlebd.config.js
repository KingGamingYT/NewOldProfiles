const { defineConfig } = require("bundlebd");
const fs = require("fs");
const tsconfig = JSON.parse(
  fs.readFileSync('tsconfig.json', 'utf8')
);

const paths = tsconfig.compilerOptions?.paths ?? {};

const mapped = Object.fromEntries(
  Object.entries(paths).map(([path, values]) => [
    path,
    values[0]
  ])
);

module.exports = defineConfig({
	input: "src",
	output: "dist",
	importAliases: mapped
});