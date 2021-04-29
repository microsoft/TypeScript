/// <reference path='fourslash.ts'/>

////class C {
////    [|[|{|"isDefinition": true, "isWriteAccess":true, "contextRangeIndex": 0 |}#foo|](){ }|]
////    constructor() {
////        this.[|#foo|]();
////    }
////}
////class D extends C {
////    constructor() {
////        super()
////        this.#foo = 20;
////    }
////}
////class E {
////    [|[|{|"isDefinition": true, "isWriteAccess":true, "contextRangeIndex": 3 |}#foo|](){ }|]
////    constructor() {
////        this.[|#foo|]();
////    }
////}

const [rC0Def, rC0, rC1, rE0Def, rE0, rE1] = test.ranges();
verify.singleReferenceGroup("(method) C.#foo(): void", [rC0, rC1]);
verify.singleReferenceGroup("(method) E.#foo(): void", [rE0, rE1]);
