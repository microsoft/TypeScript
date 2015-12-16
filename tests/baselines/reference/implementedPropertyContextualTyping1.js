//// [implementedPropertyContextualTyping1.ts]
interface Event {
	time: number
}
interface Base {
	superHandle: (e: Event) => number;
}
interface Listener extends Base {
	handle: (e: Event) => void;
}
interface Ringer {
	ring: (times: number) => void;
}

class Alarm implements Listener, Ringer {
	handle = e => { 
		let n: number = e.time;
	}
	superHandle = e => {
		return e.time;
	}
	ring = times => {
		let m: number = times + 1;
	}
}

//// [implementedPropertyContextualTyping1.js]
var Alarm = (function () {
    function Alarm() {
        this.handle = function (e) {
            var n = e.time;
        };
        this.superHandle = function (e) {
            return e.time;
        };
        this.ring = function (times) {
            var m = times + 1;
        };
    }
    return Alarm;
}());
