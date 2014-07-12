//// [moduleAndInterfaceWithSameName.js]
var Foo1;
(function (Foo1) {
    (function (Bar) {
        Bar.x = 42;
    })(Foo1.Bar || (Foo1.Bar = {}));
    var Bar = Foo1.Bar;
})(Foo1 || (Foo1 = {}));

var Foo2;
(function (Foo2) {
    var Bar;
    (function (Bar) {
        Bar.x = 42;
    })(Bar || (Bar = {}));
})(Foo2 || (Foo2 = {}));

var z2 = Foo2.Bar.y;

var Foo3;
(function (Foo3) {
    (function (Bar) {
        Bar.x = 42;
    })(Foo3.Bar || (Foo3.Bar = {}));
    var Bar = Foo3.Bar;
})(Foo3 || (Foo3 = {}));
