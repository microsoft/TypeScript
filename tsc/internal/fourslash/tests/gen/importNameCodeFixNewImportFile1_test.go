package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestImportNameCodeFixNewImportFile1(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `[|/// <reference path="./tripleSlashReference.ts" />
f1/*0*/();|]
// @Filename: Module.ts
export function f1() {}
export var v1 = 5;
// @Filename: tripleSlashReference.ts
var x = 5;/*dummy*/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyImportFixAtPosition(t, []string{
		`/// <reference path="./tripleSlashReference.ts" />

import { f1 } from "./Module";

f1();`,
	}, nil /*preferences*/)
}
