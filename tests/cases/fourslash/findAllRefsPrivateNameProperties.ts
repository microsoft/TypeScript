/// <reference path='fourslash.ts'/>

////class C {
////    [|[|{|"isDefinition": true, "isWriteAccess": true, "contextRangeIndex": 0 |}#foo|] = 10;|]
////    constructor() {
////        this.[|{|"isWriteAccess": true|}#foo|] = 20;
////        [|#foo|] in this;
////    }
////}
////class D extends C {
////    constructor() {
////        super()
////        this.#foo = 20;
////    }
////}
////class E {
////    [|[|{|"isDefinition": true, "contextRangeIndex": 4 |}#foo|]: number;|]
////    constructor() {
////        this.[|{|"isWriteAccess": true|}#foo|] = 20;
////    }
////}

const [rC0Def, rC0, rC1, rC2, rE0Def, rE0, rE1] = test.ranges();
verify.singleReferenceGroup("(property) C.#foo: number", [rC0, rC1, rC2]);
verify.singleReferenceGroup("(property) E.#foo: number", [rE0, rE1]);
