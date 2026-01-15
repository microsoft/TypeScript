class C { private v; public p; static s; }
class D extends C {
  public v: number;
  public p: number
  constructor() {
   super()
   this.v = 1;
   this.p = 1;
   C.s = 1;
  }
}