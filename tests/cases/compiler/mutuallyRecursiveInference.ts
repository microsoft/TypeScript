class T<A> {
    a: A;
    b: any
}
class L<RT extends { a: 'a' | 'b', b: any }> extends T<RT[RT['a']]> {
    m() { this.a }
}
class X extends L<X> {
    a: 'a' | 'b'
    b: number
    m2() {
        this.a
    }
}
