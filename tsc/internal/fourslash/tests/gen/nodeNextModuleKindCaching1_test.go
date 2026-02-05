package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestNodeNextModuleKindCaching1(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: tsconfig.json
{
    "compilerOptions": {
      "lib": ["es5"],
      "rootDir": "src",
      "outDir": "dist",
      "target": "ES2020",
      "module": "NodeNext",
      "strict": true
    },
    "include": ["src\\**\\*.ts"]
}
// @Filename: package.json
{
    "type": "module",
    "private": true
}
// @Filename: src/index.ts
// The line below should show a "Relative import paths need explicit file
// extensions..." error in VS Code, but it doesn't. The error is only picked up
// by ` + "`" + `tsc` + "`" + ` which seems to properly infer the module type.
import { helloWorld } from './example'
/**/
helloWorld()
// @Filename: src/example.ts
export function helloWorld() {
    console.log('Hello, world!')
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.MarkTestAsStradaServer()
	f.GoToMarker(t, "")
	f.VerifyNumberOfErrorsInCurrentFile(t, 1)
}
