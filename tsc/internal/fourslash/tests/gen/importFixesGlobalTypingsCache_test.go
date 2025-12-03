package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestImportFixesGlobalTypingsCache(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /project/tsconfig.json
 { "compilerOptions": { "allowJs": true, "checkJs": true } }
// @Filename: /home/src/Library/Caches/typescript/node_modules/@types/react-router-dom/package.json
 { "name": "@types/react-router-dom", "version": "16.8.4", "types": "index.d.ts" }
// @Filename: /home/src/Library/Caches/typescript/node_modules/@types/react-router-dom/index.d.ts
export class BrowserRouter {}
// @Filename: /project/node_modules/react-router-dom/package.json
 { "name": "react-router-dom", "version": "16.8.4", "main": "index.js" }
// @Filename: /project/node_modules/react-router-dom/index.js
 export const BrowserRouter = () => null;
// @Filename: /project/index.js
BrowserRouter/**/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToFile(t, "/project/index.js")
	f.VerifyImportFixAtPosition(t, []string{
		`const { BrowserRouter } = require("react-router-dom");

BrowserRouter`,
	}, nil /*preferences*/)
}
