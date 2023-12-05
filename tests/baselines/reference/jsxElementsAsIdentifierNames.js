//// [tests/cases/compiler/jsxElementsAsIdentifierNames.tsx] ////

//// [a.tsx]
declare const React: any;
declare module JSX {
    interface IntrinsicElements {
        ["package"]: any;
    }
}

function A() {
    return <package />
}

function B() {
    return <package></package>
}


//// [a.js]
"use strict";
function A() {
    return React.createElement("package", null);
}
function B() {
    return React.createElement("package", null);
}
