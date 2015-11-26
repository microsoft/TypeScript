// doc 2.3
// only public function members can be overridden.

struct Base {
    private x: { foo: string };
}

struct Derived extends Base {
    private x: { foo: string; bar: string; }; // error
}

struct Base1 {
	public foo: any;
}

struct Derived1 extends Base1 {
	public foo: string; // error}
}

struct Base2 {
	static y: { foo: string };
}

struct Derived2 extends Base2 {
	static y: { foo: string; bar: string; }; // ok
}

struct Derived3 extends Base2 {
	static y: { foo: any }; // ok
}