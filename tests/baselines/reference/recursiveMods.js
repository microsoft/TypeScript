//// [recursiveMods.ts]
export module Foo {
	export class C {}
}

export module Foo {

	function Bar() : C {
		if (true) { return Bar();}
		return new C();
	}

	function Baz() : C {
		var c = Baz();
		return Bar();
	}

	function Gar() {
		var c : C = Baz();
		return;
	}
	
}


//// [recursiveMods.js]
(function (Foo) {
    var C = (function () {
        function C() {
        }
        return C;
    })();
    Foo.C = C;
})(exports.Foo || (exports.Foo = {}));
var Foo = exports.Foo;

(function (Foo) {
    function Bar() {
        if (true) {
            return Bar();
        }
        return new Foo.C();
    }

    function Baz() {
        var c = Baz();
        return Bar();
    }

    function Gar() {
        var c = Baz();
        return;
    }
})(exports.Foo || (exports.Foo = {}));
var Foo = exports.Foo;
