/// <reference path='fourslash.ts' />

//// class A {[|
////     |]static foo0() {
////         this.m1(1,2,3);
////         A.m2(1,2);
////         this.prop1 = 10;
////         A.prop2 = "asdf";
////     }
//// }

verify.getAndApplyCodeFix(/*errorCode*/undefined, 0);
verify.getAndApplyCodeFix(/*errorCode*/undefined, 0);
verify.getAndApplyCodeFix(/*errorCode*/undefined, 0);
verify.getAndApplyCodeFix(/*errorCode*/undefined, 0);

verify.rangeIs(`
    static prop2: string;
    static prop1: number;
    static m2(arg0: any, arg1: any): any {
        throw new Error("Method not implemented.");
    }
    static m1(arg0: any, arg1: any, arg2: any): any {
        throw new Error("Method not implemented.");
    }
`);
