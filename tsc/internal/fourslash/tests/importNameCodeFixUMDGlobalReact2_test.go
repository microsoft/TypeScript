package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestImportNameCodeFixUMDGlobalReact2(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @jsx: react
// @jsxFactory: factory
// @Filename: /factory.ts
export function factory() { return {}; }
declare global {
    namespace JSX {
        interface Element {}
    }
}
// @Filename: /a.tsx
[|<div/>|]`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToFile(t, "/a.tsx")
	f.VerifyImportFixAtPosition(t, []string{
		`import { factory } from "./factory";

<div/>`,
	}, nil /*preferences*/)
}
