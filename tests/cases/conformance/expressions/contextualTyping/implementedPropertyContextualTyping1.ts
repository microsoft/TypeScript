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
interface StringLiteral {
	literal(): "A";
}

abstract class Watcher {
	abstract watch(e: Event): number;
}

class Alarm extends Watcher implements Listener, Ringer, StringLiteral {
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
	literal() {
		return "A"; // ok: "A" is assignable to "A"
	}
}