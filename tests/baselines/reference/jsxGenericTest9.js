//// [file.tsx]
/* @jsx-mode generic */

interface Attributes {
    class?:     string;
    id?:        string;
    onclick?:   (this: HTMLElement, ev: MouseEvent) => void;
}
 
class Div {
	constructor(attrs?: Attributes, ...children:Span[]) {
	}
	
	public dummy() {
	}
}

class Span {
	constructor(attrs?: Attributes, ...children:Div[]) {
	}
}

function test() {
    return <Div class="test">
                <Span/>
           </Div>;
}

//// [file.js]
/* @jsx-mode generic */
var Div = /** @class */ (function () {
    function Div(attrs) {
        var children = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            children[_i - 1] = arguments[_i];
        }
    }
    Div.prototype.dummy = function () {
    };
    return Div;
}());
var Span = /** @class */ (function () {
    function Span(attrs) {
        var children = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            children[_i - 1] = arguments[_i];
        }
    }
    return Span;
}());
function test() {
    return new Div({ "class": "test" },
        new Span(null));
}
