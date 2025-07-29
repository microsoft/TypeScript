package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionsImport_computedSymbolName(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /home/src/workspaces/project/tsconfig.json
{ "compilerOptions": { "module": "commonjs" } }
// @Filename: /home/src/workspaces/project/node_modules/@types/ts-node/index.d.ts
export {};
declare const REGISTER_INSTANCE: unique symbol;
declare global {
    namespace NodeJS {
      interface Process {
          [REGISTER_INSTANCE]?: Service;
      }
  }
}
// @Filename: /home/src/workspaces/project/node_modules/@types/node/index.d.ts
declare module "process" {
    global {
        var process: NodeJS.Process;
        namespace NodeJS {
            interface Process {
                argv: string[];
            }
        }
    }
    export = process;
}
// @Filename: /home/src/workspaces/project/index.ts
I/**/`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{},
	})
	f.Insert(t, "N")
	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{},
	})
}
