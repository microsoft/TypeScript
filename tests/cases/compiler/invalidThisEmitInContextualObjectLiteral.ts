interface IDef {
	p1: (e:string) => void;
	p2: () => (n: number) => any;
}

class TestController {
	public m(def: IDef) { }
	public p = this.m({
		p1: e => { },
		p2: () => { return vvvvvvvvv => this; },
	});
}
