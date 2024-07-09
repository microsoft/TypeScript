//// [tests/cases/conformance/internalModules/moduleBody/invalidModuleWithVarStatements.ts] ////

//// [invalidModuleWithVarStatements.ts]
// All of these should be an error

module Y {
    public var x: number = 0;
}

module Y2 {
    public function fn(x: string) { }
}

module Y4 {
    static var x: number = 0;
}

module YY {
    static function fn(x: string) { }
}

module YY2 {
    private var x: number = 0;
}


module YY3 {
    private function fn(x: string) { }
}


//// [invalidModuleWithVarStatements.js]
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
    var x = 0;
})(Y4 || (Y4 = {}));
var YY;
(function (YY) {
    function fn(x) { }
})(YY || (YY = {}));
var YY2;
(function (YY2) {
    var x = 0;
})(YY2 || (YY2 = {}));
var YY3;
(function (YY3) {
    function fn(x) { }
})(YY3 || (YY3 = {}));
