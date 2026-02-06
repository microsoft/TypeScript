// @target: es2015
class foo<T> { constructor(x: T) { } }
namespace foo {
    export var x: T;
    var y = <T>1;
}
