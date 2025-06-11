//// [tests/cases/conformance/jsx/tsxReactEmitSpreadAttribute.ts] ////

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

export function T8(a: any, b: any, c: any, d: any) {
    return <div className={"T8"} { ...{ __proto__: null, dir: 'rtl' } }>T8</div>;
}

export function T9(a: any, b: any, c: any, d: any) {
    return <div className={"T9"} { ...{ "__proto__": null } }>T9</div>;
}

declare const __proto__: string;

export function T10(a: any, b: any, c: any, d: any) {
    return <div className={"T10"} { ...{ [__proto__]: null } }>T10</div>;
}

export function T11(a: any, b: any, c: any, d: any) {
    return <div className={"T11"} { ...{ ["__proto__"]: null } }>T11</div>;
}

export function T12(a: any, b: any, c: any, d: any) {
    return <div className={"T12"} { ...{ __proto__ } }>T12</div>;
}


//// [test.js]
import { jsx as _jsx } from "react/jsx-runtime";
/// <reference path="react16.d.ts" />
export function T1(a) {
    return _jsx("div", { className: "T1", ...a, children: "T1" });
}
export function T2(a, b) {
    return _jsx("div", { className: "T2", ...a, ...b, children: "T2" });
}
export function T3(a, b) {
    return _jsx("div", { ...a, className: "T3", ...b, children: "T3" });
}
export function T4(a, b) {
    return _jsx("div", { className: "T4", ...a, ...b, children: "T4" });
}
export function T5(a, b, c, d) {
    return _jsx("div", { className: "T5", ...a, ...b, ...{ c, d }, children: "T5" });
}
export function T6(a, b, c, d) {
    return _jsx("div", { className: "T6", ...a, ...b, ...{ ...c, ...d }, children: "T6" });
}
export function T7(a, b, c, d) {
    return _jsx("div", { children: "T7" });
}
export function T8(a, b, c, d) {
    return _jsx("div", { className: "T8", ...{ __proto__: null, dir: 'rtl' }, children: "T8" });
}
export function T9(a, b, c, d) {
    return _jsx("div", { className: "T9", ...{ "__proto__": null }, children: "T9" });
}
export function T10(a, b, c, d) {
    return _jsx("div", { className: "T10", [__proto__]: null, children: "T10" });
}
export function T11(a, b, c, d) {
    return _jsx("div", { className: "T11", ["__proto__"]: null, children: "T11" });
}
export function T12(a, b, c, d) {
    return _jsx("div", { className: "T12", __proto__, children: "T12" });
}
