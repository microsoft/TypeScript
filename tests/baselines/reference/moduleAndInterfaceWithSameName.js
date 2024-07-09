//// [tests/cases/compiler/moduleAndInterfaceWithSameName.ts] ////

//// [moduleAndInterfaceWithSameName.ts]
module Foo1 {
    export module Bar {
        export var x = 42;
    }

    export interface Bar { 
        y: string;
    }
}

module Foo2 {
    module Bar {
        export var x = 42;
    }

    export interface Bar {
        y: string;
    }
}

var z2 = Foo2.Bar.y; // Error for using interface name as a value.

module Foo3 {
    export module Bar {
        export var x = 42;
    }

    interface Bar { 
        y: string;
    }
}

//// [moduleAndInterfaceWithSameName.js]
var Foo1;
(function (Foo1) {
    var Bar;
    (function (Bar) {
        Bar.x = 42;
    })(Bar = Foo1.Bar || (Foo1.Bar = {}));
})(Foo1 || (Foo1 = {}));
var Foo2;
(function (Foo2) {
    var Bar;
    (function (Bar) {
        Bar.x = 42;
    })(Bar || (Bar = {}));
})(Foo2 || (Foo2 = {}));
var z2 = Foo2.Bar.y; // Error for using interface name as a value.
var Foo3;
(function (Foo3) {
    var Bar;
    (function (Bar) {
        Bar.x = 42;
    })(Bar = Foo3.Bar || (Foo3.Bar = {}));
})(Foo3 || (Foo3 = {}));
