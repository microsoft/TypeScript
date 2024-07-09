/// <reference path='fourslash.ts' />

////var x = class C {
////    public x;
////    public y;
////    public z;
////    constructor() {
////        [|this|];
////        [|this|].x;
////        [|this|].y;
////        [|this|].z;
////    }
////    foo() {
////        [|this|];
////        () => [|this|];
////        () => {
////            if ([|this|]) {
////                [|this|];
////            }
////        }
////        function inside() {
////            this;
////            (function (_) {
////                this;
////            })(this);
////        }
////        return [|this|].x;
////    }
////
////    static bar() {
////        this;
////        () => this;
////        () => {
////            if (this) {
////                this;
////            }
////        }
////        function inside() {
////            this;
////            (function (_) {
////                this;
////            })(this);
////        }
////    }
////}

verify.baselineDocumentHighlights();
