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
    foo: { many01: unknown; many02: unknown; many03: unknown; many04: unknown; many05: unknown; many06: unknown; many07: unknown; many08: unknown; many09: unknown; many10: unknown; many11: unknown; many12: unknown; many13: unknown; many14: unknown; many15: unknown; many16: unknown; many17: unknown; many18: unknown; many19: unknown; many20: unknown; many21: unknown; many22: unknown; };
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
