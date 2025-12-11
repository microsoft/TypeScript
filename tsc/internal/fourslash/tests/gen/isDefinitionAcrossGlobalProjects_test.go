package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestIsDefinitionAcrossGlobalProjects(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /home/src/workspaces/project/a/index.ts
namespace NS {
    export function /*1*/FA() {
        FB();
    }
}

interface /*2*/I {
    /*3*/FA();
}

const ia: I = {
    FA() { },
    FB() { },
    FC() { },
 };
// @Filename: /home/src/workspaces/project/a/tsconfig.json
{
    "extends": "../tsconfig.settings.json",
    "references": [
        { "path": "../b" },
        { "path": "../c" },
    ],
    "files": [
        "index.ts",
    ],
}
// @Filename: /home/src/workspaces/project/b/index.ts
namespace NS {
    export function /*4*/FB() {}
}

interface /*5*/I {
    /*6*/FB();
}

const ib: I = { FB() {} };
// @Filename: /home/src/workspaces/project/b/tsconfig.json
{
    "extends": "../tsconfig.settings.json",
    "files": [
        "index.ts",
    ],
}
// @Filename: /home/src/workspaces/project/c/index.ts
namespace NS {
    export function /*7*/FC() {}
}

interface /*8*/I {
    /*9*/FC();
}

const ic: I = { FC() {} };
// @Filename: /home/src/workspaces/project/c/tsconfig.json
{
    "extends": "../tsconfig.settings.json",
    "files": [
        "index.ts",
    ],
}
// @Filename: /home/src/workspaces/project/tsconfig.json
{
    "compilerOptions": {
        "composite": true,
    },
    "references": [
        { "path": "a" },
    ],
    "files": []
}
// @Filename: /home/src/workspaces/project/tsconfig.settings.json
{
    "compilerOptions": {
        "composite": true,
        "skipLibCheck": true,
        "declarationMap": true,
        "module": "none",
        "emitDeclarationOnly": true,
    }
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.MarkTestAsStradaServer()
	f.VerifyBaselineFindAllReferences(t, "1", "2", "3", "4", "5", "6", "7", "8", "9")
}
