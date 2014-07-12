
class Foo { static bar() { return "x"; } }

var baz = Foo.b;
  // Foo.b won't bind. 
baz.concat("y");

  // So we don't want an error on 'concat'.