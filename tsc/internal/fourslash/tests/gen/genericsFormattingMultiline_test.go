package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGenericsFormattingMultiline(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
class Foo   <   
 T1   extends unknown,
  T2   
    > {
    public method    <  
 T3,
    >   (a: T1,   b: Array    < 
     string 
     > ):   Map <
          T1 ,
      Array < T3    >  
          > { throw new Error(); } 
}

interface IFoo<
       T, 
  > {
    new < T
      > ( a: T);
    op?< 
   T,
      M
    > (a: T, b : M );
    <
     T,
      >(x: T): T;
}

type foo<
  T
   > = Foo   <
  number, Array <   number  >  > ;

function bar <
T, U extends T
 >  () {
    return class  < 
       T2,
  > {
    }
}

bar<
string, 
     "s"
     > ();

declare const func: <
T   extends number[], 
                       > (x: T) => new <
       U
                          > () => U;

class A < T > extends bar <  
        T,number
 >( )  <  T
     > {
}

function s<T, U>(x: TemplateStringsArray, ...args: any[]) { return x.join(); }

const t = s<
      number , 
  string[] & ArrayLike<any>
      >` + "`" + `abc${1}def` + "`" + ` ;
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.FormatDocument(t, "")
	f.VerifyCurrentFileContent(t, "\nclass Foo<\n    T1 extends unknown,\n    T2\n> {\n    public method<\n        T3,\n    >(a: T1, b: Array<\n        string\n    >): Map<\n        T1,\n        Array<T3>\n    > { throw new Error(); }\n}\n\ninterface IFoo<\n    T,\n> {\n    new <T\n    >(a: T);\n    op?<\n        T,\n        M\n    >(a: T, b: M);\n    <\n        T,\n    >(x: T): T;\n}\n\ntype foo<\n    T\n> = Foo<\n    number, Array<number>>;\n\nfunction bar<\n    T, U extends T\n>() {\n    return class <\n        T2,\n    > {\n    }\n}\n\nbar<\n    string,\n    \"s\"\n>();\n\ndeclare const func: <\n    T extends number[],\n> (x: T) => new <\n    U\n> () => U;\n\nclass A<T> extends bar<\n    T, number\n>()<T\n> {\n}\n\nfunction s<T, U>(x: TemplateStringsArray, ...args: any[]) { return x.join(); }\n\nconst t = s<\n    number,\n    string[] & ArrayLike<any>\n>`abc${1}def`;\n")
}
