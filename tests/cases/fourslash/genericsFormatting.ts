/// <reference path='fourslash.ts' />

/////*inClassDeclaration*/class Foo   <    T1   ,  T2    >  {
/////*inMethodDeclaration*/    public method    <   T3,    T4   >   ( a: T1,   b: Array    < T4 > ):   Map < T1  ,   T2, Array < T3    >    > {
////    }
////}
/////*typeArguments*/var foo = new Foo   <  number, Array <   number  >   >  (  );
////
////interface IFoo {
/////*inNewSignature*/new < T  > ( a: T);
/////*inOptionalMethodSignature*/op?< T , M > (a: T, b : M );
////}
////
////foo()<number, string, T >();
////(a + b)<number, string, T >();


format.document();

goTo.marker("inClassDeclaration");
verify.currentLineContentIs("class Foo<T1, T2>  {");

goTo.marker("inMethodDeclaration");
verify.currentLineContentIs("    public method<T3, T4>(a: T1, b: Array<T4>): Map<T1, T2, Array<T3>> {");

goTo.marker("typeArguments");
verify.currentLineContentIs("var foo = new Foo<number, Array<number>>();");

goTo.marker("inNewSignature");
verify.currentLineContentIs("    new <T>(a: T);");

goTo.marker("inOptionalMethodSignature");
verify.currentLineContentIs("    op?<T, M>(a: T, b: M);");