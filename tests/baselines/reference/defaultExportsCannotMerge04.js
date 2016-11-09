//// [defaultExportsCannotMerge04.ts]

export default function Foo() {
}

namespace Foo {
    export var x;
}

interface Foo {
}

export interface Foo {
}

//// [defaultExportsCannotMerge04.js]
"use strict";
function Foo() {
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Foo;
var Foo;
(function (Foo) {
})(Foo || (Foo = {}));
