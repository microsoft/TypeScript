//// [tests/cases/conformance/internalModules/moduleBody/invalidModuleWithVarStatements.ts] ////

//// [invalidModuleWithVarStatements.ts]
// All of these should be an error

namespace Y {
    public var x: number = 0;
}

namespace Y2 {
    public function fn(x: string) { }
}

namespace Y4 {
    static var x: number = 0;
}

namespace YY {
    static function fn(x: string) { }
}

namespace YY2 {
    private var x: number = 0;
}


namespace YY3 {
    private function fn(x: string) { }
}


//// [invalidModuleWithVarStatements.js]
"use strict";
// All of these should be an error
var Y;
(function (Y) {
    var x = 0;
})(Y || (Y = {}));
var Y2;
(function (Y2) {
    function fn(x) { }
})(Y2 || (Y2 = {}));
var Y4;
(function (Y4) {
    static var x = 0;
})(Y4 || (Y4 = {}));
var YY;
(function (YY) {
    static function fn(x) { }
})(YY || (YY = {}));
var YY2;
(function (YY2) {
    var x = 0;
})(YY2 || (YY2 = {}));
var YY3;
(function (YY3) {
    function fn(x) { }
})(YY3 || (YY3 = {}));
