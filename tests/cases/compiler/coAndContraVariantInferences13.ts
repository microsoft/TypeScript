// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/59765

type FunctionComponent<P = any> = (props: P) => Element | null;

interface ElementAttributes {
  idomKey: string | null | number;
  children?: unknown;
  skip?: boolean;
}

declare function element<P>(
  tag: FunctionComponent<P & ElementAttributes>,
  attributes: P & ElementAttributes,
): Element;

declare function ElName(props: { name?: string }): Element;
element(ElName, {}); // error
element(ElName, { age: 42 }); // error
element(ElName, { idomKey: null }); // ok
element(ElName, { idomKey: null, name: "Trevor" }); // ok

declare function ElName2(props: { name: string }): Element;
element(ElName2, {}); // error
element(ElName2, { age: 42 }); // error
element(ElName2, { idomKey: null }); // error

declare function ElEmpty(props: {}): Element;
element(ElEmpty, { name: "Trevor" }); // error
element(ElEmpty, { age: 42 }); // error
element(ElEmpty, { idomKey: null }); // ok
element(ElEmpty, { idomKey: null, name: "Trevor" }); // ok
declare const withOptionalName: { name?: string };
element(ElEmpty, withOptionalName); // error
element(ElEmpty, { ...withOptionalName, idomKey: null }); // ok
