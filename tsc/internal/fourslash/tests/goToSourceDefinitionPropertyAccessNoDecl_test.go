package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToSourcePropertyAccessNoDeclaration(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// When a property exists only via a mapped type in the .d.ts, the checker
	// returns no declarations. The source definition resolver should still
	// navigate to the property in the .js file by finding the module specifier
	// from the parent expression's import declaration.
	const content = `// @moduleResolution: bundler
// @Filename: /home/src/workspaces/project/node_modules/pkg/package.json
{ "name": "pkg", "main": "./index.js", "types": "./index.d.ts" }
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.d.ts
type Keys = "alpha" | "beta";
export declare const config: { [K in Keys]: string };
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.js
export const config = { /*targetAlpha*/alpha: "a", /*targetBeta*/beta: "b" };
// @Filename: /home/src/workspaces/project/index.ts
import { config } from "pkg";
config./*accessAlpha*/alpha;
config./*accessBeta*/beta;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToSourceDefinition(t, "accessAlpha", "accessBeta")
}

func TestGoToSourcePropertyAccessDeepChain(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// Deep property access chain: import * as ns; ns.obj.prop
	// where the intermediate object has no declaration but the root
	// identifier can be traced back to its import.
	const content = `// @moduleResolution: bundler
// @Filename: /home/src/workspaces/project/node_modules/pkg/package.json
{ "name": "pkg", "main": "./index.js", "types": "./index.d.ts" }
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.d.ts
export declare const nested: { inner: { value: number } };
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.js
export const nested = { inner: { /*targetValue*/value: 42 } };
// @Filename: /home/src/workspaces/project/index.ts
import { nested } from "pkg";
nested.inner./*accessValue*/value;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToSourceDefinition(t, "accessValue")
}

func TestGoToSourcePropertyAccessNamespaceImport(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// import * as ns from "pkg"; ns.thing — where "thing" has no declarations
	// from the checker (e.g. module augmentation or dynamic).
	const content = `// @moduleResolution: bundler
// @Filename: /home/src/workspaces/project/node_modules/pkg/package.json
{ "name": "pkg", "main": "./index.js", "types": "./index.d.ts" }
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.d.ts
type Keys = "x" | "y";
export declare const coords: { [K in Keys]: number };
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.js
export const coords = { /*targetX*/x: 10, /*targetY*/y: 20 };
// @Filename: /home/src/workspaces/project/index.ts
import { coords } from "pkg";
coords./*accessX*/x;
coords./*accessY*/y;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToSourceDefinition(t, "accessX", "accessY")
}
