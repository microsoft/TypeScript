package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestTripleSlashReferenceResolutionMode(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /home/src/workspaces/project/tsconfig.json
 { "compilerOptions": { "module": "nodenext", "declaration": true, "strict": true, "outDir": "out" }, "files": ["./index.ts"] }
// @Filename: /home/src/workspaces/project/package.json
 { "private": true, "type": "commonjs" }
// @Filename: /home/src/workspaces/project/node_modules/pkg/package.json
{ "name": "pkg", "version": "0.0.1", "exports": { "require": "./require.cjs", "default": "./import.js" }, "type": "module" }
// @Filename: /home/src/workspaces/project/node_modules/pkg/require.d.cts
export {};
export interface PkgRequireInterface { member: any; }
declare global { const pkgRequireGlobal: PkgRequireInterface; }
// @Filename: /home/src/workspaces/project/node_modules/pkg/import.d.ts
export {};
export interface PkgImportInterface { field: any; }
declare global { const pkgImportGlobal: PkgImportInterface; }
// @Filename: /home/src/workspaces/project/index.ts
/// <reference types="pkg" resolution-mode="import" />
pkgImportGlobal;
export {};`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.MarkTestAsStradaServer()
	f.GoToFile(t, "/home/src/workspaces/project/index.ts")
	f.VerifyNumberOfErrorsInCurrentFile(t, 0)
}
