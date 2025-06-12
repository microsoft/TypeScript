//// [tests/cases/compiler/jsxCallbackWithDestructuring.tsx] ////

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyComponent = void 0;
class MyComponent extends Component {
}
exports.MyComponent = MyComponent;
<MyComponent children={({ x }) => { }}/>;
