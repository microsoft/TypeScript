package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestAutoImportNodeModuleSymlinkRenamed(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /home/src/workspaces/solution/package.json
{
    "name": "monorepo",
    "workspaces": ["packages/*"]
}
// @Filename: /home/src/workspaces/solution/packages/utils/package.json
{
    "name": "utils",
    "version": "1.0.0",
    "exports": "./dist/index.js"
}
// @Filename: /home/src/workspaces/solution/packages/utils/tsconfig.json
{
    "compilerOptions": {
        "lib": ["es5"],
        "composite": true,
        "module": "nodenext",
        "rootDir": "src",
        "outDir": "dist"
    },
    "include": ["src"]
}
// @Filename: /home/src/workspaces/solution/packages/utils/src/index.ts
export function gainUtility() { return 0; }
// @Filename: /home/src/workspaces/solution/packages/web/package.json
{
    "name": "web",
    "version": "1.0.0",
    "dependencies": {
        "@monorepo/utils": "file:../utils"
    }
}
// @Filename: /home/src/workspaces/solution/packages/web/tsconfig.json
{
    "compilerOptions": {
        "lib": ["es5"],
        "composite": true,
        "module": "esnext",
        "moduleResolution": "bundler",
        "rootDir": "src",
        "outDir": "dist",
        "emitDeclarationOnly": true
    },
    "include": ["src"],
    "references": [
        { "path": "../utils" }
    ]
}
// @Filename: /home/src/workspaces/solution/packages/web/src/index.ts
gainUtility/**/
// @link: /home/src/workspaces/solution/packages/utils -> /home/src/workspaces/solution/node_modules/utils
// @link: /home/src/workspaces/solution/packages/utils -> /home/src/workspaces/solution/node_modules/@monorepo/utils
// @link: /home/src/workspaces/solution/packages/web -> /home/src/workspaces/solution/node_modules/web`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.MarkTestAsStradaServer()
	f.GoToMarker(t, "")
	f.VerifyImportFixModuleSpecifiers(t, "", []string{"@monorepo/utils"}, nil /*preferences*/)
}
