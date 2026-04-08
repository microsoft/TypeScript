package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToSourceReferenceTypesToJS(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// /// <reference types="foo"/> resolves to @types/foo/index.d.ts.
	// Source definition should find the corresponding foo/index.js.
	const content = `// @moduleResolution: bundler
// @Filename: /home/src/workspaces/project/node_modules/@types/foo/package.json
{ "name": "@types/foo", "version": "1.0.0" }
// @Filename: /home/src/workspaces/project/node_modules/@types/foo/index.d.ts
export declare function bar(): string;
// @Filename: /home/src/workspaces/project/node_modules/foo/package.json
{ "name": "foo", "version": "1.0.0", "main": "./index.js" }
// @Filename: /home/src/workspaces/project/node_modules/foo/index.js
export function /*target*/bar() { return "hello"; }
// @Filename: /home/src/workspaces/project/index.ts
/// <reference types="[|foo/*refTypes*/|]" />
import { bar } from "foo";
bar();`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToSourceDefinition(t, "refTypes")
}

func TestGoToSourceReferencePathToDts(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// /// <reference path="./lib.d.ts"/> where a sibling .js file exists.
	// Source definition should navigate to the .js implementation.
	const content = `// @moduleResolution: bundler
// @Filename: /home/src/workspaces/project/node_modules/pkg/package.json
{ "name": "pkg", "main": "./index.js", "types": "./index.d.ts" }
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.d.ts
/// <reference path="./lib.d.ts" />
export declare function main(): void;
// @Filename: /home/src/workspaces/project/node_modules/pkg/lib.d.ts
export declare function helper(): string;
// @Filename: /home/src/workspaces/project/node_modules/pkg/lib.js
export function /*target*/helper() { return "ok"; }
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.js
export function main() {}
// @Filename: /home/src/workspaces/project/index.ts
/// <reference path="./node_modules/pkg/[|lib.d.ts/*refPath*/|]" />
declare function helper(): string;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToSourceDefinition(t, "refPath")
}
