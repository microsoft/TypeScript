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
////    h: () => {
////        /*7*/this;
////    }
////}
////
////const x = {
////    get f() {
////        /*8*/this;
////    }
////    set g() {
////        /*9*/this;
////    }
////    h: () => {
////        /*10*/this;
////    }
////}


function verifyOccurrencesAtMarker(marker: string, count: number) {
    goTo.marker(marker);
    verify.occurrencesAtPositionCount(count);
}

verifyOccurrencesAtMarker("1", 4);
verifyOccurrencesAtMarker("2", 6);
verifyOccurrencesAtMarker("3", 1);
verifyOccurrencesAtMarker("4", 2);
verifyOccurrencesAtMarker("5", 2);
verifyOccurrencesAtMarker("6", 0);
verifyOccurrencesAtMarker("7", 4);
verifyOccurrencesAtMarker("8", 2);
verifyOccurrencesAtMarker("9", 2);
verifyOccurrencesAtMarker("10", 4);