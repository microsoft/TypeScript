// @target: es5, es2015
class Base {
}
class C extends Base {
    [(super(), "prop")]() { }
}