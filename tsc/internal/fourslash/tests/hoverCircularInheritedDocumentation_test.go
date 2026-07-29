package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

// Regression test for a stack overflow in getJSDocOrTag (issue #4380).
//
// This is a minimized reproduction of nuxt's schema types, which crashed the language
// server on hover / completionItem/resolve. A "bridge" module re-exports a base module
// (`export * from "./base"`) and, via an aliased import, augments the re-exported
// interface to extend itself: `interface Options extends _Options { hooks: {} }` where
// `_Options` is the same (re-exported) `Options`. The alias + module boundary evades the
// checker's heritage-cycle detection, so `Options` legally has itself as a base type.
//
// When resolving inherited JSDoc for `hooks`, getJSDocOrTag walks base-type members: the
// base (`Options` itself) exposes the same `hooks` declaration node, so the walk recursed
// on that one node until the goroutine stack overflowed (a fatal runtime error that could
// not be recovered). Hovering must terminate and produce quick info without overflowing.
func TestHoverCircularInheritedDocumentation(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")

	const content = `// @filename: base.ts
export interface Options {}
// @filename: bridge.ts
import type { Options as _Options } from "./base";
export * from "./base";
declare module "./bridge" {
    interface Options extends _Options { hooks: {} }
}
declare const v: Options;
v.hooks/*1*/;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()

	f.VerifyQuickInfoAt(t, "1", "(property) Options.hooks: {}", "")
}
