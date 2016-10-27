// @allowjs: false
// @allowNonTsExtensions: true
// @outDir: dist
// @Filename: data.json
{
    "a": "a",
    "b": 42
}

// @Filename: m.ts
const data = require("./data");
const a = data.a;
const b = data.b;

// @Filename: node.d.ts
interface NodeRequireFunction {
    (id: string): any;
}
interface NodeRequire extends NodeRequireFunction {
}
declare var require: NodeRequire;