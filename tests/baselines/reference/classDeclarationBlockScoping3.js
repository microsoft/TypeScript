//// [classDeclarationBlockScoping3.ts]
var c;
function foo() {
    class c { }
    new c();
}

module M {
    class c { }
    new c();
}

function foo2() {
    {
        class c { }
        new c()
    }
}

module M2 {
    {
        class c { }
        new c();
    }
}

function foo3() {
    {
        class c { }
        new c();
        for (var c; ;);
    }
}

module M3 {
    {
        class c { }
        new c();
        for (var c; ;);
    }
}


//// [classDeclarationBlockScoping3.js]
var c;
function foo() {
    var c = (function () {
        function c() {
        }
        return c;
    })();
    new c();
}
var M;
(function (M) {
    var c = (function () {
        function c() {
        }
        return c;
    })();
    new c();
})(M || (M = {}));
function foo2() {
    {
        var c_1 = (function () {
            function c_1() {
            }
            return c_1;
        })();
        new c_1();
    }
}
var M2;
(function (M2) {
    {
        var c_2 = (function () {
            function c_2() {
            }
            return c_2;
        })();
        new c_2();
    }
})(M2 || (M2 = {}));
function foo3() {
    {
        var c_3 = (function () {
            function c_3() {
            }
            return c_3;
        })();
        new c_3();
        for (var c;;)
            ;
    }
}
var M3;
(function (M3) {
    {
        var c_4 = (function () {
            function c_4() {
            }
            return c_4;
        })();
        new c_4();
        for (var c;;)
            ;
    }
})(M3 || (M3 = {}));
