//// [tests/cases/compiler/jsxDevSelfInSuperArguments.tsx] ////

//// [index.d.ts]
export namespace JSX {
    interface Element {}
    interface IntrinsicElements {
        h2: {};
    }
}
export function jsxDEV(type: any, props: any, key?: any, isStatic?: boolean, source?: any, self?: any): JSX.Element;

//// [index.tsx]
class Base {
    content: any;
    constructor(...args: any[]) { this.content = args[0]; }
}
class Card extends Base {
    constructor(title: string) {
        super(<h2>{title}</h2>);
    }
}
class Nested extends Base {
    constructor() {
        super({ render() { return <h2 />; } });
    }
}
class Outer extends Base {
    constructor() {
        super(class extends Base { constructor() { super(<h2 />); } }, <h2 />);
    }
}


//// [index.js]
import { jsxDEV as _jsxDEV } from "preact/jsx-dev-runtime";
const _jsxFileName = "/index.tsx";
class Base {
    content;
    constructor(...args) { this.content = args[0]; }
}
class Card extends Base {
    constructor(title) {
        super(_jsxDEV("h2", { children: title }, void 0, false, { fileName: _jsxFileName, lineNumber: 7, columnNumber: 15 }, void 0));
    }
}
class Nested extends Base {
    constructor() {
        super({ render() { return _jsxDEV("h2", {}, void 0, false, { fileName: _jsxFileName, lineNumber: 12, columnNumber: 35 }, this); } });
    }
}
class Outer extends Base {
    constructor() {
        super(class extends Base {
            constructor() { super(_jsxDEV("h2", {}, void 0, false, { fileName: _jsxFileName, lineNumber: 17, columnNumber: 58 }, void 0)); }
        }, _jsxDEV("h2", {}, void 0, false, { fileName: _jsxFileName, lineNumber: 17, columnNumber: 72 }, void 0));
    }
}
