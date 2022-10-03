//// [es6modulekindWithES5Target7.ts]
export namespace N {
    var x = 0;
}

export namespace N2 {
    export interface I { }
}


//// [es6modulekindWithES5Target7.js]
export var N;
(function (N) {
    var x = 0;
})(N || (N = {}));
