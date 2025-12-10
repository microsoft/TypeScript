package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestAutoImportPathsNodeModules(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: tsconfig.json
{
    "compilerOptions": {
        "module": "amd",
        "moduleResolution": "node",
        "rootDir": "ts",
        "baseUrl": ".",
        "paths": {
            "*": ["node_modules/@woltlab/wcf/ts/*"]
        }
    },
    "include": [
        "ts",
        "node_modules/@woltlab/wcf/ts",
     ]
}
// @Filename: node_modules/@woltlab/wcf/ts/WoltLabSuite/Core/Component/Dialog.ts
export class Dialog {}
// @Filename: ts/main.ts
Dialog/**/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyImportFixModuleSpecifiers(t, "", []string{"WoltLabSuite/Core/Component/Dialog"}, nil /*preferences*/)
}
