/// <reference path='fourslash.ts' />

////const f = {
////    get a() {
////        return await Promise.resolve();
////    },
////    get a() {
////        await Promise.resolve();
////    },
////}

verify.not.codeFixAvailable();
