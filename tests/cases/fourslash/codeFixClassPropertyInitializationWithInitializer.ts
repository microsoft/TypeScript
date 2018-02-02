/// <reference path='fourslash.ts' />

// @strict: true

//// class TT { constructor () {} }
////
//// class T {
//// 
////     a: string;
//// 
////     static b: string;
//// 
////     private c: string;
//// 
////     d: number | undefined;
//// 
////     e: string | number;
//// 
////     f: 1;
//// 
////     g: "123" | "456";
//// 
////     h: boolean;
//// 
////     i: TT;
//// }

verify.codeFixAll({
    fixId: "addMissingPropertyInitializer",
    newFileContent: `class TT { constructor () {} }

class T {

    a: string = "";

    static b: string;

    private c: string = "";

    d: number | undefined;

    e: string | number = "";

    f: 1 = 1;

    g: "123" | "456" = "123";

    h: boolean = false;

    i: TT = new TT;
}`,
});
