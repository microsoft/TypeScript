module Foo {     var testing = "";     test }

class C1 {
	public pubMeth() {this.} // test on 'this.'
	private privMeth() {}
	public pubProp;
	private privProp;
}

var f = new C1();
f. // test on F.
module M {
    export class C { public pub; private priv; }
    export var V = 0;
}


var c = new M.C();

c. // test on c.

//Test for comment
//c.  