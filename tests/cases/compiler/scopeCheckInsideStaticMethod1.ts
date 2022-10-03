class C {
   private v;
   public p;
   static s;
   static b() {
      v = 1; // ERR
      C.s = 1;
      this.p = 1; // ERR
   }
}