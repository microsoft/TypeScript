package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestImportNameCodeFix_uriStyleNodeCoreModules3(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: commonjs
// @Filename: /node_modules/@types/node/index.d.ts
declare module "path" { function join(...segments: readonly string[]): string; }
declare module "node:path" { export * from "path"; }
declare module "fs" { function writeFile(): void }
declare module "fs/promises" { function writeFile(): Promise<void> }
declare module "node:fs" { export * from "fs"; }
declare module "node:fs/promises" { export * from "fs/promises"; }
// @Filename: /other.ts
import "node:fs/promises";
// @Filename: /noPrefix.ts
import "path";
writeFile/*noPrefix*/
// @Filename: /prefix.ts
import "node:path";
writeFile/*prefix*/
// @Filename: /mixed1.ts
import "path";
import "node:path";
writeFile/*mixed1*/
// @Filename: /mixed2.ts
import "node:path";
import "path";
writeFile/*mixed2*/
// @Filename: /test1.ts
import "node:test";
import "path";
writeFile/*test1*/
// @Filename: /test2.ts
import "node:test";
writeFile/*test2*/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyImportFixModuleSpecifiers(t, "noPrefix", []string{"fs", "fs/promises"}, nil /*preferences*/)
	f.VerifyImportFixModuleSpecifiers(t, "prefix", []string{"node:fs", "node:fs/promises"}, nil /*preferences*/)
	f.VerifyImportFixModuleSpecifiers(t, "mixed1", []string{"node:fs", "node:fs/promises"}, nil /*preferences*/)
	f.VerifyImportFixModuleSpecifiers(t, "mixed2", []string{"node:fs", "node:fs/promises"}, nil /*preferences*/)
	f.VerifyImportFixModuleSpecifiers(t, "test1", []string{"fs", "fs/promises"}, nil /*preferences*/)
	f.VerifyImportFixModuleSpecifiers(t, "test2", []string{"node:fs", "node:fs/promises"}, nil /*preferences*/)
}
