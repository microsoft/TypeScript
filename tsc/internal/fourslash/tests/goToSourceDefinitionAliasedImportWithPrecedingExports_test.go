package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToSourceAliasedImportWithPrecedingExports(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// When importing { original as alias }, the module specifier path resolves
	// the alias text (not the original name). If the target function is NOT the
	// first export in the .js file, the entry-declaration fallback will point to
	// the wrong declaration. The fix should resolve to the original export name.
	const content = `// @moduleResolution: bundler
// @Filename: /home/src/workspaces/project/node_modules/pkg/package.json
{ "name": "pkg", "main": "./index.js", "types": "./index.d.ts" }
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.d.ts
export declare function unrelated(): void;
export declare function original(): string;
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.js
export function unrelated() {}
export function /*target*/original() { return "ok"; }
// @Filename: /home/src/workspaces/project/index.ts
import { original as /*aliasedImport*/renamed } from "pkg";
renamed();`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToSourceDefinition(t, "aliasedImport")
}

func TestGoToSourceReExportAliasWithPrecedingExports(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// Re-export with alias: export { original as alias } from "pkg"
	// should navigate to the original export, not the first statement.
	const content = `// @moduleResolution: bundler
// @Filename: /home/src/workspaces/project/node_modules/pkg/package.json
{ "name": "pkg", "main": "./index.js", "types": "./index.d.ts" }
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.d.ts
export declare function unrelated(): void;
export declare function original(): string;
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.js
export function unrelated() {}
export function /*target*/original() { return "ok"; }
// @Filename: /home/src/workspaces/project/reexport.ts
export { original as /*reExportAlias*/renamed } from "pkg";`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToSourceDefinition(t, "reExportAlias")
}
