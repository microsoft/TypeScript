//@module: amd

class D { }
export = D;

declare module "ext" {
    export class C { }
}

// Cannot resolve this ext module reference
import ext = require("ext");
var x = ext;