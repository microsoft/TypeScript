/// <reference path='fourslash.ts' />

//// class A {
////     static foo0() {
////         this.m1(1,2,3);
////         A.m2(1,2);
////         this.prop1 = 10;
////         A.prop2 = "asdf";
////     }
//// }

verify.codeFix({
    description: "Declare static method 'm1'",
    index: 0,
    newFileContent:
`class A {
    static m1(arg0: any, arg1: any, arg2: any): any {
        throw new Error("Method not implemented.");
    }
    static foo0() {
        this.m1(1,2,3);
        A.m2(1,2);
        this.prop1 = 10;
        A.prop2 = "asdf";
    }
}`,
});

verify.codeFix({
    description: "Declare static method 'm2'",
    index: 0,
    newFileContent:
`class A {
    static m2(arg0: any, arg1: any): any {
        throw new Error("Method not implemented.");
    }
    static m1(arg0: any, arg1: any, arg2: any): any {
        throw new Error("Method not implemented.");
    }
    static foo0() {
        this.m1(1,2,3);
        A.m2(1,2);
        this.prop1 = 10;
        A.prop2 = "asdf";
    }
}`,
});

verify.codeFix({
    description: "Declare static property 'prop1'",
    index: 0,
    newFileContent:
`class A {
    static prop1: number;
    static m2(arg0: any, arg1: any): any {
        throw new Error("Method not implemented.");
    }
    static m1(arg0: any, arg1: any, arg2: any): any {
        throw new Error("Method not implemented.");
    }
    static foo0() {
        this.m1(1,2,3);
        A.m2(1,2);
        this.prop1 = 10;
        A.prop2 = "asdf";
    }
}`,
});

verify.codeFix({
    description: "Declare static property 'prop2'",
    index: 1, // fix at index 0 is to change the spelling to 'prop1'
    newFileContent:
`class A {
    static prop1: number;
    static prop2: string;
    static m2(arg0: any, arg1: any): any {
        throw new Error("Method not implemented.");
    }
    static m1(arg0: any, arg1: any, arg2: any): any {
        throw new Error("Method not implemented.");
    }
    static foo0() {
        this.m1(1,2,3);
        A.m2(1,2);
        this.prop1 = 10;
        A.prop2 = "asdf";
    }
}`,
});
