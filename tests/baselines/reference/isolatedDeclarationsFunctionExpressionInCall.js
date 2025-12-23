//// [tests/cases/compiler/isolatedDeclarationsFunctionExpressionInCall.ts] ////

//// [isolatedDeclarationsFunctionExpressionInCall.ts]
declare function observer<T>(fn: T): T;
declare function action<T>(fn: T): T;

export const Component = observer(() => {
  return "hello";
});

export const thing = action(function () {
  return Component;
});

export const arrowWithType = observer((): string => {
  return "typed";
});

export const functionWithType = action(function (): typeof Component {
  return Component;
});

//// [isolatedDeclarationsFunctionExpressionInCall.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.functionWithType = exports.arrowWithType = exports.thing = exports.Component = void 0;
exports.Component = observer(function () {
    return "hello";
});
exports.thing = action(function () {
    return exports.Component;
});
exports.arrowWithType = observer(function () {
    return "typed";
});
exports.functionWithType = action(function () {
    return exports.Component;
});
