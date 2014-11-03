//// [declFileTypeAlias.ts]
interface Window {
    someMethod();
}
module M {
    export type Value = string | number | boolean;
    export var x: Value;
}
module M {
    export type W = Window | string;
    export module N {
        export class Window { }
        export var p: W;
    }
}

//// [declFileTypeAlias.js]
var M;
(function (M) {
    M.x;
})(M || (M = {}));
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
        N.p;
    })(N = M.N || (M.N = {}));
})(M || (M = {}));


//// [declFileTypeAlias.d.ts]
interface Window {
    someMethod(): any;
}
declare module M {
    type Value = string | number | boolean;
    var x: Value;
}
declare module M {
    type W = string | Window;
    module N {
        class Window {
        }
        var p: W;
    }
}
