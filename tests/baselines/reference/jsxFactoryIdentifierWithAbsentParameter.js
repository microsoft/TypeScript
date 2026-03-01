//// [tests/cases/compiler/jsxFactoryIdentifierWithAbsentParameter.ts] ////

//// [test.tsx]
declare namespace JSX {
    interface IntrinsicElements {
        [s: string]: any;
    }
}

export class AppComponent {
    render() {
        return <div />;
    }
}


//// [test.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppComponent = void 0;
class AppComponent {
    render() {
        return createElement("div", null);
    }
}
exports.AppComponent = AppComponent;
//# sourceMappingURL=test.js.map