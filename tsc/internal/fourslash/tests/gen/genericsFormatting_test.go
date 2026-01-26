package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGenericsFormatting(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `/*inClassDeclaration*/class Foo   <    T1   ,  T2    >  {
/*inMethodDeclaration*/    public method    <   T3,    T4   >   ( a: T1,   b: Array    < T4 > ):   Map < T1  ,   T2, Array < T3    >    > {
    }
}
/*typeArguments*/var foo = new Foo   <  number, Array <   number  >   >  (  );
/*typeArgumentsWithTypeLiterals*/foo = new Foo  <  {   bar  :  number }, Array   < {   baz :  string   }  >  >  (  );

interface IFoo {
/*inNewSignature*/new < T  > ( a: T);
/*inOptionalMethodSignature*/op?< T , M > (a: T, b : M );
}

foo()<number, string, T >();
(a + b)<number, string, T >();

/*inFunctionDeclaration*/function bar <T> () {
/*inClassExpression*/    return class  <  T2 > {
    }
}
/*expressionWithTypeArguments*/class A < T > extends bar <  T >( )  <  T > {
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.FormatDocument(t, "")
	f.GoToMarker(t, "inClassDeclaration")
	f.VerifyCurrentLineContent(t, `class Foo<T1, T2> {`)
	f.GoToMarker(t, "inMethodDeclaration")
	f.VerifyCurrentLineContent(t, `    public method<T3, T4>(a: T1, b: Array<T4>): Map<T1, T2, Array<T3>> {`)
	f.GoToMarker(t, "typeArguments")
	f.VerifyCurrentLineContent(t, `var foo = new Foo<number, Array<number>>();`)
	f.GoToMarker(t, "typeArgumentsWithTypeLiterals")
	f.VerifyCurrentLineContent(t, `foo = new Foo<{ bar: number }, Array<{ baz: string }>>();`)
	f.GoToMarker(t, "inNewSignature")
	f.VerifyCurrentLineContent(t, `    new <T>(a: T);`)
	f.GoToMarker(t, "inOptionalMethodSignature")
	f.VerifyCurrentLineContent(t, `    op?<T, M>(a: T, b: M);`)
	f.GoToMarker(t, "inFunctionDeclaration")
	f.VerifyCurrentLineContent(t, `function bar<T>() {`)
	f.GoToMarker(t, "inClassExpression")
	f.VerifyCurrentLineContent(t, `    return class <T2> {`)
	f.GoToMarker(t, "expressionWithTypeArguments")
	f.VerifyCurrentLineContent(t, `class A<T> extends bar<T>()<T> {`)
}
