package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestAutoImportProvider1(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /home/src/workspaces/project/node_modules/@angular/forms/package.json
{ "name": "@angular/forms", "typings": "./forms.d.ts" }
// @Filename: /home/src/workspaces/project/node_modules/@angular/forms/forms.d.ts
export class PatternValidator {}
// @Filename: /home/src/workspaces/project/tsconfig.json
{ "compilerOptions": { "lib": ["es5"] } }
// @Filename: /home/src/workspaces/project/package.json
{ "dependencies": { "@angular/forms": "*" } }
// @Filename: /home/src/workspaces/project/index.ts
PatternValidator/**/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.MarkTestAsStradaServer()
	f.GoToMarker(t, "")
	opts654 := f.GetOptions()
	opts654.FormatCodeSettings.NewLineCharacter = "\n"
	f.Configure(t, opts654)
	f.VerifyImportFixAtPosition(t, []string{
		`import { PatternValidator } from "@angular/forms";

PatternValidator`,
	}, nil /*preferences*/)
}
