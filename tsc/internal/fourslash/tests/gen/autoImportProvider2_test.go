package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestAutoImportProvider2(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /home/src/workspaces/project/node_modules/direct-dependency/package.json
{ "name": "direct-dependency", "dependencies": { "indirect-dependency": "*" } }
// @Filename: /home/src/workspaces/project/node_modules/direct-dependency/index.d.ts
import "indirect-dependency";
export declare class DirectDependency {}
// @Filename: /home/src/workspaces/project/node_modules/indirect-dependency/package.json
{ "name": "indirect-dependency" }
// @Filename: /home/src/workspaces/project/node_modules/indirect-dependency/index.d.ts
export declare class IndirectDependency
// @Filename: /home/src/workspaces/project/tsconfig.json
{ "compilerOptions": { "lib": ["es5"] } }
// @Filename: /home/src/workspaces/project/package.json
{ "dependencies": { "direct-dependency": "*" } }
// @Filename: /home/src/workspaces/project/index.ts
IndirectDependency/**/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.MarkTestAsStradaServer()
	f.GoToMarker(t, "")
	opts1155 := f.GetOptions()
	opts1155.FormatCodeSettings.NewLineCharacter = "\n"
	f.Configure(t, opts1155)
	f.VerifyImportFixAtPosition(t, []string{}, nil /*preferences*/)
}
