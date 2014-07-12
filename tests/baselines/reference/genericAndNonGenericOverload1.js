//// [genericAndNonGenericOverload1.ts]
interface callable2<T> {
    (a: T): T;
    <Z>(a: T): Z;
}
var c2: callable2<number>;
c2<string>(1);

//// [genericAndNonGenericOverload1.js]
var c2;
c2(1);
