//// [tests/cases/compiler/unusedLocalsAndObjectSpread2.ts] ////

//// [unusedLocalsAndObjectSpread2.ts]
declare let props: any;
const {
    children, // here!
    active: _a, // here!
  ...rest
} = props;

function foo() {
    const {
        children,
        active: _a,
        ...rest
    } = props;
}

export const asdf = 123;

//// [unusedLocalsAndObjectSpread2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asdf = void 0;
const { children, // here!
active: _a, // here!
...rest } = props;
function foo() {
    const { children, active: _a, ...rest } = props;
}
exports.asdf = 123;
