// @preserveConstEnums: true
module M {
  const enum E {
    Value = 1, Value2 = Value
  }
}

// Module M should be considered instantiated if we have preserveConstEnum set.
var v = M;