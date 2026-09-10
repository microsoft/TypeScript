package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestQuickInfoAmbientModule(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `declare module "*.css"/*1*/;`

	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyQuickInfoAt(t, "1", `module "*.css"`, "")
}

func TestQuickInfoPatternAmbientModuleWithImportAttributes(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `declare module "*.css"/*1*/ with { type: "css" } {
    const styles: { readonly [className: string]: string };
    export default styles;
}`

	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineHoverWithVerbosity(t, map[string][]int{"1": {0, 1}})
}

func TestQuickInfoMergedPatternAmbientModuleWithImportAttributes(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /first.d.ts
declare module "*.asset"/*css*/ with { type: "css" } {
    export const cssOnly: "css";
}
declare module "*.asset"/*text*/ with { type: "text" } {
    export const textOnly: "text";
}

// @Filename: /second.d.ts
declare module "*.asset" with { type: "css" } {
    export const cssAlso: "css-also";
}
declare module "*.asset" with { type: "text" } {
    export const textAlso: "text-also";
}`

	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineHoverWithVerbosity(t, map[string][]int{"css": {0, 1}, "text": {0, 1}})
}
