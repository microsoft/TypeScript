/// <reference path='fourslash.ts'/>

////
/////*L1*/type C<T> = T extends Array<infer U> ? U : never;
////
/////*L2*/  type   C  <  T  >   =   T   extends   Array   <   infer     U  >  ?   U   :   never  ; 
////
/////*L3*/type C<T> = T extends Array<infer U> ? U : T;
////
/////*L4*/  type   C  <  T  >   =   T   extends   Array   <   infer     U  >  ?   U   :   T  ;  
////
/////*L5*/type Foo<T> = T extends { a: infer U, b: infer U } ? U : never;
////
/////*L6*/  type   Foo  <  T  > = T   extends   {   a  :   infer   U  ,   b  :   infer   U   }   ?   U   :   never  ;  
////
/////*L7*/type Bar<T> = T extends { a: (x: infer U) => void, b: (x: infer U) => void } ? U : never;
////
/////*L8*/  type   Bar  <  T  >   =   T   extends   {   a  :   (x  :  infer  U  ) =>   void  ,   b  :   (x  :   infer   U  )   =>   void   }    ?   U   :   never  ;
////

format.document();

goTo.marker("L1");
verify.currentLineContentIs("type C<T> = T extends Array<infer U> ? U : never;");

goTo.marker("L2");
verify.currentLineContentIs("type C<T> = T extends Array<infer U> ? U : never;");

goTo.marker("L3");
verify.currentLineContentIs("type C<T> = T extends Array<infer U> ? U : T;");

goTo.marker("L4");
verify.currentLineContentIs("type C<T> = T extends Array<infer U> ? U : T;");

goTo.marker("L5");
verify.currentLineContentIs("type Foo<T> = T extends { a: infer U, b: infer U } ? U : never;");

goTo.marker("L6");
verify.currentLineContentIs("type Foo<T> = T extends { a: infer U, b: infer U } ? U : never;");

goTo.marker("L7");
verify.currentLineContentIs("type Bar<T> = T extends { a: (x: infer U) => void, b: (x: infer U) => void } ? U : never;");

goTo.marker("L8");
verify.currentLineContentIs("type Bar<T> = T extends { a: (x: infer U) => void, b: (x: infer U) => void } ? U : never;");