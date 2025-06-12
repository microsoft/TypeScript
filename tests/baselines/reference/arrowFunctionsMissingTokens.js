//// [tests/cases/compiler/arrowFunctionsMissingTokens.ts] ////

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
    var a = () => { };
    var b = () => { };
    var c = (x) => { };
    var d = (x, y) => { };
    var e = (x, y) => { };
})(missingArrowsWithCurly || (missingArrowsWithCurly = {}));
var missingCurliesWithArrow;
(function (missingCurliesWithArrow) {
    let withStatement;
    (function (withStatement) {
        var a = () => { var k = 10; };
        var b = () => { var k = 10; };
        var c = (x) => { var k = 10; };
        var d = (x, y) => { var k = 10; };
        var e = (x, y) => { var k = 10; };
        var f = () => { var k = 10; };
    })(withStatement || (withStatement = {}));
    let withoutStatement;
    (function (withoutStatement) {
        var a = () => ;
    })(withoutStatement || (withoutStatement = {}));
    ;
    var b = () => ;
})(missingCurliesWithArrow || (missingCurliesWithArrow = {}));
var c = (x) => ;
;
var d = (x, y) => ;
;
var e = (x, y) => ;
;
var f = () => ;
var ce_nEst_pas_une_arrow_function;
(function (ce_nEst_pas_une_arrow_function) {
    var a = ();
    var b = () => ;
    var c = (x);
    var d = (x, y) => ;
    var e = (x, y) => ;
})(ce_nEst_pas_une_arrow_function || (ce_nEst_pas_une_arrow_function = {}));
var okay;
(function (okay) {
    var a = () => { };
    var b = () => { };
    var c = (x) => { };
    var d = (x, y) => { };
    var e = (x, y) => { };
})(okay || (okay = {}));
