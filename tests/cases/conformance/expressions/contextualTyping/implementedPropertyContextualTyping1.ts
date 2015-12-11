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
