//// [test.tsx]
/// <reference path="/.lib/react16.d.ts" />

export function T1(a: any) {
    return <div className={"T1"} { ...a }>T1</div>;
}

export function T2(a: any, b: any) {
    return <div className={"T2"} { ...a } { ...b }>T2</div>;
}

export function T3(a: any, b: any) {
    return <div { ...a } className={"T3"} { ...b }>T3</div>;
}

export function T4(a: any, b: any) {
    return <div className={"T4"} { ...{ ...a, ...b } }>T4</div>;
}

export function T5(a: any, b: any, c: any, d: any) {
    return <div className={"T5"} { ...{ ...a, ...b, ...{ c, d } } }>T5</div>;
}

export function T6(a: any, b: any, c: any, d: any) {
    return <div className={"T6"} { ...{ ...a, ...b, ...{ ...c, ...d } } }>T6</div>;
}

export function T7(a: any, b: any, c: any, d: any) {
    return <div>T7</div>;
}


//// [test.js]
import { jsx as _jsx } from "react/jsx-runtime";
/// <reference path="react16.d.ts" />
export function T1(a) {
    return _jsx("div", Object.assign({ className: "T1" }, a, { children: "T1" }), void 0);
}
export function T2(a, b) {
    return _jsx("div", Object.assign({ className: "T2" }, a, b, { children: "T2" }), void 0);
}
export function T3(a, b) {
    return _jsx("div", Object.assign({}, a, { className: "T3" }, b, { children: "T3" }), void 0);
}
export function T4(a, b) {
    return _jsx("div", Object.assign({ className: "T4" }, Object.assign(Object.assign({}, a), b), { children: "T4" }), void 0);
}
export function T5(a, b, c, d) {
    return _jsx("div", Object.assign({ className: "T5" }, Object.assign(Object.assign(Object.assign({}, a), b), { c, d }), { children: "T5" }), void 0);
}
export function T6(a, b, c, d) {
    return _jsx("div", Object.assign({ className: "T6" }, Object.assign(Object.assign(Object.assign({}, a), b), Object.assign(Object.assign({}, c), d)), { children: "T6" }), void 0);
}
export function T7(a, b, c, d) {
    return _jsx("div", { children: "T7" }, void 0);
}
