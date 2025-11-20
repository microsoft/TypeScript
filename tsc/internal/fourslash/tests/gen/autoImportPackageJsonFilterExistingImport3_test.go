package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestAutoImportPackageJsonFilterExistingImport3(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: preserve
// @Filename: /home/src/workspaces/project/node_modules/@types/node/index.d.ts
declare module "node:fs" {
    export function readFile(): void;
    export function writeFile(): void;
}
// @Filename: /home/src/workspaces/project/package.json
{}
// @Filename: /home/src/workspaces/project/index.ts
readFile/**/`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
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
