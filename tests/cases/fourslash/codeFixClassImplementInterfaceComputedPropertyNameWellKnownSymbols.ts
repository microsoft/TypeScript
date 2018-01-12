/// <reference path='fourslash.ts' />

// @lib: es2017

////interface I<Species> {
////    [Symbol.hasInstance](o: any): boolean;
////    [Symbol.isConcatSpreadable]: boolean;
////    [Symbol.iterator](): any;
////    [Symbol.match]: boolean;
////    [Symbol.replace](...args);
////    [Symbol.search](str: string): number;
////    [Symbol.species](): Species;
////    [Symbol.split](str: string, limit?: number): string[];
////    [Symbol.toPrimitive](hint: "number"): number;
////    [Symbol.toPrimitive](hint: "default"): number;
////    [Symbol.toPrimitive](hint: "string"): string;
////    [Symbol.toStringTag]: string;
////    [Symbol.unscopables]: any;
////}
////class C implements I<number> {}

verify.codeFix({
    description: "Implement interface 'I<number>'",
    // TODO: GH#18445
    newFileContent:
`interface I<Species> {
    [Symbol.hasInstance](o: any): boolean;
    [Symbol.isConcatSpreadable]: boolean;
    [Symbol.iterator](): any;
    [Symbol.match]: boolean;
    [Symbol.replace](...args);
    [Symbol.search](str: string): number;
    [Symbol.species](): Species;
    [Symbol.split](str: string, limit?: number): string[];
    [Symbol.toPrimitive](hint: "number"): number;
    [Symbol.toPrimitive](hint: "default"): number;
    [Symbol.toPrimitive](hint: "string"): string;
    [Symbol.toStringTag]: string;
    [Symbol.unscopables]: any;
}
class C implements I<number> {\r
    [Symbol.hasInstance](o: any): boolean {\r
        throw new Error("Method not implemented.");\r
    }\r
    [Symbol.isConcatSpreadable]: boolean;\r
    [Symbol.iterator]() {\r
        throw new Error("Method not implemented.");\r
    }\r
    [Symbol.match]: boolean;\r
    [Symbol.replace](...args: {}) {\r
        throw new Error("Method not implemented.");\r
    }\r
    [Symbol.search](str: string): number {\r
        throw new Error("Method not implemented.");\r
    }\r
    [Symbol.species](): number {\r
        throw new Error("Method not implemented.");\r
    }\r
    [Symbol.split](str: string, limit?: number): {} {\r
        throw new Error("Method not implemented.");\r
    }\r
    [Symbol.toPrimitive](hint: "number"): number;\r
    [Symbol.toPrimitive](hint: "default"): number;\r
    [Symbol.toPrimitive](hint: "string"): string;\r
    [Symbol.toPrimitive](hint: any) {\r
        throw new Error("Method not implemented.");\r
    }\r
    [Symbol.toStringTag]: string\;\r
    [Symbol.unscopables]: any;\r
}`,
});
