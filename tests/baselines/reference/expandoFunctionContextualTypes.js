//// [tests/cases/compiler/expandoFunctionContextualTypes.ts] ////

//// [expandoFunctionContextualTypes.ts]
interface MyComponentProps {
    color: "red" | "blue"
}

interface StatelessComponent<P> {
    (): any;
    defaultProps?: Partial<P>;
}

const MyComponent: StatelessComponent<MyComponentProps> = () => null as any;

MyComponent.defaultProps = {
    color: "red"
};


//// [expandoFunctionContextualTypes.js]
"use strict";
const MyComponent = () => null;
MyComponent.defaultProps = {
    color: "red"
};
