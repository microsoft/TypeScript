//// [jsxNamespacePrefixIntrinsics.tsx]
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


//// [jsxNamespacePrefixIntrinsics.jsx]
var valid = <ns:element ns:attribute="yep"/>;
var validUpcase = <ns:NamespacedUpcaseAlsoIntrinsic />;
var invalid1 = <element />;
var invalid2 = <ns:element attribute="nope"/>;
var invalid3 = <ns:element ns:invalid="nope"/>;
