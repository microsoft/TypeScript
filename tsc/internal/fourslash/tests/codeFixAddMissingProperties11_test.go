package fourslash_test

import (
	"strconv"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/diagnostics"
	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/locale"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/contentmappertest"
)

func TestCodeFixAddMissingProperties11(t *testing.T) {
	t.Parallel()
	t.Run("1", func(t *testing.T) {
		t.Parallel()
		defer testutil.RecoverAndFail(t, "Panic on fourslash test")
		const content = `interface Test {
    foo: string;
    bar(a: string): void;
}
function f (_spec: any) {}
function g (_spec: Test) {}
f(() => {
    g({});
    g(
    {});
    g(
      {}
    );
});`
		f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
		defer done()
		f.VerifyCodeFixAll(t, fourslash.VerifyCodeFixAllOptions{
			FixID:       "fixMissingProperties",
			Description: diagnostics.Add_all_missing_properties.Localize(locale.Default),
			NewFileContent: `interface Test {
    foo: string;
    bar(a: string): void;
}
function f (_spec: any) {}
function g (_spec: Test) {}
f(() => {
    g({
        foo: "",
        bar: function(a: string): void {
            throw new Error("Function not implemented.");
        }
    });
    g(
    {
        foo: "",
        bar: function(a: string): void {
            throw new Error("Function not implemented.");
        }
    });
    g(
      {
          foo: "",
          bar: function(a: string): void {
              throw new Error("Function not implemented.");
          }
      }
    );
});`,
		})
		f.VerifyNoErrors(t)
	})
	t.Run("2", func(t *testing.T) {
		t.Parallel()
		defer testutil.RecoverAndFail(t, "Panic on fourslash test")
		const content = `// @lib: es2015
// @Filename: /a.ts
export const a = Symbol();
export enum E { a, b }
export class C {}
export type T = { [a]: E; b: C };
// @Filename: /b.ts
import type { C as B, E, T } from "./a";
const b: { b: B; c: E; d?: T } = {};
const c: T = {};`
		f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
		defer done()
		f.GoToFile(t, "/b.ts")
		f.VerifyCodeFixAll(t, fourslash.VerifyCodeFixAllOptions{
			FixID:       "fixMissingProperties",
			Description: diagnostics.Add_all_missing_properties.Localize(locale.Default),
			NewFileContent: `import { a, C as B, E, type T } from "./a";
const b: { b: B; c: E; d?: T } = {
    b: new B,
    c: E.a
};
const c: T = {
    [a]: E.a,
    b: new B
};`,
		})
		f.VerifyNoErrors(t)
	})
	t.Run("3", func(t *testing.T) {
		t.Parallel()
		defer testutil.RecoverAndFail(t, "Panic on fourslash test")
		const content = `type T = { a: () => { b: number }; c: number };
const a: T = { a: (): { b: number } => ({}) };`
		f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
		defer done()
		f.VerifyCodeFixAll(t, fourslash.VerifyCodeFixAllOptions{
			FixID:       "fixMissingProperties",
			Description: diagnostics.Add_all_missing_properties.Localize(locale.Default),
			NewFileContent: `type T = { a: () => { b: number }; c: number };
const a: T = { a: (): { b: number } => ({
    b: 0
}), c: 0 };`,
		})
		f.VerifyNoErrors(t)
	})
	t.Run("4", func(t *testing.T) {
		t.Parallel()
		// Canonical output is export {}; the supplemental script maps the whole input verbatim.
		defer testutil.RecoverAndFail(t, "Panic on fourslash test")
		f, done := newContentMapperFourslash(t, `// @Filename: /a.ts
export interface T { a: number }
// @Filename: /b.astro
import type { T } from "./a";
const a: T = {};
const b: T = {};
`, contentmappertest.SupplementalMapper, ".astro")
		defer done()
		f.GoToFile(t, "/b.astro")
		f.VerifyCodeFixAll(t, fourslash.VerifyCodeFixAllOptions{
			FixID:       "fixMissingProperties",
			Description: diagnostics.Add_all_missing_properties.Localize(locale.Default),
			NewFileContent: `import type { T } from "./a";
const a: T = {
    a: 0
};
const b: T = {
    a: 0
};
`,
		})
		f.VerifyNoErrors(t)
	})
	t.Run("5", func(t *testing.T) {
		t.Parallel()
		// Virtual output starts with const __VERSION = "1.0.0"; and replaces #{target} with "es2020".
		// The replacement is an atom span; the surrounding source, including the import, maps verbatim.
		defer testutil.RecoverAndFail(t, "Panic on fourslash test")
		f, done := newContentMapperFourslash(t, `// @Filename: /a.ts
export class C {}
export enum E { a, b }
// @Filename: /b.box
import type { C } from "./a";
const a: { b: unknown; c: C } = { b: #{target} };
const b = E.a;
`, contentmappertest.TransformingMapper, ".box")
		defer done()
		f.GoToFile(t, "/b.box")
		f.VerifyNumberOfErrorsInCurrentFile(t, 2)
		f.VerifySourceFixAll(t, `import { C, E } from "./a";
const a: { b: unknown; c: C } = { b: #{target}, c: new C };
const b = E.a;
`)
		f.VerifyNoErrors(t)
	})
	t.Run("6", func(t *testing.T) {
		t.Parallel()
		defer testutil.RecoverAndFail(t, "Panic on fourslash test")
		const content = `type T = { a: () => U; b: number };
type U = { a: () => V; b: number };
type V = { a: number };
const a: T = { a: (): U => ({ a: (): V => ({}) }) };
const b: V = {};`
		f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
		defer done()
		f.VerifySourceFixAll(t, `type T = { a: () => U; b: number };
type U = { a: () => V; b: number };
type V = { a: number };
const a: T = { a: (): U => ({ a: (): V => ({
    a: 0
}), b: 0 }), b: 0 };
const b: V = {
    a: 0
};`)
		f.VerifyNoErrors(t)
	})
	t.Run("7", func(t *testing.T) {
		t.Parallel()
		// Supplemental output maps the entire input verbatim, optionally after a generated prefix.
		// DuplicateProjectionMapper emits that same mapping in both canonical and supplemental scripts.
		for i, mapper := range []string{contentmappertest.SupplementalMapper, contentmappertest.PrefixedSupplementalMapper, contentmappertest.DuplicateProjectionMapper, contentmappertest.SupplementalDiagnosticsMapper} {
			t.Run(strconv.Itoa(i+1), func(t *testing.T) {
				t.Parallel()
				defer testutil.RecoverAndFail(t, "Panic on fourslash test")
				f, done := newContentMapperFourslash(t, `// @Filename: /a.ts
export class C {}
export const missingSupplementalGlobal = 0;
// @Filename: /b.astro
import type { C } from "./a";
const a: { a: C } = {};
const b: { a: C } = {};
const c: { a: number; b: C; c: number } = {
    a: 0
};
const d: { a: number; b: C; c: number } = {
    a: 0, // a
};
`, mapper, ".astro")
				defer done()
				f.GoToFile(t, "/b.astro")
				f.VerifySourceFixAll(t, `import { C } from "./a";
const a: { a: C } = {
    a: new C
};
const b: { a: C } = {
    a: new C
};
const c: { a: number; b: C; c: number } = {
    a: 0,
    b: new C,
    c: 0
};
const d: { a: number; b: C; c: number } = {
    a: 0, // a
    b: new C,
    c: 0,
};
`)
				if mapper == contentmappertest.SupplementalDiagnosticsMapper {
					f.VerifyNumberOfErrorsInCurrentFile(t, 1)
				} else {
					f.VerifyNoErrors(t)
				}
			})
		}
	})
	t.Run("8", func(t *testing.T) {
		t.Parallel()
		defer testutil.RecoverAndFail(t, "Panic on fourslash test")
		// A synthesized import type { C } from "./a"; precedes the verbatim supplemental script.
		// The object replacements are writable, but promoting that import has no original location.
		f, done := newContentMapperFourslash(t, `// @Filename: /a.ts
export class C {}
// @Filename: /b-codefix-unmapped-import.astro
const /*1*/a: { a: C } = {};
const b: { a: C } = {};
`, contentmappertest.PrefixedSupplementalMapper, ".astro")
		defer done()
		f.GoToMarker(t, "1")
		f.VerifyCodeFixNotAvailable(t)
	})
	t.Run("9", func(t *testing.T) {
		t.Parallel()
		defer testutil.RecoverAndFail(t, "Panic on fourslash test")
		// Both declarations map verbatim after a generated __VERSION header; imports use the first writable segment.
		f, done := newContentMapperFourslash(t, `// @Filename: /a.ts
export class C {}
// @Filename: /b.box
const a: { a: import("./a").C } = {};
const b: { a: import("./a").C } = {};
`, contentmappertest.TransformingMapper, ".box")
		defer done()
		f.GoToFile(t, "/b.box")
		f.VerifySourceFixAll(t, `import { C } from "./a";

const a: { a: import("./a").C } = {
    a: new C
};
const b: { a: import("./a").C } = {
    a: new C
};
`)
		f.VerifyNoErrors(t)
	})
	t.Run("10", func(t *testing.T) {
		t.Parallel()
		defer testutil.RecoverAndFail(t, "Panic on fourslash test")
		const content = `// @Filename: /a.ts
export enum E { a, b }
// @Filename: /b.ts
import * as ns from "./a";
const a: { a: unknown; b: number } = { a: E.a };`
		f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
		defer done()
		f.GoToFile(t, "/b.ts")
		f.VerifySourceFixAll(t, `import * as ns from "./a";
const a: { a: unknown; b: number } = { a: ns.E.a, b: 0 };`)
		f.VerifyNoErrors(t)
	})
	t.Run("11", func(t *testing.T) {
		t.Parallel()
		for i, test := range []struct {
			literal string
			result  string
		}{
			{`{ a: 0 }`, `{ a: 0, b: 0, c: "" }`},
			{`{ a: 0, }`, `{ a: 0, b: 0, c: "", }`},
			{`{
    a: 0
}`, `{
    a: 0,
    b: 0,
    c: ""
}`},
			{`{
    a: 0,
}`, `{
    a: 0,
    b: 0,
    c: "",
}`},
			{`{
    a: 0 // a
}`, `{
    a: 0, // a
    b: 0,
    c: ""
}`},
			{`{
    a: 0, // a
}`, `{
    a: 0, // a
    b: 0,
    c: "",
}`},
		} {
			t.Run(strconv.Itoa(i+1), func(t *testing.T) {
				t.Parallel()
				defer testutil.RecoverAndFail(t, "Panic on fourslash test")
				const prefix = "const a: { a: number; b: number; c: string } = "
				f, done := fourslash.NewFourslash(t, nil /*capabilities*/, prefix+test.literal+";")
				defer done()
				f.VerifySourceFixAll(t, prefix+test.result+";")
				f.VerifyNoErrors(t)
			})
		}
	})
	t.Run("12", func(t *testing.T) {
		t.Parallel()
		defer testutil.RecoverAndFail(t, "Panic on fourslash test")
		const content = `// @Filename: /a.ts
export enum E { a, b }
// @Filename: /b.ts
import * as ns from "./a";
type T = { a: () => { a: unknown; b: number }; b: number; c: string };
function a() {
    const a: T = { a: (): { a: unknown; b: number } => ({ a: E.a }) };
}`
		f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
		defer done()
		f.GoToFile(t, "/b.ts")
		f.VerifySourceFixAll(t, `import * as ns from "./a";
type T = { a: () => { a: unknown; b: number }; b: number; c: string };
function a() {
    const a: T = { a: (): { a: unknown; b: number } => ({ a: ns.E.a, b: 0 }), b: 0, c: "" };
}`)
		f.VerifyNoErrors(t)
	})
}
