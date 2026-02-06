// @target: es2015
class C<T> {

}
class D<T> extends C<number> extends C<string> {
    baz() { }
}