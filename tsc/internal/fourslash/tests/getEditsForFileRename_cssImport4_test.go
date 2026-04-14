package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGetEditsForFileRename_cssImport4(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
// @Filename: /tsconfig.json
{ "compilerOptions": { "allowArbitraryExtensions": true } }
// @Filename: /app.css
.cookie-banner {
  display: none;
}
// @Filename: /app.d.css.ts
declare const css: {
  cookieBanner: string;
};
export default css;
// @Filename: /a.ts
import styles from ".//*rename*/app.css";`
	capabilities := fourslash.GetDefaultCapabilities()
	capabilities.Workspace.FileOperations.WillRename = new(false)
	f, done := fourslash.NewFourslash(t, capabilities, content)
	defer done()
	f.VerifyRename(t, "rename", "app2.css", map[string]string{
		"/a.ts": `import styles from "./app2.css";`,
		"/app2.d.css.ts": `declare const css: {
  cookieBanner: string;
};
export default css;`,
		"/app2.css": `.cookie-banner {
  display: none;
}`,
	})
}
