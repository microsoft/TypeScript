package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestImportNameCodeFix_uriStyleNodeCoreModules2(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: commonjs
// @Filename: /node_modules/@types/node/index.d.ts
declare module "fs" { function writeFile(): void }
declare module "fs/promises" { function writeFile(): Promise<void> }
declare module "node:fs" { export * from "fs"; }
declare module "node:fs/promises" { export * from "fs/promises"; }
// @Filename: /other.ts
import "node:fs/promises";
// @Filename: /index.ts
writeFile/**/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyImportFixModuleSpecifiers(t, "", []string{"node:fs", "node:fs/promises"}, nil /*preferences*/)
	f.GoToFile(t, "/other.ts")
	f.ReplaceLine(t, 0, "\n")
	f.GoToFile(t, "/index.ts")
	f.VerifyImportFixModuleSpecifiers(t, "", []string{"fs", "fs/promises", "node:fs", "node:fs/promises"}, nil /*preferences*/)
	f.GoToFile(t, "/other.ts")
	f.ReplaceLine(t, 0, "import \"node:fs/promises\";\n")
	f.GoToFile(t, "/index.ts")
	f.VerifyImportFixModuleSpecifiers(t, "", []string{"node:fs", "node:fs/promises"}, nil /*preferences*/)
}
