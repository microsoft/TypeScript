//// [tests/cases/compiler/jsxFactoryIdentifierAsParameter.ts] ////

//// [test.tsx]
declare namespace JSX {
    interface IntrinsicElements {
        [s: string]: any;
    }
}

export class AppComponent {
    render(createElement) {
        return <div />;
    }
}


//// [test.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppComponent = void 0;
class AppComponent {
    render(createElement) {
        return createElement("div", null);
    }
}
exports.AppComponent = AppComponent;
//# sourceMappingURL=test.js.map