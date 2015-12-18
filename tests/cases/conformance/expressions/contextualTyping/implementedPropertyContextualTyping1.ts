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
abstract class Watcher {
	abstract watch(e: Event): number;
}

class Alarm extends Watcher implements Listener, Ringer {
	handle = e => { 
		let n: number = e.time;
	}
	superHandle = e => {
		return e.time;
	}
	ring = times => {
		let m: number = times + 1;
	}
	watch(e) {
		return e.time;
	}
}