function log(a) { }

class Vector {
 static foo = () => {
  // 'this' should be allowed in a static initializer.
  log(this);
 }
}