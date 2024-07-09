/// <reference path='fourslash.ts' />

/////*inClassDeclaration*/class Foo   <    T1   ,  T2    >  {
/////*inMethodDeclaration*/    public method    <   T3,    T4   >   ( a: T1,   b: Array    < T4 > ):   Map < T1  ,   T2, Array < T3    >    > {
////    }
////}
/////*typeArguments*/var foo = new Foo   <  number, Array <   number  >   >  (  );
/////*typeArgumentsWithTypeLiterals*/foo = new Foo  <  {   bar  :  number }, Array   < {   baz :  string   }  >  >  (  );
////
////interface IFoo {
/////*inNewSignature*/new < T  > ( a: T);
/////*inOptionalMethodSignature*/op?< T , M > (a: T, b : M );
////}
////
////foo()<number, string, T >();
////(a + b)<number, string, T >();
////
/////*inFunctionDeclaration*/function bar <T> () {
/////*inClassExpression*/    return class  <  T2 > {
////    }
////}
/////*expressionWithTypeArguments*/class A < T > extends bar <  T >( )  <  T > {
////}


format.document();

goTo.marker("inClassDeclaration");
verify.currentLineContentIs("class Foo<T1, T2> {");

goTo.marker("inMethodDeclaration");
verify.currentLineContentIs("    public method<T3, T4>(a: T1, b: Array<T4>): Map<T1, T2, Array<T3>> {");

goTo.marker("typeArguments");
verify.currentLineContentIs("var foo = new Foo<number, Array<number>>();");
goTo.marker("typeArgumentsWithTypeLiterals");
verify.currentLineContentIs("foo = new Foo<{ bar: number }, Array<{ baz: string }>>();");

goTo.marker("inNewSignature");
verify.currentLineContentIs("    new <T>(a: T);");

goTo.marker("inOptionalMethodSignature");
verify.currentLineContentIs("    op?<T, M>(a: T, b: M);");

goTo.marker("inFunctionDeclaration");
verify.currentLineContentIs("function bar<T>() {");

goTo.marker("inClassExpression");
verify.currentLineContentIs("    return class <T2> {");

goTo.marker("expressionWithTypeArguments");
verify.currentLineContentIs("class A<T> extends bar<T>()<T> {");