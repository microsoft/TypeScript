//// [namespaceExportsAreReadonly.ts]
namespace N {
    export const x = 0;

    export class C {}
    export let D = class {}

    export function f() {}
    export let g = function() {}

    export enum E {}
    enum Ff {}
    export let F = Ff;

    export namespace M { export const y = 0; }
    namespace Oo { export const y = 0; }
    export let O = Oo;
}

N.x = 1; // Error

N.C = class {}; // Error
N.D = class {}; // OK

N.f = function() {} // Error
N.g = function() {} // OK

enum Ee {}
N.E = Ee; // Error
enum Ff {}
N.F = Ff; // OK

namespace Mm { export const y = 0; }
N.M = Mm; // Error
namespace Oo { export const y = 0; }
N.O = Oo; // OK

class K {
    m() {}
}
new K().m = () => {}; // OK


//// [namespaceExportsAreReadonly.js]
var N;
(function (N) {
    N.x = 0;
    var C = (function () {
        function C() {
        }
        return C;
    }());
    N.C = C;
    N.D = (function () {
        function class_1() {
        }
        return class_1;
    }());
    function f() { }
    N.f = f;
    N.g = function () { };
    var E;
    (function (E) {
    })(E = N.E || (N.E = {}));
    var Ff;
    (function (Ff) {
    })(Ff || (Ff = {}));
    N.F = Ff;
    var M;
    (function (M) {
        M.y = 0;
    })(M = N.M || (N.M = {}));
    var Oo;
    (function (Oo) {
        Oo.y = 0;
    })(Oo || (Oo = {}));
    N.O = Oo;
})(N || (N = {}));
N.x = 1; // Error
N.C = (function () {
    function class_2() {
    }
    return class_2;
}()); // Error
N.D = (function () {
    function class_3() {
    }
    return class_3;
}()); // OK
N.f = function () { }; // Error
N.g = function () { }; // OK
var Ee;
(function (Ee) {
})(Ee || (Ee = {}));
N.E = Ee; // Error
var Ff;
(function (Ff) {
})(Ff || (Ff = {}));
N.F = Ff; // OK
var Mm;
(function (Mm) {
    Mm.y = 0;
})(Mm || (Mm = {}));
N.M = Mm; // Error
var Oo;
(function (Oo) {
    Oo.y = 0;
})(Oo || (Oo = {}));
N.O = Oo; // OK
var K = (function () {
    function K() {
    }
    K.prototype.m = function () { };
    return K;
}());
new K().m = function () { }; // OK
