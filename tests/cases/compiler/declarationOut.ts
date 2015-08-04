// @declaration: true
// @declarationOut: bin/declaration.out.d.ts
// @module: commonjs
// @outdir: declarationOut

// @filename: declarationOut/fileA.ts
export default class A {
}

// @filename: declarationOut/fileB.ts
import A from "fileA";
export default class B {
    getA() {
        return new A();
    }
}

// @filename: declarationOut/fileC.ts
import B from "./fileB";
export default class C {
    getB() {
        return new B();
    }
}

// @filename: declarationOut/global.ts
var global = {};