///<reference path="fourslash.ts"/>

////interface Source {
////  /*def*/alpha: number;
////  beta: string;
////}
////
////// Transforming interface field names with a suffix
////type Transformed<T> = {
////  [K in keyof T as `${K & string}Suffix`]: () => T[K];
////};
////
////type Result = Transformed<Source>;
/////*
////  Expected:
////  {
////    alphaSuffix: () => number;
////    betaSuffix: () => string;
////  }
////  */
////
////const obj: Result = {
////  alphaSuffix: () => 42,
////  betaSuffix: () => "hello",
////};
////
////// ❌ In VSCode, "Go to Definition" on `alphaSuffix` does not navigate to `alpha` in `Source`
////obj.[|/*ref*/alphaSuffix|]();

verify.baselineGoToDefinition("ref");
