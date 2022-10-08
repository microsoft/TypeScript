// @target: ESNext
// @module: ESNext
// @moduleResolution: NodeNext
// @strict: true

// @filename: package.json
{
    "name": "test",
    "version": "1.0.0",
    "description": "",
    "type": "module",
    "module": "index.mjs"
}

// @filename: index.mts
import * as namespaceImport from "./other.cjs";
console.log(namespaceImport);


// @filename: other.cjs 
module.exports.test = () => 5;

// @filename: other.d.cts
declare const __: symbol;
export = __;
