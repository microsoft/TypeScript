// @target: es2015
class X1 {
  "constructor" = 3; // Error
}

class X2 {
  ["constructor"] = 3;
}
