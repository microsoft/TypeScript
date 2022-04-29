
// @Filename: exp.ts
var x = {
    "greeting": "hello, world",
    "default": 42
};

export = x

// @Filename: imp.ts
import foo from "./exp";
foo.toExponential(2);
