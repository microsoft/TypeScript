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
var foundFirst = /** @class */ (function () {
    function foundFirst() {
    }
    return foundFirst;
}());
var Other = /** @class */ (function () {
    function Other() {
    }
    return Other;
}());
var Dotted;
(function (Dotted) {
    var Name = /** @class */ (function () {
        function Name() {
        }
        return Name;
    }());
    Dotted.Name = Name;
})(Dotted || (Dotted = {}));
// Should find the intrinsic element, not the class element
var a = <foundFirst x="hello"/>;
var b = <string_named />;
// TODO: This should not be a parse error (should
//        parse a property name here, not identifier)
// var c = <var />;
var d = <Other />;
var e = <Dotted.Name />;
