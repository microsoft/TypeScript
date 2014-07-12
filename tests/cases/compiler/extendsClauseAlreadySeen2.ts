class C<T> {

}
class D<T> extends C<number> extends C<string> {
    baz() { }
}