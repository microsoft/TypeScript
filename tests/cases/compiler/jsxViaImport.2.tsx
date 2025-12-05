//@jsx: preserve
//@module: commonjs

//@filename: component.d.ts
declare namespace JSX {
  interface ElementAttributesProperty { props; }
}
declare namespace React {
  class Component<T, U> { }
}
declare module "BaseComponent" {
    export default class extends React.Component<any, {}> {
    }
}

//@filename: consumer.tsx
/// <reference path="component.d.ts" />
import BaseComponent from 'BaseComponent';
class TestComponent extends React.Component<any, {}> {
    render() {
        return <BaseComponent />;
    }
}
