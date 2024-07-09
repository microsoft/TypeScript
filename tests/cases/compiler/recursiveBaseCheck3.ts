class A<T> extends C<T> { }
class C<T> extends A<T> { }

(new C).blah;