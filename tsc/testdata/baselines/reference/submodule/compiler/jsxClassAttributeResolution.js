//// [tests/cases/compiler/jsxClassAttributeResolution.tsx] ////

//// [file.tsx]
class App {}
export const a = <App></App>;
//// [package.json]
{
    "name": "@types/react",
    "version": "0.0.1",
    "main": "",
    "types": "index.d.ts",
}
//// [index.d.ts]
interface IntrinsicClassAttributesAlias<T> {
    ref: T
}
declare namespace JSX {
    type IntrinsicClassAttributes<T> = IntrinsicClassAttributesAlias<T>
}
//// [jsx-runtime.d.ts]
import './';
//// [jsx-dev-runtime.d.ts]
import './';


//// [file.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
class App {
}
exports.a = <App></App>;
