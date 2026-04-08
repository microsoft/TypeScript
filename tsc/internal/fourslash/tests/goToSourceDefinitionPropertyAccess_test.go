package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToSourceMappedTypePropertyWithMatch(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// When accessing a property that only exists via a mapped type, the checker
	// returns no declarations. The property access fallback (GetPropertyOfType)
	// should find the property if it's in the .js implementation file.
	// This test differs from the existing goToSourceMappedTypeProperty by having
	// a named explicit property in the .d.ts alongside the mapped type.
	const content = `// @moduleResolution: bundler
// @Filename: /home/src/workspaces/project/node_modules/pkg/package.json
{ "name": "pkg", "main": "./index.js", "types": "./index.d.ts" }
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.d.ts
export declare const obj: { a: number; b: number };
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.js
export const obj = { /*targetA*/a: 1, /*targetB*/b: 2 };
// @Filename: /home/src/workspaces/project/index.ts
import { obj } from "pkg";
obj./*propA*/a;
obj./*propB*/b;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToSourceDefinition(t, "propA", "propB")
}

func TestGoToSourceNamespaceImportProperty(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// import * as ns from "pkg"; ns.prop — should navigate to the property
	// in the .js file.
	const content = `// @moduleResolution: bundler
// @Filename: /home/src/workspaces/project/node_modules/pkg/package.json
{ "name": "pkg", "main": "./index.js", "types": "./index.d.ts" }
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.d.ts
export declare function helper(): void;
export declare const value: number;
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.js
export function /*targetHelper*/helper() {}
export const /*targetValue*/value = 42;
// @Filename: /home/src/workspaces/project/index.ts
import * as pkg from "pkg";
pkg./*helperAccess*/helper();
pkg./*valueAccess*/value;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToSourceDefinition(t, "helperAccess", "valueAccess")
}
