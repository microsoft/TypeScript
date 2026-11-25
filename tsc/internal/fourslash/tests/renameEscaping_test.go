package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
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
		"/a.ts": "const obj = { \"it's \"${x}\"\\\": 1 };\n" +
			"obj[\"it's \"${x}\"\\\"];\n" +
			"obj['it's \"${x}\"\\'];\n" +
			"obj[`it's \"${x}\"\\`];",
	})
	f.VerifyRename(t, "2", `a"b`, map[string]string{
		"/b.ts": "const foo = { a\"b: true };\n" +
			"foo[\"a\"b\"];\n",
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
export { foo as a"b };`,
	})
}
