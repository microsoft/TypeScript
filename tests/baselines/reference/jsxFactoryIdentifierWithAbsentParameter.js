//// [test.tsx]

declare module JSX {
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
class AppComponent {
    render() {
        return createElement("div", null);
    }
}
exports.AppComponent = AppComponent;
//# sourceMappingURL=test.js.map