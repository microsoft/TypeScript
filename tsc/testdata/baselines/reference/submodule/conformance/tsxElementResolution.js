//// [tests/cases/conformance/jsx/tsxElementResolution.tsx] ////

//// [tsxElementResolution.tsx]
declare namespace JSX {
	interface IntrinsicElements {
		foundFirst: { x: string };
		'string_named';
		'var';
	}
}

class foundFirst { }
class Other {}

module Dotted {
	export class Name { }
}

// Should find the intrinsic element, not the class element
var a = <foundFirst  x="hello" />;
var b = <string_named />;
// TODO: This should not be a parse error (should
//        parse a property name here, not identifier)
// var c = <var />;
var d = <Other />;
var e = <Dotted.Name />;


//// [tsxElementResolution.jsx]
class foundFirst {
}
class Other {
}
var Dotted;
(function (Dotted) {
    class Name {
    }
    Dotted.Name = Name;
})(Dotted || (Dotted = {}));
var a = <foundFirst x="hello"/>;
var b = <string_named />;
var d = <Other />;
var e = <Dotted.Name />;
