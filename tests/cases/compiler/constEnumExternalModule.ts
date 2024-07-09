//@module: amd
//@Filename: m1.ts
const enum E {
    V = 100
}

export = E
//@Filename: m2.ts
import A = require('m1')
var v = A.V;