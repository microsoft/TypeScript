package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestAutoImportTypeImport3(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @verbatimModuleSyntax: true
// @target: esnext
// @Filename: /foo.ts
export const A = 1;
export type B = { x: number };
export type C = 1;
export class D = { y: string };
// @Filename: /test.ts
import { A, type B, type C } from './foo';
const b: B | C;
console.log(A, D/**/);`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToMarker(t, "")
	f.VerifyImportFixAtPosition(t, []string{
		`import { A, D, type B, type C } from './foo';
const b: B | C;
console.log(A, D);`,
	}, nil /*preferences*/)
	f.VerifyImportFixAtPosition(t, []string{
		`import { A, type B, type C, D } from './foo';
const b: B | C;
console.log(A, D);`,
	}, nil /*preferences*/)
	f.VerifyImportFixAtPosition(t, []string{
		`import { A, type B, type C, D } from './foo';
const b: B | C;
console.log(A, D);`,
	}, nil /*preferences*/)
}
