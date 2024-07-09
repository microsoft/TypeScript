// @strict: true

// Repro from #20196

type A = {
  a: (x: number) => string
};
type B = {
  a: (x: boolean) => string
};

function call0(p: A | B) { 
  p.a("s"); // Error
}

function callN<T extends A | B>(p: T) {
  p.a("s"); // Error
  
  var a: T["a"] = p.a;
  a(""); // Error
  a("", "", "", ""); // Error
}