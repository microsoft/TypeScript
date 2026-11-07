package fourslash_test

import (
	"strconv"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/diagnostics"
	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/locale"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCodeFixAddMissingAttributes12(t *testing.T) {
	t.Parallel()
	const content = `// @jsx: preserve
// @Filename: a.tsx
interface T { a: number }
const A = (a: T) => null;
const a: T = {};
const b: T = {};
const c = <A />;
const d = <A />;`
	for i, test := range []struct {
		fixID       string
		description string
		result      string
		errors      int
	}{
		{
			fixID:       "fixMissingProperties",
			description: diagnostics.Add_all_missing_properties.Localize(locale.Default),
			result: `interface T { a: number }
const A = (a: T) => null;
const a: T = {
    a: 0
};
const b: T = {
    a: 0
};
const c = <A />;
const d = <A />;`,
			errors: 2,
		},
		{
			fixID:       "fixMissingAttributes",
			description: diagnostics.Add_all_missing_attributes.Localize(locale.Default),
			result: `interface T { a: number }
const A = (a: T) => null;
const a: T = {};
const b: T = {};
const c = <A a={0} />;
const d = <A a={0} />;`,
			errors: 2,
		},
		{
			result: `interface T { a: number }
const A = (a: T) => null;
const a: T = {
    a: 0
};
const b: T = {
    a: 0
};
const c = <A a={0} />;
const d = <A a={0} />;`,
		},
	} {
		t.Run(strconv.Itoa(i+1), func(t *testing.T) {
			t.Parallel()
			defer testutil.RecoverAndFail(t, "Panic on fourslash test")
			f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
			defer done()
			f.VerifyNumberOfErrorsInCurrentFile(t, 4)
			if test.fixID == "" {
				f.VerifySourceFixAll(t, test.result)
			} else {
				f.VerifyCodeFixAll(t, fourslash.VerifyCodeFixAllOptions{
					FixID:          test.fixID,
					Description:    test.description,
					NewFileContent: test.result,
				})
			}
			f.VerifyNumberOfErrorsInCurrentFile(t, test.errors)
		})
	}
	for i, test := range []struct {
		content  string
		result   string
		filename string
	}{
		{
			content: `// @jsx: preserve
// @Filename: /a.ts
export class C {}
export enum E { a, b }
// @Filename: /b.tsx
import type { C, E } from "./a";
const A = (a: { a: E }) => null;
const a: { a: C } = {};
const b = <A />;`,
			result: `import { C, E } from "./a";
const A = (a: { a: E }) => null;
const a: { a: C } = {
    a: new C
};
const b = <A a={E.a} />;`,
			filename: "/b.tsx",
		},
		{
			content: `// @jsx: preserve
// @Filename: a.tsx
const A = (a: { a: { a: number }, b: number }) => null;
const a = <A a={((): { a: number } => ({}))()} />;`,
			result: `const A = (a: { a: { a: number }, b: number }) => null;
const a = <A a={((): { a: number } => ({
    a: 0
}))()} b={0} />;`,
			filename: "a.tsx",
		},
		{
			content: `// @jsx: preserve
// @verbatimModuleSyntax: true
// @Filename: /a.ts
export class C {}
export enum E { a, b }
export interface T { a: number }
// @Filename: /b.tsx
import type { C, E, T } from "./a";
const A = (a: { a: E }) => null;
const a: { a: C } = {};
const b = <A />;
const c = E.b;
const d: T = { a: 0 };`,
			result: `import { C, E, type T } from "./a";
const A = (a: { a: E }) => null;
const a: { a: C } = {
    a: new C
};
const b = <A a={E.a} />;
const c = E.b;
const d: T = { a: 0 };`,
			filename: "/b.tsx",
		},
		{
			content: `// @jsx: preserve
// @lib: es2015
// @Filename: /a.ts
export const a = Symbol();
export class C {}
export enum E { a, b }
export type T = { [a]: C };
export type U = { a: E };
// @Filename: /b.tsx
import type { T, U } from "./a";
const A = (a: U) => null;
const b: T = {};
const c = <A />;`,
			result: `import { a, C, E, type T, type U } from "./a";
const A = (a: U) => null;
const b: T = {
    [a]: new C
};
const c = <A a={E.a} />;`,
			filename: "/b.tsx",
		},
		{
			content: `// @jsx: preserve
// @Filename: a.tsx
const A = (a: { a: number, b: number }) => null;
const a = <A {...((): { a: number } => ({}))()} />;`,
			result: `const A = (a: { a: number, b: number }) => null;
const a = <A b={0} {...((): { a: number } => ({
    a: 0
}))()} />;`,
		},
		{
			content: `// @jsx: preserve
// @strictPropertyInitialization: false
// @Filename: /a.ts
export enum E { a, b }
export interface T { a: E }
// @Filename: /b.tsx
import type { T } from "./a";
class C implements T {}
const A = (a: T) => null;
const a = <A />;`,
			result: `import { E, type T } from "./a";
class C implements T {
    a: E;
}
const A = (a: T) => null;
const a = <A a={E.a} />;`,
			filename: "/b.tsx",
		},
		{
			content: `// @jsx: preserve
// @declaration: true
// @isolatedDeclarations: true
// @Filename: /a.ts
export enum E { a, b }
// @Filename: /b.tsx
import type { E } from "./a";
const A = (a: { a: E }) => null;
export function a() { return Math.abs(0); }
const b: { a: E } = {};
const c = <A />;`,
			result: `import { E } from "./a";
const A = (a: { a: E }) => null;
export function a(): number { return Math.abs(0); }
const b: { a: E } = {
    a: E.a
};
const c = <A a={E.a} />;`,
			filename: "/b.tsx",
		},
		{
			content: `// @jsx: preserve
// @declaration: true
// @isolatedDeclarations: true
// @verbatimModuleSyntax: true
// @Filename: /a.ts
export class C {}
export interface T { a: C }
export interface U { a: number }
// @Filename: /b.tsx
import type { T } from "./a";
declare function a(): import("./a").U;
const A = (a: T) => null;
export function b() { return a(); }
const c: T = {};
const d = <A />;`,
			result: `import { C, type T, type U } from "./a";
declare function a(): import("./a").U;
const A = (a: T) => null;
export function b(): U { return a(); }
const c: T = {
    a: new C
};
const d = <A a={new C} />;`,
			filename: "/b.tsx",
		},
	} {
		t.Run(strconv.Itoa(i+4), func(t *testing.T) {
			t.Parallel()
			defer testutil.RecoverAndFail(t, "Panic on fourslash test")
			f, done := fourslash.NewFourslash(t, nil /*capabilities*/, test.content)
			defer done()
			if test.filename != "" {
				f.GoToFile(t, test.filename)
			}
			f.VerifySourceFixAll(t, test.result)
			f.VerifyNoErrors(t)
		})
	}
}
