package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCallHierarchyCrossFile(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @filename: /a.ts
export function /**/createModelReference() {}
// @filename: /b.ts
import { createModelReference } from "./a";
function openElementsAtEditor() {
  createModelReference();
}
// @filename: /c.ts
import { createModelReference } from "./a";
function registerDefaultLanguageCommand() {
  createModelReference();
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "")
	f.VerifyBaselineCallHierarchy(t)
}
