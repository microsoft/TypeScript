package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionsImportFromJSXTag(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @jsx: react
// @Filename: /types.d.ts
declare namespace JSX {
  interface IntrinsicElements { a }
}
// @Filename: /Box.tsx
export function Box(props: any) { return null; }
// @Filename: /App.tsx
export function App() {
  return (
    <div className="App">
      <Box/**/
    </div>
  )
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyApplyCodeActionFromCompletion(t, PtrTo(""), &fourslash.ApplyCodeActionFromCompletionOptions{
		Name:        "Box",
		Source:      "./Box",
		Description: "Add import from \"./Box\"",
		NewFileContent: PtrTo(`import { Box } from "./Box";

export function App() {
  return (
    <div className="App">
      <Box
    </div>
  )
}`),
	})
}
