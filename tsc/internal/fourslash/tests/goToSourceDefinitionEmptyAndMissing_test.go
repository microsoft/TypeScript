package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToSourceDefinitionEmptyJsFile(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// When the resolved .js file is empty (0 statements), source definition
	// navigates to the SourceFile node itself.
	const content = `// @moduleResolution: bundler
// @Filename: /home/src/workspaces/project/node_modules/pkg/package.json
{ "name": "pkg", "main": "./index.js", "types": "./index.d.ts" }
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.d.ts
export declare function foo(): void;
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.js
// @Filename: /home/src/workspaces/project/index.ts
import { foo } from /*specifier*/"pkg";
foo();`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToSourceDefinition(t, "specifier")
}

func TestGoToSourceDefaultImportNoDefaultInJs(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// When a default import resolves to a .js file that has no default export,
	// source definition falls back to the first statement of the file.
	const content = `// @moduleResolution: bundler
// @Filename: /home/src/workspaces/project/node_modules/pkg/package.json
{ "name": "pkg", "main": "./index.js", "types": "./index.d.ts" }
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.d.ts
export default function create(): void;
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.js
/*targetEntry*/function internalCreate() { return {}; }
module.exports = { create: internalCreate };
// @Filename: /home/src/workspaces/project/index.ts
import /*importDefault*/create from "pkg";
create();`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToSourceDefinition(t, "importDefault")
}
