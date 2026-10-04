// @target: es2015
// @module: commonjs
const cat = 12;
class Foo {}
export = Foo;
declare namespace Foo {
    export { cat };
}