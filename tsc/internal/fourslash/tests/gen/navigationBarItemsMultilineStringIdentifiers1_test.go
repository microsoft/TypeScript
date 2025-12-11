package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestNavigationBarItemsMultilineStringIdentifiers1(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `declare module "Multiline\r\nMadness" {
}

declare module "Multiline\
Madness" {
}
declare module "MultilineMadness" {}

declare module "Multiline\
Madness2" {
}

interface Foo {
    "a1\\\r\nb";
    "a2\
    \
    b"(): Foo;
}

class Bar implements Foo {
    'a1\\\r\nb': Foo;

    'a2\
    \
    b'(): Foo {
        return this;
    }
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineDocumentSymbol(t)
}
