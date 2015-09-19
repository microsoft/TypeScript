//// [arrayLiteralExpressionStatementInTypeAssertion01.ts]

(<any>[]);

([] as any);

<any>[];

<any>[] as any;


function f() {
    (<any>[]);

    ([] as any);

    <any>[];

    <any>[] as any;
}

namespace n {
    (<any>[]);

    ([] as any);

    <any>[];

    <any>[] as any;
}

//// [arrayLiteralExpressionStatementInTypeAssertion01.js]
[];
[];
[];
[];
function f() {
    [];
    [];
    [];
    [];
}
var n;
(function (n) {
    [];
    [];
    [];
    [];
})(n || (n = {}));
