// @declaration: true

class X<T> {
}
class C extends X<() => number> {
}
interface I extends X<() => number> {
}

