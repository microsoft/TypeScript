//// [tests/cases/conformance/jsx/checkJsxIntersectionElementPropsType.tsx] ////

//// [checkJsxIntersectionElementPropsType.tsx]
declare namespace JSX {
    interface ElementAttributesProperty { props: {}; }
}

declare class Component<P> {
  constructor(props: Readonly<P>);
  readonly props: Readonly<P>;
}

class C<T> extends Component<{ x?: boolean; } & T> {}
const y = new C({foobar: "example"});
const x = <C foobar="example" />

//// [checkJsxIntersectionElementPropsType.jsx]
class C extends Component {
}
const y = new C({ foobar: "example" });
const x = <C foobar="example"/>;
