//// [tests/cases/compiler/namespacesWithTypeAliasOnlyExportsMerge.ts] ////

//// [constAndNS.ts]
type A = number;
declare const Q: number;
declare namespace Q {
    export { A };
}
declare const try1: Q.A;
declare namespace Q2 {
    export { Q }
}
declare const try2: Q2.Q.A;
declare namespace Q3 {
    export {A as B};
}
declare const try3: Q3.B;
declare namespace Q4 {
    export { Q as default };
}
declare const try4: Q4.default.A;
export {};
//// [circular.ts]
declare namespace NS1 {
    export { NS2 };
}
declare namespace NS2 {
    export { NS1 };
}
export {};
//// [circularWithUses.ts]
type A = string;
type B = number;
declare namespace NS1 {
    export { NS2, A };
}
declare namespace NS2 {
    export { NS1, B };
}
export {};
declare const try1: NS1.A;
declare const try2: NS2.B;
declare const try3: NS1.NS2.B;
declare const try4: NS2.NS1.A;
declare const try5: NS1.NS2.NS1.A;
declare const try6: NS2.NS1.NS2.B;


//// [constAndNS.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [circular.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [circularWithUses.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
