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
    var base: React.Component<any, {}>;
    export = base;
}

//@filename: consumer.tsx
/// <reference path="component.d.ts" />
import BaseComponent = require('BaseComponent');
class TestComponent extends React.Component<any, {}> {
    render() {
        return <BaseComponent />;
    }
}
