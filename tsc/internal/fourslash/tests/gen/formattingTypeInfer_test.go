package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFormattingTypeInfer(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
/*L1*/type C<T> = T extends Array<infer U> ? U : never;

/*L2*/  type   C  <  T  >   =   T   extends   Array   <   infer     U  >  ?   U   :   never  ; 

/*L3*/type C<T> = T extends Array<infer U> ? U : T;

/*L4*/  type   C  <  T  >   =   T   extends   Array   <   infer     U  >  ?   U   :   T  ;  

/*L5*/type Foo<T> = T extends { a: infer U, b: infer U } ? U : never;

/*L6*/  type   Foo  <  T  > = T   extends   {   a  :   infer   U  ,   b  :   infer   U   }   ?   U   :   never  ;  

/*L7*/type Bar<T> = T extends { a: (x: infer U) => void, b: (x: infer U) => void } ? U : never;

/*L8*/  type   Bar  <  T  >   =   T   extends   {   a  :   (x  :  infer  U  ) =>   void  ,   b  :   (x  :   infer   U  )   =>   void   }    ?   U   :   never  ;
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.FormatDocument(t, "")
	f.GoToMarker(t, "L1")
	f.VerifyCurrentLineContent(t, `type C<T> = T extends Array<infer U> ? U : never;`)
	f.GoToMarker(t, "L2")
	f.VerifyCurrentLineContent(t, `type C<T> = T extends Array<infer U> ? U : never;`)
	f.GoToMarker(t, "L3")
	f.VerifyCurrentLineContent(t, `type C<T> = T extends Array<infer U> ? U : T;`)
	f.GoToMarker(t, "L4")
	f.VerifyCurrentLineContent(t, `type C<T> = T extends Array<infer U> ? U : T;`)
	f.GoToMarker(t, "L5")
	f.VerifyCurrentLineContent(t, `type Foo<T> = T extends { a: infer U, b: infer U } ? U : never;`)
	f.GoToMarker(t, "L6")
	f.VerifyCurrentLineContent(t, `type Foo<T> = T extends { a: infer U, b: infer U } ? U : never;`)
	f.GoToMarker(t, "L7")
	f.VerifyCurrentLineContent(t, `type Bar<T> = T extends { a: (x: infer U) => void, b: (x: infer U) => void } ? U : never;`)
	f.GoToMarker(t, "L8")
	f.VerifyCurrentLineContent(t, `type Bar<T> = T extends { a: (x: infer U) => void, b: (x: infer U) => void } ? U : never;`)
}
