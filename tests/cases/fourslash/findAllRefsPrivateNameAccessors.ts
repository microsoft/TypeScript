/// <reference path='fourslash.ts'/>

////class C {
////    [|get [|{|"isDefinition": true, "isWriteAccess":true, "contextRangeIndex": 0 |}#foo|](){ return 1; }|]
////    [|set [|{|"isDefinition": true, "isWriteAccess":true, "contextRangeIndex": 2 |}#foo|](value: number){  }|]
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
////    [|get [|{|"isDefinition": true, "isWriteAccess":true, "contextRangeIndex": 5 |}#foo|](){ return 1; }|]
////    [|set [|{|"isDefinition": true, "isWriteAccess":true, "contextRangeIndex": 7 |}#foo|](value: number){  }|]
////    constructor() {
////        this.[|#foo|]();
////    }
////}

const [rC0DefGet, rC0Get, rC0DefSet, rC0Set, rC1, 
     rE0GetDef, rE0Get, rE0SetDef, rE0Set, rE1] = test.ranges();
verify.singleReferenceGroup("(property) C.#foo: number", [rC0Get, rC0Set, rC1]);
verify.singleReferenceGroup("(property) E.#foo: number", [rE0Get, rE0Set, rE1]);
