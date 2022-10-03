interface callable2<T> {
    (a: T): T;
    <Z>(a: T): Z;
}
var c2: callable2<number>;
c2<string>(1);