/// <reference types="node" />

if (process.argv.length < 3) {
    process.exit(1);
}
const directoryName = process.argv[2];
const fs: { watch(directoryName: string, options: any, callback: () => {}): any } = require("fs");
fs.watch(directoryName, { recursive: true }, () => ({})).close();
process.exit(0);