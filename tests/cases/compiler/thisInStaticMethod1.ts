class foo {
 static x = 3;
 static bar() {
  return this.x;
 } 
} 
var x = foo.bar();