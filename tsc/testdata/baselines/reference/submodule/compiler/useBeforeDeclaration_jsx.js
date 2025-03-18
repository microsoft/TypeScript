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
class C {
    static a = <C.z></C.z>;
    static b = <C.z />;
    static c = <span {...C.x}></span>;
    static d = <span id={C.y}></span>;
    static e = <span>{C.y}</span>;
    static x = {};
    static y = '';
    static z = () => <b></b>;
}
