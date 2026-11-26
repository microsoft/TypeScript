package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestRenameEscapesStringLiterals(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = "// @Filename: /a.ts\n" +
		"const obj = { \"foo\": 1 };\n" +
		"obj[\"/*1*/foo\"];\n" +
		"obj['foo'];\n" +
		"obj[`foo`];\n" +
		"// @Filename: /b.ts\n" +
		"const foo = { 0: true };\n" +
		"foo[/*2*/0];\n"
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyRename(t, "1", "it's \"${x}\"\\", map[string]string{
		"/a.ts": `const obj = { "it's \"${x}\"\\": 1 };
obj["it's \"${x}\"\\"];
obj['it\'s "${x}"\\'];
obj[` + "`it's \"\\${x}\"\\\\`];",
	})
	f.VerifyRename(t, "2", `a"b`, map[string]string{
		"/b.ts": "const foo = { \"a\\\"b\": true };\n" +
			"foo[\"a\\\"b\"];\n",
	})
}

func TestRenameEmptyStringExportName(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /a.ts
const foo = 1;
export { foo as "/*1*/" };`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyRename(t, "1", `a"b`, map[string]string{
		"/a.ts": `const foo = 1;
export { foo as "a\"b" };`,
	})
}

func TestRenameToNonIdentifierWithAliases(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /a.ts
const foo = 1;
export { /*1*/foo };
const o = { "/*2*/x": 1 };
const { x } = o;
// @Filename: /b.ts
import { foo } from "./a";
foo;
const o2 = { foo };
export { foo };
// @Filename: /c.ts
export { foo } from "./a";
// @Filename: /d.ts
import { foo as bar } from "./a";
bar;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	defer f.ConfigureWithReset(t, lsutil.UserPreferences{ProvidePrefixAndSuffixTextForRename: core.TSTrue})()
	f.VerifyRename(t, "1", "a-b", map[string]string{
		"/a.ts": `const foo = 1;
export { foo as "a-b" };
const o = { "x": 1 };
const { x } = o;`,
		"/b.ts": `import { "a-b" as foo } from "./a";
foo;
const o2 = { foo };
export { foo };`,
		"/c.ts": `export { "a-b" as foo } from "./a";`,
		"/d.ts": `import { "a-b" as bar } from "./a";
bar;`,
	})
	f.VerifyRename(t, "2", "c-d", map[string]string{
		"/a.ts": `const foo = 1;
export { foo as "a-b" };
const o = { "c-d": 1 };
const { "c-d": x } = o;`,
	})
}

func TestRenameStringNamedReExportWithAliases(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /a.ts
const x = 1;
export { x as "/*1*/a b" };
// @Filename: /b.ts
export { "a b" } from "./a";
// @Filename: /c.ts
const y = 1;
export { y as "d e" };
// @Filename: /d.ts
export { "/*2*/d e" } from "./c";`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	defer f.ConfigureWithReset(t, lsutil.UserPreferences{ProvidePrefixAndSuffixTextForRename: core.TSTrue})()
	f.VerifyRename(t, "1", "c", map[string]string{
		"/a.ts": `const x = 1;
export { x as "c" };`,
		"/b.ts": `export { "c" as "a b" } from "./a";`,
	})
	f.VerifyRename(t, "2", "f", map[string]string{
		"/d.ts": `export { "d e" as "f" } from "./c";`,
	})
}

func TestRenameStringLiteralInJsxAttribute(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /a.tsx
// @jsx: preserve
declare function C(props: { kind: "foo" | "bar" }): any;
const k: "foo" | "bar" = "/*1*/foo";
<C kind="foo" />;
<C kind='foo' />;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyRename(t, "1", `a\"b`, map[string]string{
		"/a.tsx": `declare function C(props: { kind: "foo" | "bar" }): any;
const k: "a\\\"b" | "bar" = "a\\\"b";
<C kind='a\"b' />;
<C kind='a\"b' />;`,
	})
}

func TestRenameToNonIdentifierInJSDocImport(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowJs: true
// @checkJs: true
// @Filename: /a.ts
export interface /*1*/Foo {}
// @Filename: /b.js
/** @import { Foo } from "./a" */
/** @type {Foo} */
let x;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	defer f.ConfigureWithReset(t, lsutil.UserPreferences{ProvidePrefixAndSuffixTextForRename: core.TSTrue})()
	f.VerifyRename(t, "1", "a*/b", map[string]string{
		"/a.ts": `export interface a*/b {}`,
		"/b.js": `/** @import { "a*\/b" as Foo } from "./a" */
/** @type {Foo} */
let x;`,
	})
}

func TestRenameNamespaceExportToNonIdentifier(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /dep.ts
export const x = 1;
// @Filename: /a.ts
export * as /*1*/ns from "./dep";
// @Filename: /b.ts
import { ns as bar } from "./a";`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyRename(t, "1", "a-b", map[string]string{
		"/a.ts": `export * as "a-b" from "./dep";`,
		"/b.ts": `import { "a-b" as bar } from "./a";`,
	})
}
