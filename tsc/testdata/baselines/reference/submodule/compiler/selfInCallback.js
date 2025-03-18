//// [tests/cases/compiler/selfInCallback.ts] ////

//// [selfInCallback.ts]
class C {
	public p1 = 0;
	public callback(cb:()=>void) {cb();}
	public doit() {
		this.callback(()=>{this.p1+1});
	}
}

//// [selfInCallback.js]
class C {
    p1 = 0;
    callback(cb) { cb(); }
    doit() {
        this.callback(() => { this.p1 + 1; });
    }
}
