package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToSourceNestedScopeShadowing(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// findDeclarationNodesByName should only match top-level/exported declarations,
	// not nested locals that happen to share the same name. Here "helper" is
	// exported at the top level, but there's also a local "helper" variable inside
	// a function body. We should navigate to the exported function, not the local.
	const content = `// @moduleResolution: bundler
// @Filename: /home/src/workspaces/project/node_modules/pkg/package.json
{ "name": "pkg", "main": "./index.js", "types": "./index.d.ts" }
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.d.ts
export declare function helper(): string;
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.js
export function /*targetHelper*/helper() { return "ok"; }
function unrelated() {
    const helper = "shadow";
    return helper;
}
// @Filename: /home/src/workspaces/project/index.ts
import { /*importHelper*/helper } from "pkg";
helper/*usage*/();`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToSourceDefinition(t, "importHelper", "usage")
}

func TestGoToSourceNestedClassShadowing(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// A class "Widget" is exported at the top level, and there's also a local
	// class "Widget" inside a function. We should only navigate to the exported one.
	const content = `// @moduleResolution: bundler
// @Filename: /home/src/workspaces/project/node_modules/pkg/package.json
{ "name": "pkg", "main": "./index.js", "types": "./index.d.ts" }
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.d.ts
export declare class Widget {}
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.js
export class /*targetWidget*/Widget {}
function factory() {
    class Widget { constructor() { this.local = true; } }
    return new Widget();
}
// @Filename: /home/src/workspaces/project/index.ts
import { /*importWidget*/Widget } from "pkg";
new Widget();`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToSourceDefinition(t, "importWidget")
}
