//// [implementedPropertyContextualTyping1.ts]
interface Event {
	time: number
}
interface Listener {
	handle: (e: Event) => void;
}

class Foo implements Listener {
	handle = e => { 
		let n: number = e.time;
	}
}


//// [implementedPropertyContextualTyping1.js]
var Foo = (function () {
    function Foo() {
        this.handle = function (e) {
            var n = e.time;
        };
    }
    return Foo;
}());
