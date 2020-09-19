// @noImplicitAny: true
// @jsx: preserve

declare namespace JSX {
  interface IntrinsicElements {
    "ns:element": {
      "ns:attribute": string;
    },
    "ns:NamespacedUpcaseAlsoIntrinsic": any
  }
}

const valid = <ns:element ns:attribute="yep" />;
const validUpcase = <ns:NamespacedUpcaseAlsoIntrinsic />;

const invalid1 = <element />;
const invalid2 = <ns:element attribute="nope" />;
const invalid3 = <ns:element ns:invalid="nope" />;
