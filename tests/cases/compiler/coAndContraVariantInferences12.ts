// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/59765

type FunctionComponent<P = any> = (props: P) => Element | null;

interface ElementAttributes {
  idomKey?: string | null | number;
  children?: unknown;
  skip?: boolean;
}

declare function element<P>(
  tag: FunctionComponent<P & ElementAttributes>,
  attributes: P & ElementAttributes,
): Element;

declare function ElName(props: { name?: string }): Element;
element(ElName, {}); // ok
element(ElName, { age: 42 }); // error

declare function ElName2(props: { name: string }): Element;
element(ElName2, {}); // error

declare function ElEmpty(props: {}): Element;
element(ElEmpty, { name: "Trevor" }); // ok
declare const withOptionalName: { name?: string };
element(ElEmpty, withOptionalName); // ok
