package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestAutoImportTypeImport5(t *testing.T) {
	t.Parallel()

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
export type y = 8
export const Y = 9;
export const Z = 10;
// @Filename: /exports2.ts
export const d = 0;
export const D = 1;
export const e = 2;
export const E = 3;
// @Filename: /index0.ts
import { type X, type Y, type Z } from "./exports1";
const foo: x/*0*/;
const bar: y;
// @Filename: /index1.ts
import { A, B, type X, type Y, type Z } from "./exports1";
const foo: x/*1*/;
const bar: y;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToMarker(t, "0")
	f.VerifyImportFixAtPosition(t, []string{
		`import { type x, type X, type Y, type Z } from "./exports1";
const foo: x;
const bar: y;`,
		`import { type X, type y, type Y, type Z } from "./exports1";
const foo: x;
const bar: y;`,
	}, nil /*preferences*/)
	f.VerifyImportFixAtPosition(t, []string{
		`import { type x, type X, type Y, type Z } from "./exports1";
const foo: x;
const bar: y;`,
		`import { type X, type y, type Y, type Z } from "./exports1";
const foo: x;
const bar: y;`,
	}, nil /*preferences*/)
	f.VerifyImportFixAtPosition(t, []string{
		`import { type x, type X, type Y, type Z } from "./exports1";
const foo: x;
const bar: y;`,
		`import { type X, type y, type Y, type Z } from "./exports1";
const foo: x;
const bar: y;`,
	}, nil /*preferences*/)
	f.VerifyImportFixAtPosition(t, []string{
		`import { type x, type X, type Y, type Z } from "./exports1";
const foo: x;
const bar: y;`,
		`import { type X, type y, type Y, type Z } from "./exports1";
const foo: x;
const bar: y;`,
	}, nil /*preferences*/)
	f.VerifyImportFixAtPosition(t, []string{
		`import { type x, type X, type Y, type Z } from "./exports1";
const foo: x;
const bar: y;`,
		`import { type X, type y, type Y, type Z } from "./exports1";
const foo: x;
const bar: y;`,
	}, nil /*preferences*/)
	f.VerifyImportFixAtPosition(t, []string{
		`import { type x, type X, type Y, type Z } from "./exports1";
const foo: x;
const bar: y;`,
		`import { type X, type y, type Y, type Z } from "./exports1";
const foo: x;
const bar: y;`,
	}, nil /*preferences*/)
	f.GoToMarker(t, "1")
	f.VerifyImportFixAtPosition(t, []string{
		`import { A, B, type x, type X, type Y, type Z } from "./exports1";
const foo: x;
const bar: y;`,
		`import { A, B, type X, type y, type Y, type Z } from "./exports1";
const foo: x;
const bar: y;`,
	}, nil /*preferences*/)
	f.VerifyImportFixAtPosition(t, []string{
		`import { A, B, type x, type X, type Y, type Z } from "./exports1";
const foo: x;
const bar: y;`,
		`import { A, B, type X, type y, type Y, type Z } from "./exports1";
const foo: x;
const bar: y;`,
	}, nil /*preferences*/)
}
