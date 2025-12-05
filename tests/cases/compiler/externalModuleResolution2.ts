//@module: commonjs
// @Filename: foo.ts
namespace M2 {
    export var X = 1;
}
export = M2

// @Filename: foo.d.ts
declare namespace M1 {
    export var Y:number;
}
export = M1


// @Filename: consumer.ts
import x = require('./foo');
x.X // .ts should be picked