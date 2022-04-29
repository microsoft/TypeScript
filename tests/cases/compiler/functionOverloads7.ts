class foo { 
   private bar();
   private bar(foo: string);
   private bar(foo?: any){ return "foo" }
   public n() {
     var foo = this.bar();
     foo = this.bar("test");
   }
}
