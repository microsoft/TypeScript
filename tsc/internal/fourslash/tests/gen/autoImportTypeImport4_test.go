package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestAutoImportTypeImport4(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @verbatimModuleSyntax: true
// @target: esnext
// @Filename: /exports1.ts
export const a = 0;
export const A = 1;
export const b = 2;
export const B = 3;
export const c = 4;
export const C = 5;
export type x = 6;
export const X = 7;
export const Y = 8;
export const Z = 9;
// @Filename: /exports2.ts
export const d = 0;
export const D = 1;
export const e = 2;
export const E = 3;
// @Filename: /index0.ts
import { A, B, C } from "./exports1";
a/*0*//*0a*/;
b;
// @Filename: /index1.ts
import { A, B, C, type Y, type Z } from "./exports1";
a/*1*//*1a*//*1b*//*1c*/;
b;
// @Filename: /index2.ts
import { A, a, B, b, type Y, type Z } from "./exports1";
import { E } from "./exports2";
d/*2*//*2a*//*2b*//*2c*/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "0")
	f.VerifyImportFixAtPosition(t, []string{
		`import { a, A, B, C } from "./exports1";
a;
b;`,
		`import { A, b, B, C } from "./exports1";
a;
b;`,
	}, nil /*preferences*/)
	f.GoToMarker(t, "0a")
	f.VerifyImportFixAtPosition(t, []string{
		`import { a, A, B, C } from "./exports1";
a;
b;`,
		`import { A, b, B, C } from "./exports1";
a;
b;`,
	}, nil /*preferences*/)
	f.GoToMarker(t, "1")
	f.VerifyImportFixAtPosition(t, []string{
		`import { a, A, B, C, type Y, type Z } from "./exports1";
a;
b;`,
		`import { A, b, B, C, type Y, type Z } from "./exports1";
a;
b;`,
	}, nil /*preferences*/)
	f.GoToMarker(t, "1a")
	f.VerifyImportFixAtPosition(t, []string{
		`import { a, A, B, C, type Y, type Z } from "./exports1";
a;
b;`,
		`import { A, b, B, C, type Y, type Z } from "./exports1";
a;
b;`,
	}, nil /*preferences*/)
	f.GoToMarker(t, "1b")
	f.VerifyImportFixAtPosition(t, []string{
		`import { a, A, B, C, type Y, type Z } from "./exports1";
a;
b;`,
		`import { A, b, B, C, type Y, type Z } from "./exports1";
a;
b;`,
	}, nil /*preferences*/)
	f.GoToMarker(t, "1c")
	f.VerifyImportFixAtPosition(t, []string{
		`import { a, A, B, C, type Y, type Z } from "./exports1";
a;
b;`,
		`import { A, b, B, C, type Y, type Z } from "./exports1";
a;
b;`,
	}, nil /*preferences*/)
	f.GoToMarker(t, "2")
	f.VerifyImportFixAtPosition(t, []string{
		`import { A, a, B, b, type Y, type Z } from "./exports1";
import { d, E } from "./exports2";
d`,
	}, nil /*preferences*/)
	f.GoToMarker(t, "2a")
	f.VerifyImportFixAtPosition(t, []string{
		`import { A, a, B, b, type Y, type Z } from "./exports1";
import { E, d } from "./exports2";
d`,
	}, nil /*preferences*/)
	f.GoToMarker(t, "2b")
	f.VerifyImportFixAtPosition(t, []string{
		`import { A, a, B, b, type Y, type Z } from "./exports1";
import { d, E } from "./exports2";
d`,
	}, nil /*preferences*/)
	f.GoToMarker(t, "2c")
	f.VerifyImportFixAtPosition(t, []string{
		`import { A, a, B, b, type Y, type Z } from "./exports1";
import { E, d } from "./exports2";
d`,
	}, nil /*preferences*/)
}
