package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestOrganizeImports18(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @filename: /A.ts
export interface A {}
export function bFuncA(a: A) {}
// @filename: /B.ts
export interface B {}
export function bFuncB(b: B) {}
// @filename: /C.ts
export interface C {}
export function bFuncC(c: C) {}
// @filename: /test.ts
export { C } from "./C";
export { B } from "./B";
export { A } from "./A";

export { bFuncC } from "./C";
export { bFuncB } from "./B";
export { bFuncA } from "./A";`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToFile(t, "/test.ts")
	f.VerifyOrganizeImports(t,
		`export { A } from "./A";
export { B } from "./B";
export { C } from "./C";

export { bFuncA } from "./A";
export { bFuncB } from "./B";
export { bFuncC } from "./C";
`,
		lsproto.CodeActionKindSourceOrganizeImports,
		nil,
	)
}
