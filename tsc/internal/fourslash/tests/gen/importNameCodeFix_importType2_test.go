package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestImportNameCodeFix_importType2(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @verbatimModuleSyntax: true
// @module: es2015
// @Filename: /exports1.ts
export default interface SomeType {}
export interface OtherType {}
export interface OtherOtherType {}
export const someValue = 0;
// @Filename: /a.ts
import type SomeType from "./exports1.js";
someValue/*a*/
// @Filename: /b.ts
import { someValue } from "./exports1.js";
const b: SomeType/*b*/ = someValue;
// @Filename: /c.ts
import type SomeType from "./exports1.js";
const x: OtherType/*c*/
// @Filename: /d.ts
import type { OtherType } from "./exports1.js";
const x: OtherOtherType/*d*/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "a")
	f.VerifyImportFixAtPosition(t, []string{
		`import type SomeType from "./exports1.js";
import { someValue } from "./exports1.js";
someValue`,
	}, nil /*preferences*/)
	f.GoToMarker(t, "b")
	f.VerifyImportFixAtPosition(t, []string{
		`import type SomeType from "./exports1.js";
import { someValue } from "./exports1.js";
const b: SomeType = someValue;`,
	}, nil /*preferences*/)
	f.GoToMarker(t, "c")
	f.VerifyImportFixAtPosition(t, []string{
		`import type { OtherType } from "./exports1.js";
import type SomeType from "./exports1.js";
const x: OtherType`,
	}, nil /*preferences*/)
	f.GoToMarker(t, "d")
	f.VerifyImportFixAtPosition(t, []string{
		`import type { OtherOtherType, OtherType } from "./exports1.js";
const x: OtherOtherType`,
	}, nil /*preferences*/)
}
