// @jsx: preserve
// @target: ES6
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
