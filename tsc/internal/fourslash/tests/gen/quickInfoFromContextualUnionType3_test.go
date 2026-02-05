package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoFromContextualUnionType3(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @strict: true
declare const foo1: <D extends Foo1<D>>(definition: D) => D;

type Foo1<D, Bar = Prop<D, "bar">> = {
  bar: {
    [K in keyof Bar]: Bar[K] extends boolean
      ? Bar[K]
      : "Error: bar should be boolean";
  };
};

declare const foo2: <D extends Foo2<D>>(definition: D) => D;

type Foo2<D, Bar = Prop<D, "bar">> = {
  bar?: {
    [K in keyof Bar]: Bar[K] extends boolean
      ? Bar[K]
      : "Error: bar should be boolean";
  };
};

type Prop<T, K> = K extends keyof T ? T[K] : never;

foo1({ bar: { /*1*/X: "test" } });

foo2({ bar: { /*2*/X: "test" } });`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyQuickInfoAt(t, "1", "(property) X: \"Error: bar should be boolean\"", "")
	f.VerifyQuickInfoAt(t, "2", "(property) X: \"Error: bar should be boolean\"", "")
}
