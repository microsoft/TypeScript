//// [tests/cases/compiler/jsxInExtendsClause.tsx] ////

//// [jsxInExtendsClause.tsx]
// https://github.com/Microsoft/TypeScript/issues/13157
declare namespace React {
  interface ComponentClass<P> { new (): Component<P, {}>; }
  class Component<A, B> {}
}
declare function createComponentClass<P>(factory: () => React.ComponentClass<P>): React.ComponentClass<P>;
class Foo extends createComponentClass(() => class extends React.Component<{}, {}> {
  render() {
    return <span>Hello, world!</span>;
  }
}) {}

//// [jsxInExtendsClause.js]
class Foo extends createComponentClass(() => class extends React.Component {
    render() {
        return <span>Hello, world!</span>;
    }
}) {
}
