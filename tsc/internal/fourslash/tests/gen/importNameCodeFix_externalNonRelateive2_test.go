package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/ls/lsutil"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestImportNameCodeFix_externalNonRelateive2(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /home/src/workspaces/project/apps/app1/tsconfig.json
{
  "compilerOptions": {
    "module": "commonjs",
    "lib": ["es5"],
    "paths": {
      "shared/*": ["../../shared/*"]
    }
  },
  "include": ["src", "../../shared"]
}
// @Filename: /home/src/workspaces/project/apps/app1/src/index.ts
shared/*internal2external*/
// @Filename: /home/src/workspaces/project/apps/app1/src/app.ts
utils/*internal2internal*/
// @Filename: /home/src/workspaces/project/apps/app1/src/utils.ts
export const utils = 0;
// @Filename: /home/src/workspaces/project/shared/constants.ts
export const shared = 0;
// @Filename: /home/src/workspaces/project/shared/data.ts
shared/*external2external*/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.MarkTestAsStradaServer()
	opts839 := f.GetOptions()
	opts839.FormatCodeSettings.NewLineCharacter = "\n"
	f.Configure(t, opts839)
	f.GoToMarker(t, "internal2external")
	f.VerifyImportFixAtPosition(t, []string{
		`import { shared } from "shared/constants";

shared`,
	}, &lsutil.UserPreferences{ImportModuleSpecifierPreference: "project-relative"})
	f.GoToMarker(t, "internal2internal")
	f.VerifyImportFixAtPosition(t, []string{
		`import { utils } from "./utils";

utils`,
	}, &lsutil.UserPreferences{ImportModuleSpecifierPreference: "project-relative"})
	f.GoToMarker(t, "external2external")
	f.VerifyImportFixAtPosition(t, []string{
		`import { shared } from "./constants";

shared`,
	}, &lsutil.UserPreferences{ImportModuleSpecifierPreference: "project-relative"})
}
