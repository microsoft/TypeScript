package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToSourceDefinitionTypeOnlyImportFallsBackToDeclaration(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// When source definition is invoked on a type-only symbol (e.g. an
	// interface) imported via a non-type-only import, the .js file has no
	// corresponding declaration. Source definition should fall back to the
	// .d.ts declaration rather than jumping to the first line of the .js file.
	const content = `// @moduleResolution: bundler
// @Filename: /home/src/workspaces/project/node_modules/pkg/package.json
{ "name": "pkg", "main": "./index.js", "types": "./index.d.ts" }
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.d.ts
export interface /*targetDecl*/Config {
    name: string;
    value: number;
}
export declare function create(config: Config): void;
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.js
export function create(config) { return config; }
// @Filename: /home/src/workspaces/project/index.ts
import { /*importConfig*/Config, create } from "pkg";
const c: Config = { name: "test", value: 1 };
create(c);`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToSourceDefinition(t, "importConfig")
}

func TestGoToSourceDefinitionTypeOnlyUsageFallsBackToDeclaration(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// When source definition is invoked at a usage site of a type-only symbol,
	// the checker path finds the .d.ts declarations but mapDeclarationToSource
	// finds nothing in the .js file. The result should fall back to regular
	// definition (the .d.ts declaration).
	const content = `// @moduleResolution: bundler
// @Filename: /home/src/workspaces/project/node_modules/pkg/package.json
{ "name": "pkg", "main": "./index.js", "types": "./index.d.ts" }
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.d.ts
export interface /*targetDecl*/Config {
    name: string;
}
export declare function create(config: Config): void;
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.js
export function create(config) { return config; }
// @Filename: /home/src/workspaces/project/index.ts
import { Config, create } from "pkg";
const c: /*usageSite*/Config = { name: "test" };
create(c);`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToSourceDefinition(t, "usageSite")
}

func TestGoToSourceDefinitionValueImportStillWorks(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// Value imports (functions, classes, variables) should still navigate
	// to the .js implementation, not regress to .d.ts.
	const content = `// @moduleResolution: bundler
// @Filename: /home/src/workspaces/project/node_modules/pkg/package.json
{ "name": "pkg", "main": "./index.js", "types": "./index.d.ts" }
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.d.ts
export declare function /*dtsCreate*/create(): void;
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.js
export function /*targetCreate*/create() {}
// @Filename: /home/src/workspaces/project/index.ts
import { /*importCreate*/create } from "pkg";
create();`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToSourceDefinition(t, "importCreate")
}
