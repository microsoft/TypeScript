package fourslash_test

import (
	"strconv"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/diagnostics"
	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/locale"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCodeFixAddMissingAttributes11(t *testing.T) {
	t.Parallel()
	for i, test := range []struct {
		content    string
		result     string
		fileResult string
		filename   string
	}{
		{
			content: `// @jsx: preserve
// @Filename: a.tsx
interface T { a: number; b?: string }
const A = (a: T) => null;
const a = <A[||] />;`,
			result: ` a={0}`,
		},
		{
			content: `// @jsx: preserve
// @Filename: /a.ts
export enum E { a, b }
export class C {}
// @Filename: /b.tsx
import { E as B, C as D } from "./a";
const A = (a: { a: B; b: D }) => null;
const a = <A[||] />;`,
			result:   ` a={B.a} b={new D}`,
			filename: "/b.tsx",
		},
		{
			content: `// @jsx: preserve
// @Filename: a.tsx
declare namespace JSX {
    interface Element {}
    interface ElementChildrenAttribute { children: {} }
}
const A = (a: { children: string; b: number }) => null;
const a = <A[||]>text</A>;`,
			result: ` b={0}`,
		},
		{
			content: `// @jsx: preserve
// @Filename: a.tsx
declare namespace JSX {
    interface Element {}
    interface ElementChildrenAttribute { c: {} }
}
const A = (a: { c: string; b: number }) => null;
const a = <A[||]>{"text"}</A>;`,
			result: ` b={0}`,
		},
		{
			content: `// @jsx: preserve
// @Filename: a.tsx
declare namespace JSX {
    interface Element {}
    interface ElementChildrenAttribute { children: {} }
}
const A = (a: { children: string; b: number }) => null;
const a = <A[||]>{}</A>;`,
			result: ` children={""} b={0}`,
		},
		{
			content: `// @jsx: preserve
// @Filename: a.tsx
const A = (a: { a: number; b: string }) => null;
declare const b: { a?: number };
const a = <A[||] {...b} />;`,
			result: ` a={0} b={""}`,
		},
		{
			content: `// @jsx: preserve
// @Filename: a.tsx
const A = (a: { a: number; b: string }) => null;
declare const b: { a: number } | {};
const a = <A[||] {...b} />;`,
			result: ` a={0} b={""}`,
		},
		{
			content: `// @jsx: preserve
// @Filename: a.tsx
const A = (a: { a: number; b: string }) => null;
declare const b: { a?: number };
const a = <A[||] {...b} a={1} />;`,
			result: ` b={""}`,
		},
		{
			content: `// @jsx: preserve
// @Filename: a.tsx
const A = (a: { a: number }) => null;
declare const b: { a?: number };
const a = <A[||] {...b} />;`,
			result: ` a={0}`,
		},
		{
			content: `// @jsx: preserve
// @Filename: a.tsx
const A = (a: { a: number; b: string }) => null;
declare const b: { a?: number };
declare const c: { a: number };
const a = <A[||] {...c} {...b} />;`,
			result: ` b={""}`,
		},
		{
			content: `// @jsx: preserve
// @Filename: /a.ts
export enum E { a, b }
export class C {}
// @Filename: /b.tsx
import type { C as D, E as B } from "./a";
const A = (a: { a: B; b: D }) => null;
const a = <A />;`,
			fileResult: `import { C as D, E as B } from "./a";
const A = (a: { a: B; b: D }) => null;
const a = <A a={B.a} b={new D} />;`,
			filename: "/b.tsx",
		},
	} {
		t.Run(strconv.Itoa(i+1), func(t *testing.T) {
			t.Parallel()
			defer testutil.RecoverAndFail(t, "Panic on fourslash test")
			f, done := fourslash.NewFourslash(t, nil /*capabilities*/, test.content)
			defer done()
			if test.filename != "" {
				f.GoToFile(t, test.filename)
			}
			f.VerifyCodeFix(t, fourslash.VerifyCodeFixOptions{
				Description:     diagnostics.Add_missing_attributes.Localize(locale.Default),
				NewFileContent:  test.fileResult,
				NewRangeContent: test.result,
				ApplyChanges:    true,
			})
			f.VerifyNoErrors(t)
		})
	}
}
