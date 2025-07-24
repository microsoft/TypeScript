package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToDefinitionTypeOnlyImport(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /a.ts
enum /*1*/SyntaxKind { SourceFile }
export type { SyntaxKind }
// @Filename: /b.ts
 export type { SyntaxKind } from './a';
// @Filename: /c.ts
import type { SyntaxKind } from './b';
let kind: [|/*2*/SyntaxKind|];`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineGoToDefinition(t, "2")
}
