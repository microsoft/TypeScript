function Foo() {
   this.x = 1;
}
var x = new Foo(); // legal, considered a constructor function
class C extends Foo {} // error, could not find symbol Foo