// @target: es5
class Base {
}
class C extends Base {
    [(super(), "prop")]() { }
}