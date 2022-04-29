interface I1<T> extends I2<string> { }
interface I2<T> extends I1<T> { }
class X<T, U> implements I2<T> { }
(new X).blah;