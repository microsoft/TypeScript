class C {
    x = 1;
}

var c = new C();
c.x = 3;
var c2 = new C();
var r = c.x === c2.x;

// #31792
export class MyMap<K, V> {
	constructor(private readonly Map_: typeof Map = Map) {}
	private readonly store = new this.Map_<K, V>();
}
