//// [tests/cases/compiler/unreachableEnum.ts] ////

//// [unreachableEnum.ts]
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

//// [unreachableEnum.js]
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
    var EnumB;
    (function (EnumB) {
        EnumB[EnumB["Value"] = 0] = "Value";
    })(EnumB || (EnumB = {}));
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
    var EnumB;
    (function (EnumB) {
        EnumB[EnumB["Value"] = 0] = "Value";
    })(EnumB || (EnumB = {}));
}
