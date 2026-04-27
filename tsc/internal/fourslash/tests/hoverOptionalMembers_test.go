package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestHoverOptionalMembers(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
type Foo1 = {
    x?: string;
    f?: (x: number) => void;
    g?: { (x: number): void; (x: string): void; }
    h?: ((x: number) => void) & ((x: string) => void);
    m?(x: number): void;
    m?(x: string): void;
}

interface Foo2 {
    x?: string;
    f?: (x: number) => void;
    g?: { (x: number): void; (x: string): void; }
    h?: ((x: number) => void) & ((x: string) => void);
    m?(x: number): void;
    m?(x: string): void;
}

class Foo3 {
    x?: string;
    f?: (x: number) => void;
    g?: { (x: number): void; (x: string): void; }
    h?: ((x: number) => void) & ((x: string) => void);
    m?(x: number): void;
    m?(x: string): void;
}

declare const foo1: Foo1;
declare const foo2: Foo2;
declare const foo3: Foo3;

foo1./*1*/x
foo1./*1a*/f
foo1./*1b*/f?.(42)
foo1./*1c*/g
foo1./*1d*/g?.(42)
foo1./*1e*/g?.("abc")
foo1./*1f*/h
foo1./*1g*/h?.(42)
foo1./*1h*/h?.("abc")
foo1./*1i*/m
foo1./*1j*/m?.(42)
foo1./*1k*/m?.("abc")

foo2./*2*/x
foo2./*2a*/f
foo2./*2b*/f?.(42)
foo2./*2c*/g
foo2./*2d*/g?.(42)
foo2./*2e*/g?.("abc")
foo2./*2f*/h
foo2./*2g*/h?.(42)
foo2./*2h*/h?.("abc")
foo2./*2i*/m
foo2./*2j*/m?.(42)
foo2./*2k*/m?.("abc")

foo3./*3*/x
foo3./*3a*/f
foo3./*3b*/f?.(42)
foo3./*3c*/g
foo3./*3d*/g?.(42)
foo3./*3e*/g?.("abc")
foo3./*3f*/h
foo3./*3g*/h?.(42)
foo3./*3h*/h?.("abc")
foo3./*3i*/m
foo3./*3j*/m?.(42)
foo3./*3k*/m?.("abc")
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineHover(t)
}
