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
        { name: "toString", text: "(method) toString(): string (+1 overload)", documentation: "Returns a string representation of a string." },
        { name: "valueOf", text: "(method) valueOf(): string | number", documentation: "Returns the primitive value of the specified object." },
        { name: "toLocaleString", text: "(method) toLocaleString(): string (+1 overload)", documentation: "Returns a date converted to a string using the current locale." },
    ],
});

verify.completions({
    marker: '2',
    includes: { name: 'foo' }
})
