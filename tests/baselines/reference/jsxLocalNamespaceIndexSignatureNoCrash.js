//// [tests/cases/compiler/jsxLocalNamespaceIndexSignatureNoCrash.tsx] ////

//// [index.tsx]
export class X {
    static jsx() {
        return document.createElement('p');
    }
}

export namespace X {
    export namespace JSX {
        export type IntrinsicElements = {
            [other: string]: any;
        };
    }
}

function A() {
    return (<p>Hello</p>);
}

//// [index.js]
export class X {
    static jsx() {
        return document.createElement('p');
    }
}
function A() {
    return (X.jsx("p", null, "Hello"));
}
