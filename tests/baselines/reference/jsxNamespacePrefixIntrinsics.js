//// [tests/cases/compiler/jsxNamespacePrefixIntrinsics.tsx] ////

//// [jsxNamespacePrefixIntrinsics.tsx]
declare namespace JSX {
  interface IntrinsicElements {
    "ns:element": {
      "ns:attribute": string;
    },
    "ns:NamespacedUpcaseAlsoIntrinsic": any,
    "NS:NamespacedUpcaseAlsoIntrinsic": any
  }
}

const valid = <ns:element ns:attribute="yep" />;
const validUpcase1 = <ns:NamespacedUpcaseAlsoIntrinsic />;
const validUpcase2 = <NS:NamespacedUpcaseAlsoIntrinsic />;

const invalid1 = <element />;
const invalid2 = <ns:element attribute="nope" />;
const invalid3 = <ns:element ns:invalid="nope" />;


//// [jsxNamespacePrefixIntrinsics.jsx]
var valid = <ns:element ns:attribute="yep"/>;
var validUpcase1 = <ns:NamespacedUpcaseAlsoIntrinsic />;
var validUpcase2 = <NS:NamespacedUpcaseAlsoIntrinsic />;
var invalid1 = <element />;
var invalid2 = <ns:element attribute="nope"/>;
var invalid3 = <ns:element ns:invalid="nope"/>;
