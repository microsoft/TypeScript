//// [tests/cases/conformance/jsx/tsxSpreadAttributesResolution17.tsx] ////

//// [file.tsx]
declare global {
    namespace JSX {
        interface Element {}
        interface ElementAttributesProperty { props: {} }
    }
}
declare var React: any;

export class Empty extends React.Component<{}, {}> {
    render() {
        return <div>Hello</div>;
    }
}

declare const obj: { a: number | undefined } | undefined;

// OK
let unionedSpread = <Empty {...obj} />;


//// [file.jsx]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Empty = void 0;
class Empty extends React.Component {
    render() {
        return <div>Hello</div>;
    }
}
exports.Empty = Empty;
let unionedSpread = <Empty {...obj}/>;
