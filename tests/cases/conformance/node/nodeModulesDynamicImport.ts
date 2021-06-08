// @module: node12,nodenext
// @declaration: true
// @filename: subfolder/index.ts
// cjs format file
export async function main() {
    const { readFile } = await import("fs");
}
// @filename: index.ts
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