// @jsx: preserve
// @strict: true
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