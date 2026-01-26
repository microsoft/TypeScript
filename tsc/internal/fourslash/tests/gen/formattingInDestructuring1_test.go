package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFormattingInDestructuring1(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface let { }
/*1*/var x: let         [];

function foo() {
    'use strict'
/*2*/    let        [x] = [];
/*3*/    const      [x] = [];
/*4*/    for (let[x] = [];x < 1;) {
    }
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.FormatDocument(t, "")
	f.GoToMarker(t, "1")
	f.VerifyCurrentLineContent(t, `var x: let[];`)
	f.GoToMarker(t, "2")
	f.VerifyCurrentLineContent(t, `    let [x] = [];`)
	f.GoToMarker(t, "3")
	f.VerifyCurrentLineContent(t, `    const [x] = [];`)
	f.GoToMarker(t, "4")
	f.VerifyCurrentLineContent(t, `    for (let [x] = []; x < 1;) {`)
}
