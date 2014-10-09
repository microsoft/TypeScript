/// <reference path='fourslash.ts' />

////this/*1*/;
////this;
////
////function f() {
////    this/*2*/;
////    this;
////    () => this;
////    () => {
////        if (this) {
////            this;
////        }
////        else {
////            this.this;
////        }
////    }
////    function inside() {
////        this;
////        (function (_) {
////            this;
////        })(this);
////    }
////}
////
////module m {
////    var x = th/*6*/is;
////    function f() {
////        this;
////        this;
////        () => this;
////        () => {
////            if (this) {
////                this;
////            }
////            else {
////                this.this;
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
////
////class A {
////    public b = this.method1;
////
////    public method1() {
////        this;
////        this;
////        () => this;
////        () => {
////            if (this) {
////                this;
////            }
////            else {
////                this.this;
////            }
////        }
////        function inside() {
////            this;
////            (function (_) {
////                this/*3*/;
////            })(this);
////        }
////    }
////
////    private method2() {
////        this;
////        this;
////        () => this;
////        () => {
////            if (this) {
////                this;
////            }
////            else {
////                this.this;
////            }
////        }
////        function inside() {
////            this;
////            (function (_) {
////                this;
////            })(this);
////        }
////    }
////
////    public static staticB = this.staticMethod1;
////    
////    public static staticMethod1() {
////        this;
////        this;
////        () => this;
////        () => {
////            if (this) {
////                this;
////            }
////            else {
////                this.this;
////            }
////        }
////        function inside() {
////            this;
////            (function (_) {
////                this;
////            })(this);
////        }
////    }
////
////    private static staticMethod2() {
////        this;
////        this;
////        () => this;
////        () => {
////            if (this) {
////                this;
////            }
////            else {
////                this.this;
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
////
////var x = {
////    f() {
////        this/*4*/;
////    },
////    g() {
////        this/*5*/;
////    }
////}


function verifyOccurencesAtMarker(marker: string, count: number) {
    goTo.marker(marker);
    verify.occurrencesAtPositionCount(count);
}

verifyOccurencesAtMarker("1", 2);
verifyOccurencesAtMarker("2", 6);
verifyOccurencesAtMarker("3", 1);
verifyOccurencesAtMarker("4", 1);
verifyOccurencesAtMarker("5", 1);
verifyOccurencesAtMarker("6", 0);