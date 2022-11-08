function takesCallback(fn: new (a: number) => void) {
  // ...
}

class OverlongCtor {
  constructor(a: number, b: number) {}
}

takesCallback(OverlongCtor);
