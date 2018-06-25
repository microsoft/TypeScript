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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Empty = /** @class */ (function (_super) {
    __extends(Empty, _super);
    function Empty() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Empty.prototype.render = function () {
        return <div>Hello</div>;
    };
    return Empty;
}(React.Component));
exports.Empty = Empty;
// OK
var unionedSpread = <Empty {...obj}/>;
