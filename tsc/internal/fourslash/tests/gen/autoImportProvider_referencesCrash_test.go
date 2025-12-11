package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestAutoImportProvider_referencesCrash(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /home/src/workspaces/project/a/package.json
{}
// @Filename: /home/src/workspaces/project/a/tsconfig.json
{}
// @Filename: /home/src/workspaces/project/a/index.ts
class A {}
// @Filename: /home/src/workspaces/project/a/index.d.ts
declare class A {
}
//# sourceMappingURL=index.d.ts.map
// @Filename: /home/src/workspaces/project/a/index.d.ts.map
{"version":3,"file":"index.d.ts","sourceRoot":"","sources":["index.ts"],"names":[],"mappings":"AAAA,OAAO,OAAO,CAAC;CAAG"}
// @Filename: /home/src/workspaces/project/b/tsconfig.json
{
  "compilerOptions": { "disableSourceOfProjectReferenceRedirect": true },
  "references": [{ "path": "../a" }]
}
// @Filename: /home/src/workspaces/project/b/b.ts
/// <reference path="../a/index.d.ts" />
new A/**/();
// @Filename: /home/src/workspaces/project/c/package.json
{ "dependencies": { "a": "*" } }
// @Filename: /home/src/workspaces/project/c/tsconfig.json
{ "references" [{ "path": "../a" }] }
// @Filename: /home/src/workspaces/project/c/index.ts
export {};
// @link: /home/src/workspaces/project/a -> /home/src/workspaces/project/c/node_modules/a`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.MarkTestAsStradaServer()
	f.GoToFile(t, "/home/src/workspaces/project/c/index.ts")
	f.VerifyBaselineFindAllReferences(t, "")
}
