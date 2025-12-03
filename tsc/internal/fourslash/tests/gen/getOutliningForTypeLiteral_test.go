package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGetOutliningForTypeLiteral(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `type A =[| {
    a: number;
}|]

type B =[| {
   a:[| {
       a1:[| {
           a2:[| {
               x: number;
               y: number;
           }|]
       }|]
   }|],
   b:[| {
       x: number;
   }|],
   c:[| {
       x: number;
   }|]
}|]`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyOutliningSpans(t)
}
