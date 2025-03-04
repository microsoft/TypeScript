/// <reference path="./fourslash.ts"/>

////type ToGet<T> = T extends string ? `get${Capitalize<T>}` : never;
////type Getters<T> = /** @inheritDoc desc on Getters */ { 
////    [P in keyof T as ToGet<P>]: () => T[P]
////};
////
////type Y = {
////    /** hello  */
////    d: string;
////}
////
////type T50 = Getters<Y>;  // { getFoo: () => string, getBar: () => number }
////
////declare let y: T50;
////y.get/*3*/D;

verify.quickInfoAt("3", "(property) getD: () => string", "desc on Getters\nhello");
