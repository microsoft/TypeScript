package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestImportNameCodeFixNewImportFileAllComments(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `[|/*!
 * This is a license or something
 */
/// <reference types="node" />
/// <reference path="./a.ts" />
/// <amd-dependency path="./b.ts" />
/**
 * This is a comment intended to be attached to this interface
 */
export interface SomeInterface {
}
f1/*0*/();|]
// @Filename: module.ts
export function f1() {}
export var v1 = 5;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyImportFixAtPosition(t, []string{
		`/*!
 * This is a license or something
 */
/// <reference types="node" />
/// <reference path="./a.ts" />
/// <amd-dependency path="./b.ts" />

import { f1 } from "./module";

/**
 * This is a comment intended to be attached to this interface
 */
export interface SomeInterface {
}
f1();`,
	}, nil /*preferences*/)
}
