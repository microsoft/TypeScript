// @target: es6
class Base {
}
class C extends Base {
    [(super(), "prop")]() { }
}