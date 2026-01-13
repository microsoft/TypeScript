package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestAutoImportExportEqualsOfImportStar(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: commonjs
// @Filename: /node_modules/mdx/package.json
{ "name": "mdx", "version": "1.0.0", "types": "index.d.ts" }
// @Filename: /node_modules/mdx/index.d.ts
import * as mdx from './lib/index.js'

export = mdx
// @Filename: /node_modules/mdx/lib/index.d.ts
export * from './core.js'
export * from './compile.js'
// @Filename: /node_modules/mdx/lib/core.d.ts
export declare function core(): void
// @Filename: /node_modules/mdx/lib/compile.d.ts
export declare function compile(): void
// @Filename: /package.json
{ "dependencies": { "mdx": "*" } }
// @Filename: /index.ts
mdx/**/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "")
	f.BaselineAutoImportsCompletions(t, []string{""})
}
