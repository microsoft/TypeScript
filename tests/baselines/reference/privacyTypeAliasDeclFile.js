//// [privacyTypeAliasDeclFile.ts]
interface Window {
    someMethod();
}
module M {
    type W = Window | string;
    export module N {
        export class Window { }
        export var p: W; // Should report error that W is private
    }
}
module M1 {
    export type W = Window | string;
    export module N {
        export class Window { }
        export var p: W;
    }
}

//// [privacyTypeAliasDeclFile.js]
var M;
(function (M) {
    var N;
    (function (N) {
        var Window = (function () {
            function Window() {
            }
            return Window;
        })();
        N.Window = Window;
        N.p; // Should report error that W is private
    })(N = M.N || (M.N = {}));
})(M || (M = {}));
var M1;
(function (M1) {
    var N;
    (function (N) {
        var Window = (function () {
            function Window() {
            }
            return Window;
        })();
        N.Window = Window;
        N.p;
    })(N = M1.N || (M1.N = {}));
})(M1 || (M1 = {}));
