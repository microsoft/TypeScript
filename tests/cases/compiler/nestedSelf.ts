module M {
 export class C {
   public n = 42;
   public foo() { [1,2,3].map((x) => { return this.n * x; })}
 }
}

