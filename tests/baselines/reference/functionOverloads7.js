//// [tests/cases/compiler/functionOverloads7.ts] ////

//// [functionOverloads7.ts]
class foo { 
   private bar();
   private bar(foo: string);
   private bar(foo?: any){ return "foo" }
   public n() {
     var foo = this.bar();
     foo = this.bar("test");
   }
}


//// [functionOverloads7.js]
class foo {
    bar(foo) { return "foo"; }
    n() {
        var foo = this.bar();
        foo = this.bar("test");
    }
}
