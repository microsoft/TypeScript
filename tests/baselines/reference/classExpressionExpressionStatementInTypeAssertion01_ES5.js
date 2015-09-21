//// [classExpressionExpressionStatementInTypeAssertion01_ES5.ts]

(<any>class { });

(class { } as any);

<any>class { };

<any>class { } as any;


function f() {
    (<any>class { });

    (class { } as any);

    <any>class { };

    <any>class { } as any;
}

namespace n {
    (<any>class { });

    (class { } as any);

    <any>class { };

    <any>class { } as any;
}

//// [classExpressionExpressionStatementInTypeAssertion01_ES5.js]
(function () {
    function class_1() {
    }
    return class_1;
})();
(function () {
    function class_2() {
    }
    return class_2;
})();
(function () {
    function class_3() {
    }
    return class_3;
})();
(function () {
    function class_4() {
    }
    return class_4;
})();
function f() {
    (function () {
        function class_5() {
        }
        return class_5;
    })();
    (function () {
        function class_6() {
        }
        return class_6;
    })();
    (function () {
        function class_7() {
        }
        return class_7;
    })();
    (function () {
        function class_8() {
        }
        return class_8;
    })();
}
var n;
(function (n) {
    (function () {
        function class_9() {
        }
        return class_9;
    })();
    (function () {
        function class_10() {
        }
        return class_10;
    })();
    (function () {
        function class_11() {
        }
        return class_11;
    })();
    (function () {
        function class_12() {
        }
        return class_12;
    })();
})(n || (n = {}));
