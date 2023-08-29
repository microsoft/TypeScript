/// <reference path="fourslash.ts" />

// @strict: true

//// // https://github.com/microsoft/TypeScript/issues/55545
//// enum myEnum {
////   valA = "valA",
////   valB = "valB",
//// }
////
//// interface myEnumParamMapping {
////   ["valA"]: "1" | "2";
////   ["valB"]: "3" | "4";
//// }
////
//// function myFunction<K extends keyof typeof myEnum>(
////   a: K,
////   b: myEnumParamMapping[K],
//// ) {}
////
//// myFunction("valA", "/*ts1*/");
//// myFunction("valA", `/*ts2*/`);
////
//// function myFunction2<K extends keyof typeof myEnum>(
////   a: K,
////   { b }: { b: myEnumParamMapping[K] },
//// ) {}
////
//// myFunction2("valA", { b: "/*ts3*/" });
//// myFunction2("valA", { b: `/*ts4*/` });

verify.completions({
    marker: ["ts1", "ts2", "ts3", "ts4"],
    exact: ["1", "2"]
});
