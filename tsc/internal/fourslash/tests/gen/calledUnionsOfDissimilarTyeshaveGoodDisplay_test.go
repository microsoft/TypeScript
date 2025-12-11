package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCalledUnionsOfDissimilarTyeshaveGoodDisplay(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `declare const callableThing1:
    | ((o1: {x: number}) => void)
    | ((o1: {y: number}) => void)
    ;

callableThing1(/*1*/);

declare const callableThing2:
    | ((o1: {x: number}) => void)
    | ((o2: {y: number}) => void)
    ;

callableThing2(/*2*/);

declare const callableThing3:
    | ((o1: {x: number}) => void)
    | ((o2: {y: number}) => void)
    | ((o3: {z: number}) => void)
    | ((o4: {u: number}) => void)
    | ((o5: {v: number}) => void)
    ;

callableThing3(/*3*/);

declare const callableThing4:
    | ((o1: {x: number}) => void)
    | ((o2: {y: number}) => void)
    | ((o3: {z: number}) => void)
    | ((o4: {u: number}) => void)
    | ((o5: {v: number}) => void)
    | ((o6: {w: number}) => void)
    ;

callableThing4(/*4*/);

declare const callableThing5: 
    | (<U>(a1: U) => void)
    | (() => void) 
    ;

callableThing5(/*5*/1)
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "1")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "callableThing1(o1: { x: number; } & { y: number; }): void"})
	f.GoToMarker(t, "2")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "callableThing2(arg0: { x: number; } & { y: number; }): void"})
	f.GoToMarker(t, "3")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "callableThing3(arg0: { x: number; } & { y: number; } & { z: number; } & { u: number; } & { v: number; }): void"})
	f.GoToMarker(t, "4")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "callableThing4(arg0: { x: number; } & { y: number; } & { z: number; } & { u: number; } & { v: number; } & { w: number; }): void"})
	f.GoToMarker(t, "5")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "callableThing5(a1: number): void"})
}
