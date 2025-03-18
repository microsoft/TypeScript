//// [tests/cases/compiler/invalidThisEmitInContextualObjectLiteral.ts] ////

//// [invalidThisEmitInContextualObjectLiteral.ts]
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


//// [invalidThisEmitInContextualObjectLiteral.js]
class TestController {
    m(def) { }
    p = this.m({
        p1: e => { },
        p2: () => { return vvvvvvvvv => this; },
    });
}
