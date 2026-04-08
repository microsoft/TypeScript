package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToSourceNamedAndDefaultExport(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// findDeclarationNodesByName correctly finds both named exports and
	// default-exported classes/functions via the AST visitor.
	const content = `// @moduleResolution: bundler
// @Filename: /home/src/workspaces/project/node_modules/pkg/package.json
{ "name": "pkg", "main": "./index.js", "types": "./index.d.ts" }
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.d.ts
export default class Widget {}
export declare function helper(): void;
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.js
export default class /*targetWidget*/Widget {}
export function /*targetHelper*/helper() {}
// @Filename: /home/src/workspaces/project/index.ts
import /*importDefault*/Widget, { /*importHelper*/helper } from "pkg";
Widget;
helper();`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToSourceDefinition(t, "importDefault", "importHelper")
}

func TestGoToSourceDefaultImportNotFirstStatement(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// Default import navigates to the actual export default declaration,
	// not the first statement of the file, when the default export is not first.
	const content = `// @moduleResolution: bundler
// @Filename: /home/src/workspaces/project/node_modules/pkg/package.json
{ "name": "pkg", "main": "./index.js", "types": "./index.d.ts" }
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.d.ts
export declare const version: string;
export default class Widget {}
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.js
export const version = "1.0";
export default class /*targetWidget*/Widget {}
// @Filename: /home/src/workspaces/project/index.ts
import /*importDefault*/Widget from "pkg";
Widget;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToSourceDefinition(t, "importDefault")
}

func TestGoToSourceUnnamedDefaultExport(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @moduleResolution: bundler
// @Filename: /home/src/workspaces/project/node_modules/pkg/package.json
{ "name": "pkg", "main": "./index.js", "types": "./index.d.ts" }
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.d.ts
export default function(): string;
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.js
export default /*targetDefault*/function() { return "ok"; }
// @Filename: /home/src/workspaces/project/index.ts
import /*importDefault*/myFunc from "pkg";
myFunc/*usage*/();`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToSourceDefinition(t, "importDefault", "usage")
}

func TestGoToSourceEmptyNamesEntryFallback(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// getCandidateSourceDeclarationNames returns empty names,
	// so mapDeclarationToSourceDefinitions falls through to entry declarations.
	const content = `// @moduleResolution: bundler
// @Filename: /home/src/workspaces/project/node_modules/pkg/package.json
{ "name": "pkg", "main": "./index.js", "types": "./index.d.ts" }
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.d.ts
declare const _default: { run(): void };
export default _default;
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.js
export default { run() {} };
// @Filename: /home/src/workspaces/project/index.ts
import /*defaultImport*/pkg from "pkg";
pkg.run();`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToSourceDefinition(t, "defaultImport")
}

func TestGoToSourceExportAssignmentDefault(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// ExportAssignment/default path in findDeclarationNodesByName
	// and getCandidateSourceDeclarationNames.
	const content = `// @moduleResolution: bundler
// @Filename: /home/src/workspaces/project/node_modules/pkg/package.json
{ "name": "pkg", "main": "./index.js", "types": "./index.d.ts" }
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.d.ts
declare const _default: { run(): void };
export default _default;
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.js
/*target*/export default { run() {} };
// @Filename: /home/src/workspaces/project/index.ts
import pkg from "pkg";
pkg/*usage*/;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToSourceDefinition(t, "usage")
}

func TestGoToSourceExportAssignment(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// findDeclarationNodesByName finds export assignment (export = ...)
	// when searching for "default".
	const content = `// @moduleResolution: bundler
// @Filename: /home/src/workspaces/project/node_modules/legacy/package.json
{ "name": "legacy", "main": "./index.js", "types": "./index.d.ts" }
// @Filename: /home/src/workspaces/project/node_modules/legacy/index.d.ts
declare function legacyFn(): string;
export = legacyFn;
// @Filename: /home/src/workspaces/project/node_modules/legacy/index.js
function /*targetFn*/legacyFn() { return "ok"; }
module.exports = legacyFn;
// @Filename: /home/src/workspaces/project/index.ts
import /*importName*/legacyFn from "legacy";
legacyFn();`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToSourceDefinition(t, "importName")
}

func TestGoToSourceExportAssignmentExpression(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @moduleResolution: bundler
// @Filename: /home/src/workspaces/project/node_modules/pkg/package.json
{ "name": "pkg", "main": "./index.js", "types": "./index.d.ts" }
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.d.ts
export default function createThing(): { value: number };
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.js
export default function createThing() { return { value: 42 }; }
// @Filename: /home/src/workspaces/project/index.ts
import /*defaultName*/createThing from "pkg";
createThing/*callDefault*/();`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToSourceDefinition(t, "defaultName", "callDefault")
}
