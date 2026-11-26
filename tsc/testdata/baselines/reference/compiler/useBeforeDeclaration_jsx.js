//// [tests/cases/compiler/useBeforeDeclaration_jsx.tsx] ////

//// [useBeforeDeclaration_jsx.tsx]
namespace JSX {
    export interface Element {}
}

class C {
    static a = <C.z></C.z>;
    static b = <C.z/>;
    static c = <span {...C.x}></span>;
    static d = <span id={C.y}></span>;
    static e = <span>{C.y}</span>;
    static x = {};
    static y = '';
    static z = () => <b></b>;
}


//// [useBeforeDeclaration_jsx.jsx]
"use strict";
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
class C {
}
C.a = <C.z></C.z>;
C.b = <C.z />;
C.c = <span {...C.x}></span>;
C.d = <span id={C.y}></span>;
C.e = <span>{C.y}</span>;
C.x = {};
C.y = '';
C.z = __setFunctionName(() => <b></b>, "z");
