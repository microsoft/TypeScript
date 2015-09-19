//// [functionExpressionExpressionStatementInTypeAssertion01.ts]

(<any>function () { });

(function () { } as any);

<any>function () { };

<any>function () { } as any;


function f() {
    (<any>function () { });

    (function () { } as any);

    <any>function () { };

    <any>function () { } as any;
}

namespace n {
    (<any>function () { });

    (function () { } as any);

    <any>function () { };

    <any>function () { } as any;
}

//// [functionExpressionExpressionStatementInTypeAssertion01.js]
function () { };
function () { };
function () { };
function () { };
function f() {
    function () { };
    function () { };
    function () { };
    function () { };
}
var n;
(function (n) {
    function () { };
    function () { };
    function () { };
    function () { };
})(n || (n = {}));
