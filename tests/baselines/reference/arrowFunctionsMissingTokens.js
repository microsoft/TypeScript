//// [arrowFunctionsMissingTokens.ts]
module missingArrowsWithCurly {
    var a = () { };

    var b = (): void { }

    var c = (x) { };

    var d = (x: number, y: string) { };

    var e = (x: number, y: string): void { };
}

module missingCurliesWithArrow {
    module withStatement {
        var a = () => var k = 10;};

        var b = (): void => var k = 10;}

        var c = (x) => var k = 10;};

        var d = (x: number, y: string) => var k = 10;};

        var e = (x: number, y: string): void => var k = 10;};

        var f = () => var k = 10;}
    }

    module withoutStatement {
        var a = () => };

        var b = (): void => }

        var c = (x) => };

        var d = (x: number, y: string) => };

        var e = (x: number, y: string): void => };

        var f = () => }
    }
}

module ce_nEst_pas_une_arrow_function {
    var a = ();

    var b = (): void;

    var c = (x);

    var d = (x: number, y: string);

    var e = (x: number, y: string): void;
}

module okay {
    var a = () => { };

    var b = (): void => { }

    var c = (x) => { };

    var d = (x: number, y: string) => { };

    var e = (x: number, y: string): void => { };
}

//// [arrowFunctionsMissingTokens.js]
var missingArrowsWithCurly;
(function (missingArrowsWithCurly) {
    var a = function () { };
    var b = function () { };
    var c = function (x) { };
    var d = function (x, y) { };
    var e = function (x, y) { };
})(missingArrowsWithCurly || (missingArrowsWithCurly = {}));
var missingCurliesWithArrow;
(function (missingCurliesWithArrow) {
    var withStatement;
    (function (withStatement) {
        var a = function () { var k = 10; };
        var b = function () { var k = 10; };
        var c = function (x) { var k = 10; };
        var d = function (x, y) { var k = 10; };
        var e = function (x, y) { var k = 10; };
        var f = function () { var k = 10; };
    })(withStatement || (withStatement = {}));
    var withoutStatement;
    (function (withoutStatement) {
        var a = function () { return ; };
    })(withoutStatement || (withoutStatement = {}));
    ;
    var b = function () { return ; };
})(missingCurliesWithArrow || (missingCurliesWithArrow = {}));
var c = function (x) { return ; };
;
var d = function (x, y) { return ; };
;
var e = function (x, y) { return ; };
;
var f = function () { return ; };
var ce_nEst_pas_une_arrow_function;
(function (ce_nEst_pas_une_arrow_function) {
    var a = ();
    var b = function () { return ; };
    var c = (x);
    var d = function (x, y) { return ; };
    var e = function (x, y) { return ; };
})(ce_nEst_pas_une_arrow_function || (ce_nEst_pas_une_arrow_function = {}));
var okay;
(function (okay) {
    var a = function () { };
    var b = function () { };
    var c = function (x) { };
    var d = function (x, y) { };
    var e = function (x, y) { };
})(okay || (okay = {}));
