// @module: node12,nodenext
// @declaration: true
// @allowJs: true
// @checkJs: true
// @outDir: out
// @filename: subfolder/index.js
// cjs format file
export async function main() {
    const { readFile } = await import("fs");
}
// @filename: index.js
// esm format file
export async function main() {
    const { readFile } = await import("fs");
}
// @filename: package.json
{
    "name": "package",
    "private": true,
    "type": "module"
}
// @filename: subfolder/package.json
{
    "type": "commonjs"
}
// @filename: types.d.ts
declare module "fs";