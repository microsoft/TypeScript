class A

{
    constructor() {
        this.foo: any;
        this.bar: any;
    }


  baz() {

     this.foo = "foo";

     this.bar = "bar";

     [1, 2].forEach((p) => this.foo);

     [1, 2].forEach((p) => this.bar);

  }

}



var a = new A();

a.baz();


