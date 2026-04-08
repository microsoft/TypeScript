package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToSourceAliasedImportAtUsageSite(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// When the cursor is on a usage of an aliased import (not on the import
	// specifier itself), the module specifier is discovered via
	// findImportForName, and the original export name is passed as
	// additionalNames so that the .js file is searched for the correct
	// declaration. Without additionalNames, only the alias name would be
	// searched, which does not exist in the .js file.
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
import { original as renamed } from "pkg";
renamed/*usage*/();`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToSourceDefinition(t, "usage")
}

func TestGoToSourceAliasedImportAtUsageSiteNamespaceImport(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// When an aliased namespace import (import * as ns) is used at a property
	// access site (ns.foo), the root identifier's import is discovered and the
	// module specifier is used to resolve the property in the .js file.
	const content = `// @moduleResolution: bundler
// @Filename: /home/src/workspaces/project/node_modules/pkg/package.json
{ "name": "pkg", "main": "./index.js", "types": "./index.d.ts" }
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.d.ts
export declare function helper(): string;
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.js
export function /*target*/helper() { return "ok"; }
// @Filename: /home/src/workspaces/project/index.ts
import * as ns from "pkg";
ns./*usage*/helper();`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToSourceDefinition(t, "usage")
}
