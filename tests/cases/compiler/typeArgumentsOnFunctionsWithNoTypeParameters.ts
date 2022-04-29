function foo<T, U>(f: (v: T) => U) {
   var r1 = f<number>(1);
   var r2 = f(1);
   var r3 = f<any>(null);
   var r4 = f(null);
}
