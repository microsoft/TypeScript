package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionsImportModuleAugmentationWithJS(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowJs: true
// @checkJs: true
// @noEmit: true
// @Filename: /test.js
class Abcde {
    x
}

module.exports = {
    Abcde
};
// @Filename: /index.ts
export {};
declare module "./test" {
    interface Abcde { b: string }
}

Abcde/**/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyApplyCodeActionFromCompletion(t, new(""), &fourslash.ApplyCodeActionFromCompletionOptions{
		Name:        "Abcde",
		Source:      "./test",
		Description: "Add import from \"./test\"",
		NewFileContent: new(`import { Abcde } from "./test";

export {};
declare module "./test" {
    interface Abcde { b: string }
}

Abcde`),
	})
}
