///<reference path="fourslash.ts" />

////interface One {
////    commonProperty: string;
////    commonFunction(): number;
////    anotherProperty: Record<string, number>;
////}
////
////interface Two {
////    commonProperty: number;
////    commonFunction(): number;
////    anotherProperty: { foo: number }
////}
////
////var x : One | Two;
////
////x.commonProperty./*1*/;
////x.anotherProperty./*2*/;

verify.completions({
    marker: "1",
    exact: [
        { name: "toLocaleString", text: "(method) toLocaleString(): string (+1 overload)", documentation: "Returns a string representation of an object appropriate to the host environment's current locale." },
        { name: "toString", text: "(method) toString(): string (+1 overload)", documentation: "Returns a string representation of the string, which in this case is the string itself." },
        { name: "valueOf", text: "(method) valueOf(): string | number", documentation: "Returns the primitive value of the specified object, which in this case is the string itself." },
    ],
});

verify.completions({
    marker: '2',
    includes: { name: 'foo' }
})
