package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

// A self-re-exported namespace can merge with a generic type of the same name.
// Hover should preserve the type's instantiated arguments when building the
// merged qualifier rather than resolving only its namespace alias.
func TestHoverSelfReExportedNamespaceGenericNoCrash(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @filename: mod.ts
export interface Box<A> { content: Content<A> }
export type Content<A> = A
export * as Box from "./mod"
// @filename: main.ts
import { Box } from "./mod"
declare const b: Box<string>
const x = b./*1*/content
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineHover(t)
}

func TestHoverSelfReExportedNamespaceGenericClassNoCrash(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @filename: mod.ts
export class Box<A> { content!: A }
export * as Box from "./mod"
// @filename: main.ts
import { Box } from "./mod"
declare const b: Box<string>
const x = b./*1*/content
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineHover(t)
}

func TestHoverNamespaceExportGenericNonColliding(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @filename: mod.ts
export interface Box<A> { content: A }
export * as BoxNS from "./mod"
// @filename: main.ts
import { Box } from "./mod"
declare const b: Box<string>
const x = b./*1*/content
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineHover(t)
}
