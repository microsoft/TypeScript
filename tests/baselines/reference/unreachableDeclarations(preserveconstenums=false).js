//// [tests/cases/compiler/unreachableDeclarations.ts] ////

//// [unreachableDeclarations.ts]
function func1() {
    aFunc();

    console.log(EnumA.Value);
    console.log(EnumB.Value);

    return;

    function aFunc() {
        console.log(EnumA.Value);
        console.log(EnumB.Value);
    }

    enum EnumA { Value }
    const enum EnumB { Value }
}

function func2() {
    aFunc();

    console.log(EnumA.Value);

    return;

    function aFunc() {
        console.log(EnumA.Value);
    }

    enum EnumA { Value }
}

function func3() {
    aFunc();

    console.log(EnumB.Value);

    return;

    function aFunc() {
        console.log(EnumB.Value);
    }

    const enum EnumB { Value }
}

function func4() {
    aFunc();

    console.log(ClassA.Value);

    return;

    function aFunc() {
        console.log(ClassA.Value);
    }

    class ClassA { static Value = 1234; }
}


//// [unreachableDeclarations.js]
"use strict";
function func1() {
    aFunc();
    console.log(EnumA.Value);
    console.log(0 /* EnumB.Value */);
    return;
    function aFunc() {
        console.log(EnumA.Value);
        console.log(0 /* EnumB.Value */);
    }
    var EnumA;
    (function (EnumA) {
        EnumA[EnumA["Value"] = 0] = "Value";
    })(EnumA || (EnumA = {}));
}
function func2() {
    aFunc();
    console.log(EnumA.Value);
    return;
    function aFunc() {
        console.log(EnumA.Value);
    }
    var EnumA;
    (function (EnumA) {
        EnumA[EnumA["Value"] = 0] = "Value";
    })(EnumA || (EnumA = {}));
}
function func3() {
    aFunc();
    console.log(0 /* EnumB.Value */);
    return;
    function aFunc() {
        console.log(0 /* EnumB.Value */);
    }
}
function func4() {
    aFunc();
    console.log(ClassA.Value);
    return;
    function aFunc() {
        console.log(ClassA.Value);
    }
    var ClassA = /** @class */ (function () {
        function ClassA() {
        }
        ClassA.Value = 1234;
        return ClassA;
    }());
}
