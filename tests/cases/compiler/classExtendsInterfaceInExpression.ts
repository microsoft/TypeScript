interface A {}

function factory(a: any): {new(): Object} {
  return null;
}

class C extends factory(A) {}
