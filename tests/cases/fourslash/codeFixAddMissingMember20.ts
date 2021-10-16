/// <reference path='fourslash.ts' />

////class C {
////    method() {
////        const {
////            many01,
////            many02,
////            many03,
////            many04,
////            many05,
////            many06,
////            many07,
////            many08,
////            many09,
////            many10,
////            many11,
////            many12,
////            many13,
////            many14,
////            many15,
////            many16,
////            many17,
////            many18,
////            many19,
////            many20,
////            many21,
////            many22
////        } = this.foo;
////    }
////}

verify.codeFix({
    description: "Declare property 'foo'",
    index: 0,
    newFileContent: `class C {
    foo: { many01: any; many02: any; many03: any; many04: any; many05: any; many06: any; many07: any; many08: any; many09: any; many10: any; many11: any; many12: any; many13: any; many14: any; many15: any; many16: any; many17: any; many18: any; many19: any; many20: any; many21: any; many22: any; };
    method() {
        const {
            many01,
            many02,
            many03,
            many04,
            many05,
            many06,
            many07,
            many08,
            many09,
            many10,
            many11,
            many12,
            many13,
            many14,
            many15,
            many16,
            many17,
            many18,
            many19,
            many20,
            many21,
            many22
        } = this.foo;
    }
}`
});
