//// [tests/cases/compiler/reactJsxReactResolvedNodeNextEsm.tsx] ////

//// [package.json]
{
    "type": "module"
}
//// [file.tsx]
export const a = <div></div>;
//// [package.json]
{
    "name": "@types/react",
    "version": "0.0.1",
    "main": "",
    "types": "index.d.ts",
    "exports": {
        "./*.js": "./*.js",
        "./*": "./*.js"
    }
}
//// [index.d.ts]
declare namespace JSX {
    interface IntrinsicElements { [x: string]: any; }
}
//// [jsx-runtime.d.ts]
import './';
//// [jsx-dev-runtime.d.ts]
import './';


//// [file.js]
import { jsx as _jsx } from "react/jsx-runtime";
export const a = _jsx("div", {}, void 0);
