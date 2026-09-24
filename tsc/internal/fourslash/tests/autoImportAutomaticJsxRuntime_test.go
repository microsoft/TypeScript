package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestAutoImportAutomaticJsxRuntime(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /node_modules/pkg/package.json
	{ "name": "pkg", "version": "1.0.0", "main": "index.jsx" }
	// @Filename: /node_modules/pkg/index.jsx
/** @jsxRuntime automatic */
module.exports = {
	x() {
		return { value: <div /> } satisfies {};
	},
};
// @Filename: /tsconfig.json
{ "compilerOptions": { "allowJs": true, "checkJs": true, "jsx": "react-jsx" } }
// @Filename: /package.json
{ "dependencies": { "pkg": "*" } }
// @Filename: /index.ts
x/**/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.BaselineAutoImportsCompletions(t, []string{""})
}
