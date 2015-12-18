//// [implementedPropertyContextualTyping1.ts]
interface Event {
	time: number;
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
abstract class Watcher {
	abstract watch(e: Event): number;
}

class Alarm extends Watcher implements Listener, Ringer {
	str: string;
	handle = e => {
		this.str = e.time; // error
	}
	superHandle = e => {
		this.str = e.time; // error
		return e.time;
	}
	ring(times) {
		this.str = times; // error
	}
	watch(e) {
		this.str = e.time; // error
		return e.time;
	}
}

//// [implementedPropertyContextualTyping1.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Watcher = (function () {
    function Watcher() {
    }
    return Watcher;
})();
var Alarm = (function (_super) {
    __extends(Alarm, _super);
    function Alarm() {
        var _this = this;
        _super.apply(this, arguments);
        this.handle = function (e) {
            _this.str = e.time; // error
        };
        this.superHandle = function (e) {
            _this.str = e.time; // error
            return e.time;
        };
    }
    Alarm.prototype.ring = function (times) {
        this.str = times; // error
    };
    Alarm.prototype.watch = function (e) {
        this.str = e.time; // error
        return e.time;
    };
    return Alarm;
})(Watcher);
