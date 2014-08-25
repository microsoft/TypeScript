//@module: commonjs
// @Filename: foo.ts
module M2 {
    export var X = 1;
}
export = M2


// @Filename: consumer.ts
import x = require('./foo');
x.X // .ts should be picked