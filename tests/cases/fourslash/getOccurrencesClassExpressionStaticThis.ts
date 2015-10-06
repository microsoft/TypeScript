/// <reference path='fourslash.ts' />

////var x = class C {
////    public x;
////    public y;
////    public z;
////    public staticX;
////    constructor() {
////        this;
////        this.x;
////        this.y;
////        this.z;
////    }
////    foo() {
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
////        return this.x;
////    }
////
////    static bar() {
////        [|this|];
////        [|this|].staticX;
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
////    }
////}

const ranges = test.ranges();
for (let r of ranges) {
    goTo.position(r.start);

    for (let range of ranges) {
        verify.occurrencesAtPositionContains(range, false);
    }
}
