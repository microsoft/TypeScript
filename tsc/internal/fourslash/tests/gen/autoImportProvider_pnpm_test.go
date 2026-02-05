package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestAutoImportProvider_pnpm(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /home/src/workspaces/project/tsconfig.json
{ "compilerOptions": { "module": "commonjs", "lib": ["es5"] } }
// @Filename: /home/src/workspaces/project/package.json
{ "dependencies": { "mobx": "*" } }
// @Filename: /home/src/workspaces/project/node_modules/.pnpm/mobx@6.0.4/node_modules/mobx/package.json
{ "types": "dist/mobx.d.ts" }
// @Filename: /home/src/workspaces/project/node_modules/.pnpm/mobx@6.0.4/node_modules/mobx/dist/mobx.d.ts
export declare function autorun(): void;
// @Filename: /home/src/workspaces/project/index.ts
autorun/**/
// @link: /home/src/workspaces/project/node_modules/.pnpm/mobx@6.0.4/node_modules/mobx -> /home/src/workspaces/project/node_modules/mobx`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.MarkTestAsStradaServer()
	f.GoToMarker(t, "")
	f.VerifyImportFixAtPosition(t, []string{
		`import { autorun } from "mobx";

autorun`,
	}, nil /*preferences*/)
}
