//// [genericConstraintSatisfaction1.ts]
interface I<S> {
   f: <T extends S>(x: T) => void
}
 
var x: I<{s: string}>
x.f({s: 1})


//// [genericConstraintSatisfaction1.js]
var x;
x.f({ s: 1 });
