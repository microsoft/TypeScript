//// [strictModeReservedWord2.ts]
"use strict"
interface public { }
interface implements {
    foo(package, protected);
}
enum package { }
enum foo {
    public,
    private,
    package
}

const enum private {
    public,
    private,
    package
}

const enum bar {
    public,
    private,
    package
}


//// [strictModeReservedWord2.js]
"use strict";
var package;
(function (package) {
})(package || (package = {}));
var foo;
(function (foo) {
    foo[foo["public"] = 0] = "public";
    foo[foo["private"] = 1] = "private";
    foo[foo["package"] = 2] = "package";
})(foo || (foo = {}));
