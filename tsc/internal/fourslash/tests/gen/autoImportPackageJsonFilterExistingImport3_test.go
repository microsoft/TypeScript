package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestAutoImportPackageJsonFilterExistingImport3(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /home/src/workspaces/project/tsconfig.json
{ "compilerOptions": { "lib": ["es5"], "module": "preserve", "types": ["*"] } }
// @Filename: /home/src/workspaces/project/node_modules/@types/node/index.d.ts
declare module "node:fs" {
    export function readFile(): void;
    export function writeFile(): void;
}
// @Filename: /home/src/workspaces/project/package.json
{}
// @Filename: /home/src/workspaces/project/index.ts
readFile/**/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.MarkTestAsStradaServer()
	f.GoToMarker(t, "")
	f.VerifyImportFixAtPosition(t, []string{}, nil /*preferences*/)
	f.GoToBOF(t)
	f.InsertLine(t, "import { writeFile } from \"node:fs\";")
	f.GoToMarker(t, "")
	f.VerifyImportFixAtPosition(t, []string{
		`import { readFile, writeFile } from "node:fs";
readFile`,
	}, nil /*preferences*/)
}
