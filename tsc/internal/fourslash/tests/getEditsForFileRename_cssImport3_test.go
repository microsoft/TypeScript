package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGetEditsForFileRename_cssImport3(t *testing.T) {
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
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
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
