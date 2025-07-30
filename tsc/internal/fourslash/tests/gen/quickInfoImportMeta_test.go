package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoImportMeta(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: esnext
// @Filename: foo.ts
/// <reference no-default-lib="true"/>
/// <reference path='./bar.d.ts' />
im/*1*/port.me/*2*/ta;
//@Filename: bar.d.ts
/**
 * The type of ` + "`" + `import.meta` + "`" + `.
 *
 * If you need to declare that a given property exists on ` + "`" + `import.meta` + "`" + `,
 * this type may be augmented via interface merging.
 */
 interface ImportMeta {
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineHover(t)
}
