//@module: commonjs
// @Filename: foo.d.ts
declare module M1 {
    export var X:number;
}
export = M1

// @Filename: foo.ts
module M2 {
    export var Y = 1;
}
export = M2

// @Filename: consumer.ts
import x = require('./foo');
x.Y // .ts should be picked