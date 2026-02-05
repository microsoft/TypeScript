package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestAutoImportProvider4(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /home/src/workspaces/project/a/package.json
{ "dependencies": { "b": "*" } }
// @Filename: /home/src/workspaces/project/a/tsconfig.json
{ "compilerOptions": { "lib": ["es5"], "module": "commonjs", "target": "esnext" }, "references": [{ "path": "../b" }] }
// @Filename: /home/src/workspaces/project/a/index.ts
new Shape/**/
// @Filename: /home/src/workspaces/project/b/package.json
{ "types": "out/index.d.ts" }
// @Filename: /home/src/workspaces/project/b/tsconfig.json
{ "compilerOptions": { "lib": ["es5"], "outDir": "out", "composite": true } }
// @Filename: /home/src/workspaces/project/b/index.ts
export class Shape {}
// @link: /home/src/workspaces/project/b -> /home/src/workspaces/project/a/node_modules/b`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.MarkTestAsStradaServer()
	f.GoToMarker(t, "")
	f.VerifyImportFixAtPosition(t, []string{
		`import { Shape } from "b";

new Shape`,
	}, nil /*preferences*/)
}
