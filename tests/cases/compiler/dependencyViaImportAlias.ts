//@module: amd
//@Filename: A.ts
export class A {
}
//@Filename: B.ts
import a = require('A');

import A = a.A;

export = A;