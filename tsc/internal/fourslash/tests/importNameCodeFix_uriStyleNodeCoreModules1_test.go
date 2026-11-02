package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestImportNameCodeFix_uriStyleNodeCoreModules1(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: commonjs
// @Filename: /node_modules/@types/node/index.d.ts
declare module "fs" { function writeFile(): void }
declare module "fs/promises" { function writeFile(): Promise<void> }
declare module "node:fs" { export * from "fs"; }
declare module "node:fs/promises" { export * from "fs/promises"; }
// @Filename: /index.ts
writeFile/**/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyImportFixModuleSpecifiers(t, "", []string{"fs", "node:fs", "fs/promises", "node:fs/promises"}, nil /*preferences*/)
}

func TestImportNameCodeFix_uriStyleMixedModuleKinds(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: commonjs
// @Filename: /node_modules/@types/node/index.d.ts
declare module "path" {}
declare module "node:path" {}
declare module "fs" { export function writeFile(): void }
declare module "node:fs" { export function writeFile(): void }

// @Filename: /node_modules/lodash/package.json
{ "name": "lodash", "types": "index.d.ts" }

// @Filename: /node_modules/lodash/index.d.ts
export declare function writeFile(): void;

// @Filename: /package.json
{ "dependencies": { "lodash": "*" } }

// @Filename: /prefix.ts
import "node:path";
writeFile/*prefix*/

// @Filename: /noPrefix.ts
import "path";
writeFile/*noPrefix*/

// @Filename: /unknown.ts
writeFile/*unknown*/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyImportFixModuleSpecifiers(t, "prefix", []string{"node:fs", "fs", "lodash"}, nil /*preferences*/)
	f.VerifyImportFixModuleSpecifiers(t, "noPrefix", []string{"fs", "lodash", "node:fs"}, nil /*preferences*/)
	f.VerifyImportFixModuleSpecifiers(t, "unknown", []string{"fs", "lodash", "node:fs"}, nil /*preferences*/)
}
