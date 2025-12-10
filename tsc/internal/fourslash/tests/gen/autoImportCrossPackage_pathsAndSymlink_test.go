package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestAutoImportCrossPackage_pathsAndSymlink(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /home/src/workspaces/project/packages/common/package.json
{
  "name": "@company/common",
  "version": "1.0.0",
  "main": "./lib/index.tsx"
}
// @Filename: /home/src/workspaces/project/packages/common/lib/index.tsx
export function Tooltip {};
// @Filename: /home/src/workspaces/project/packages/app/package.json
{
  "name": "@company/app",
  "version": "1.0.0",
  "dependencies": {
    "@company/common": "1.0.0"
  }
}
// @Filename: /home/src/workspaces/project/packages/app/tsconfig.json
{
  "compilerOptions": {
    "composite": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
// @Filename: /home/src/workspaces/project/packages/app/lib/index.ts
Tooltip/**/
// @link: /home/src/workspaces/project/packages/common -> /home/src/workspaces/project/node_modules/@company/common`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.MarkTestAsStradaServer()
	f.GoToMarker(t, "")
	f.VerifyImportFixModuleSpecifiers(t, "", []string{"@company/common"}, nil /*preferences*/)
}
