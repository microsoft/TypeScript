package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToSourceDefaultImportUsageSiteChecker(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// When the cursor is on a usage of a default import (not on the import
	// clause itself), the checker path is taken. getCandidateSourceDeclarationNames
	// must include "default" from the resolved declaration's export-default
	// modifier, since isDefaultImportName returns false at the usage site.
	const content = `// @moduleResolution: bundler
// @Filename: /home/src/workspaces/project/node_modules/pkg/package.json
{ "name": "pkg", "main": "./index.js", "types": "./index.d.ts" }
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.d.ts
export default class Widget {
    render(): void;
}
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.js
export default class /*targetWidget*/Widget {
    /*targetRender*/render() {}
}
// @Filename: /home/src/workspaces/project/index.ts
import Widget from "pkg";
const w = new Widget/*constructUsage*/("test");
w./*methodUsage*/render();`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToSourceDefinition(t, "constructUsage", "methodUsage")
}

func TestGoToSourceDefaultImportReExportUsage(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// Default import re-exported and then used at a call site. The checker
	// must resolve the alias chain, and the source definition should reach
	// the original implementation file.
	const content = `// @moduleResolution: bundler
// @Filename: /home/src/workspaces/project/node_modules/pkg/package.json
{ "name": "pkg", "main": "./index.js", "types": "./index.d.ts" }
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.d.ts
export default function greet(name: string): string;
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.js
export default function /*targetGreet*/greet(name) { return "Hello, " + name; }
// @Filename: /home/src/workspaces/project/index.ts
import greet from "pkg";
greet/*callUsage*/("world");`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToSourceDefinition(t, "callUsage")
}
