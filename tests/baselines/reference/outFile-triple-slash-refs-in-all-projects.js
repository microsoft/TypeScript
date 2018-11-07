//// [/src/2/second-output.d.ts]
/// <reference path="../second/tripleRef.d.ts" />
declare const second_part1Const: secondsecond_part1;
declare namespace N {
}
declare namespace N {
}
declare class C {
    doSomething(): void;
}
//# sourceMappingURL=second-output.d.ts.map

//// [/src/2/second-output.d.ts.map]
{"version":3,"file":"second-output.d.ts","sourceRoot":"","sources":["../second/second_part1.ts","../second/second_part2.ts"],"names":[],"mappings":";AACA,QAAA,MAAM,iBAAiB,oBAA2B,CAAC;AACnD,kBAAU,CAAC,CAAC;CAEX;AAED,kBAAU,CAAC,CAAC;CAMX;ACZD,cAAM,CAAC;IACH,WAAW;CAGd"}

//// [/src/2/second-output.js]
var second_part1Const = new secondsecond_part1();
var N;
(function (N) {
    function f() {
        console.log('testing');
    }
    f();
})(N || (N = {}));
var C = (function () {
    function C() {
    }
    C.prototype.doSomething = function () {
        console.log("something got done");
    };
    return C;
}());
//# sourceMappingURL=second-output.js.map

//// [/src/2/second-output.js.map]
{"version":3,"file":"second-output.js","sourceRoot":"","sources":["../second/second_part1.ts","../second/second_part2.ts"],"names":[],"mappings":"AACA,IAAM,iBAAiB,GAAG,IAAI,kBAAkB,EAAE,CAAC;AAKnD,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;ACZD;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC"}

//// [/src/first/bin/first-output.d.ts]
/// <reference path="../tripleRef.d.ts" />
interface TheFirst {
    none: any;
}
declare const s = "Hello, world";
interface NoJsForHereEither {
    none: any;
}
declare const first_part2Const: firstfirst_part2;
declare function f(): string;
//# sourceMappingURL=first-output.d.ts.map

//// [/src/first/bin/first-output.d.ts.map]
{"version":3,"file":"first-output.d.ts","sourceRoot":"","sources":["../first_PART1.ts","../first_part2.ts","../first_part3.ts"],"names":[],"mappings":";AAAA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,iBAAiB,CAAC;AAEzB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;ACPD,QAAA,MAAM,gBAAgB,kBAAyB,CAAC;ACDhD,iBAAS,CAAC,WAET"}

//// [/src/first/bin/first-output.js]
var s = "Hello, world";
console.log(s);
var first_part2Const = new firstfirst_part2();
console.log(f());
function f() {
    return "JS does hoists";
}
//# sourceMappingURL=first-output.js.map

//// [/src/first/bin/first-output.js.map]
{"version":3,"file":"first-output.js","sourceRoot":"","sources":["../first_PART1.ts","../first_part2.ts","../first_part3.ts"],"names":[],"mappings":"AAIA,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACTf,IAAM,gBAAgB,GAAG,IAAI,gBAAgB,EAAE,CAAC;AAChD,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACFjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC"}

//// [/src/first/first_part2.ts]
///<reference path="./tripleRef.d.ts"/>
const first_part2Const = new firstfirst_part2();
console.log(f());


//// [/src/first/tripleRef.d.ts]
declare class firstfirst_part2 { }

//// [/src/second/second_part1.ts]
///<reference path="./tripleRef.d.ts"/>
const second_part1Const = new secondsecond_part1();
namespace N {
    // Comment text
}

namespace N {
    function f() {
        console.log('testing');
    }

    f();
}


//// [/src/second/tripleRef.d.ts]
declare class secondsecond_part1 { }

//// [/src/third/thirdjs/output/third-output.d.ts]
/// <reference path="../../tripleRef.d.ts" />
/// <reference path="../tripleRef.d.ts" />
interface TheFirst {
    none: any;
}
declare const s = "Hello, world";
interface NoJsForHereEither {
    none: any;
}
declare const first_part2Const: firstfirst_part2;
declare function f(): string;
//# sourceMappingURL=first-output.d.ts.map
/// <reference path="../second/tripleRef.d.ts" />
declare const second_part1Const: secondsecond_part1;
declare namespace N {
}
declare namespace N {
}
declare class C {
    doSomething(): void;
}
//# sourceMappingURL=second-output.d.ts.map
declare const third_part1Const: thirdthird_part1;
declare var c: C;
//# sourceMappingURL=third-output.d.ts.map

//// [/src/third/thirdjs/output/third-output.d.ts.map]
{"version":3,"file":"third-output.d.ts","sourceRoot":"","sources":["../../third_part1.ts","../../../first/first_PART1.ts","../../../first/first_part2.ts","../../../first/first_part3.ts","../../../second/second_part1.ts","../../../second/second_part2.ts"],"names":[],"mappings":";;ACAA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,iBAAiB,CAAC;AAEzB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;ACPD,QAAA,MAAM,gBAAgB,kBAAyB,CAAC;ACDhD,iBAAS,CAAC,WAET;;;ACDD,QAAA,MAAM,iBAAiB,oBAA2B,CAAC;AACnD,kBAAU,CAAC,CAAC;CAEX;AAED,kBAAU,CAAC,CAAC;CAMX;ACZD,cAAM,CAAC;IACH,WAAW;CAGd;;ALHD,QAAA,MAAM,gBAAgB,kBAAyB,CAAC;AAChD,QAAA,IAAI,CAAC,GAAU,CAAC"}

//// [/src/third/thirdjs/output/third-output.js]
var s = "Hello, world";
console.log(s);
var first_part2Const = new firstfirst_part2();
console.log(f());
function f() {
    return "JS does hoists";
}
//# sourceMappingURL=first-output.js.map
var second_part1Const = new secondsecond_part1();
var N;
(function (N) {
    function f() {
        console.log('testing');
    }
    f();
})(N || (N = {}));
var C = (function () {
    function C() {
    }
    C.prototype.doSomething = function () {
        console.log("something got done");
    };
    return C;
}());
//# sourceMappingURL=second-output.js.map
var third_part1Const = new thirdthird_part1();
var c = new C();
c.doSomething();
//# sourceMappingURL=third-output.js.map

//// [/src/third/thirdjs/output/third-output.js.map]
{"version":3,"file":"third-output.js","sourceRoot":"","sources":["../../third_part1.ts","../../../first/first_PART1.ts","../../../first/first_part2.ts","../../../first/first_part3.ts","../../../second/second_part1.ts","../../../second/second_part2.ts"],"names":[],"mappings":"ACIA,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACTf,IAAM,gBAAgB,GAAG,IAAI,gBAAgB,EAAE,CAAC;AAChD,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACFjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;;ACDD,IAAM,iBAAiB,GAAG,IAAI,kBAAkB,EAAE,CAAC;AAKnD,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;ACZD;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC;;ALHD,IAAM,gBAAgB,GAAG,IAAI,gBAAgB,EAAE,CAAC;AAChD,IAAI,CAAC,GAAG,IAAI,CAAC,EAAE,CAAC;AAChB,CAAC,CAAC,WAAW,EAAE,CAAC"}

//// [/src/third/third_part1.ts]
///<reference path="./tripleRef.d.ts"/>
const third_part1Const = new thirdthird_part1();
var c = new C();
c.doSomething();


//// [/src/third/tripleRef.d.ts]
declare class thirdthird_part1 { }

