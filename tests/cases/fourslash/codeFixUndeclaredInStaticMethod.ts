/// <reference path='fourslash.ts' />

//// class A {[|
////     |]static foo0() {
////         this.m1(1,2,3);
////         A.m2(1,2);
////         this.prop1 = 10;
////         A.prop2 = "asdf";
////     }
//// }

verify.codeFix({
    description: "Declare static method 'm1'.",
    index: 0,
    // TODO: GH#18445
    newRangeContent: `
    static m1(arg0: any, arg1: any, arg2: any): any {\r
        throw new Error("Method not implemented.");\r
    }\r
    `,
});

verify.codeFix({
    description: "Declare static method 'm2'.",
    index: 0,
    newRangeContent: `
    static m2(arg0: any, arg1: any): any {\r
        throw new Error("Method not implemented.");\r
    }\r
    static m1(arg0: any, arg1: any, arg2: any): any {\r
        throw new Error("Method not implemented.");\r
    }\r
    `,
});

verify.codeFix({
    description: "Declare static property 'prop1'.",
    index: 0,
    newRangeContent: `
    static prop1: number;\r
    static m2(arg0: any, arg1: any): any {\r
        throw new Error("Method not implemented.");\r
    }\r
    static m1(arg0: any, arg1: any, arg2: any): any {\r
        throw new Error("Method not implemented.");\r
    }\r
    `,
});

verify.codeFix({
    description: "Declare static property 'prop2'.",
    index: 0,
    newRangeContent: `
    static prop2: string;\r
    static prop1: number;\r
    static m2(arg0: any, arg1: any): any {\r
        throw new Error("Method not implemented.");\r
    }\r
    static m1(arg0: any, arg1: any, arg2: any): any {\r
        throw new Error("Method not implemented.");\r
    }\r
    `,
});
