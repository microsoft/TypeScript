package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestAutoImportSortCaseSensitivity1(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /exports1.ts
export const a = 0;
export const A = 1;
export const b = 2;
export const B = 3;
export const c = 4;
export const C = 5;
// @Filename: /exports2.ts
export const d = 0;
export const D = 1;
export const e = 2;
export const E = 3;
// @Filename: /index0.ts
import { A, B, C } from "./exports1";
a/*0*/
// @Filename: /index1.ts
import { A, a, B, b } from "./exports1";
import { E } from "./exports2";
d/*1*/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "0")
	f.VerifyImportFixAtPosition(t, []string{
		`import { a, A, B, C } from "./exports1";
a`,
	}, nil /*preferences*/)
	f.VerifyImportFixAtPosition(t, []string{
		`import { a, A, B, C } from "./exports1";
a`,
	}, nil /*preferences*/)
	f.GoToMarker(t, "1")
	f.VerifyImportFixAtPosition(t, []string{
		`import { A, a, B, b } from "./exports1";
import { d, E } from "./exports2";
d`,
	}, nil /*preferences*/)
	f.VerifyImportFixAtPosition(t, []string{
		`import { A, a, B, b } from "./exports1";
import { E, d } from "./exports2";
d`,
	}, nil /*preferences*/)
}
