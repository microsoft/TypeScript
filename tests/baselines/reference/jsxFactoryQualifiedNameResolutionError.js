//// [test.tsx]
declare module JSX {
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
class AppComponent {
    render(createElement) {
        return MyElement.createElement("div", null);
    }
}
exports.AppComponent = AppComponent;
//# sourceMappingURL=test.js.map