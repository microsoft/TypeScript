//// [downlevelLetConst13.ts]
'use strict'
// exported let\const bindings should not be renamed

export let foo = 10;
export const bar = "123"
export let [bar1] = [1];
export const [bar2] = [2];
export let {a: bar3} = { a: 1 };
export const {a: bar4} = { a: 1 };

export module M {
    export let baz = 100;
    export const baz2 = true;
    export let [bar5] = [1];
    export const [bar6] = [2];
    export let {a: bar7} = { a: 1 };
    export const {a: bar8} = { a: 1 };
}

//// [downlevelLetConst13.js]
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.M = exports.bar4 = exports.bar3 = exports.bar2 = exports.bar1 = exports.bar = exports.foo = void 0;
// exported let\const bindings should not be renamed
exports.foo = 10;
exports.bar = "123";
exports.bar1 = [1][0];
exports.bar2 = [2][0];
exports.bar3 = { a: 1 }.a;
exports.bar4 = { a: 1 }.a;
var M;
(function (M) {
    M.baz = 100;
    M.baz2 = true;
    M.bar5 = [1][0];
    M.bar6 = [2][0];
    M.bar7 = { a: 1 }.a;
    M.bar8 = { a: 1 }.a;
})(M = exports.M || (exports.M = {}));
