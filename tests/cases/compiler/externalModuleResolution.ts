//@module: commonjs
// @Filename: foo.d.ts
declare namespace M1 {
    export var X:number;
}
export = M1

// @Filename: foo.ts
namespace M2 {
    export var Y = 1;
}
export = M2

// @Filename: consumer.ts
import x = require('./foo');
x.Y // .ts should be picked