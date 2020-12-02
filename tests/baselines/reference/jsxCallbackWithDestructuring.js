//// [jsxCallbackWithDestructuring.tsx]
// minimal component
interface Component<P = {}, S = {}> { }
declare class Component<P, S> {
    constructor(props: P, context?: any);
    render(): {};
    props: Readonly<{ children?: {} }> & Readonly<P>;
}

declare global {
    namespace JSX {
        interface Element  { }
        interface ElementClass  {
            render(): {};
        }
        interface ElementAttributesProperty { props: {}; }
        interface ElementChildrenAttribute { children: {}; }
        interface IntrinsicAttributes  { }
        interface IntrinsicClassAttributes<T> { }
    }
}

export interface RouteProps {
    children?: (props: { x: number }) => any;
}
export class MyComponent<T extends RouteProps = RouteProps> extends Component<T> { }
<MyComponent children={({ x }) => {}}/>

//// [jsxCallbackWithDestructuring.jsx]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.MyComponent = void 0;
var MyComponent = /** @class */ (function (_super) {
    __extends(MyComponent, _super);
    function MyComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MyComponent;
}(Component));
exports.MyComponent = MyComponent;
<MyComponent children={function (_a) {
    var x = _a.x;
}}/>;
