/// <reference path='fourslash.ts' />

////this;
////this;
////
////function f() {
////    this;
////    this;
////    () => this;
////    () => {
////        if (this) {
////            this;
////        }
////        else {
////            this.t/*1*/his;
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
////    function f() {
////        this;
////        this;
////        () => this;
////        () => {
////            if (this) {
////                this;
////            }
////            else {
////                this./*2*/this;
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
////                this.thi/*3*/s;
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
////    private method2() {
////        this;
////        this;
////        () => this;
////        () => {
////            if (this) {
////                this;
////            }
////            else {
////                this.t/*4*/his;
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
////                this.th/*5*/is;
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
////                this.th/*6*/is;
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
////        this;
////    },
////    g() {
////        this;
////    }
////}

verify.baselineDocumentHighlights(test.markers());
