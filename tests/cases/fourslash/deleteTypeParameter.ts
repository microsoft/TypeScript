/// <reference path="fourslash.ts" />

//// interface Query<T> {
////     groupBy(): Query</**/T>;
//// }
//// interface Query2<T> {
////     groupBy(): Query2<Query<T>>;
//// }
//// var q1: Query<number>;
//// var q2: Query2<number>;
//// q1 = q2;

goTo.marker();
edit.deleteAtCaret(1);
