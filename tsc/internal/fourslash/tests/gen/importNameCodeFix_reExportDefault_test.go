package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestImportNameCodeFix_reExportDefault(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /user.ts
foo;
// @Filename: /user2.ts
unnamed;
// @Filename: /user3.ts
reExportUnnamed;
// @Filename: /reExportNamed.ts
export { default } from "./named";
// @Filename: /reExportUnnamed.ts
export { default } from "./unnamed";
// @Filename: /named.ts
function foo() {}
export default foo;
// @Filename: /unnamed.ts
export default 0;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToFile(t, "/user.ts")
	f.VerifyImportFixAtPosition(t, []string{
		`import foo from "./named";

foo;`,
		`import foo from "./reExportNamed";

foo;`,
	}, nil /*preferences*/)
	f.GoToFile(t, "/user2.ts")
	f.VerifyImportFixAtPosition(t, []string{
		`import unnamed from "./unnamed";

unnamed;`,
		`import unnamed from "./reExportUnnamed";

unnamed;`,
	}, nil /*preferences*/)
	f.GoToFile(t, "/user3.ts")
	f.VerifyImportFixAtPosition(t, []string{
		`import reExportUnnamed from "./reExportUnnamed";

reExportUnnamed;`,
	}, nil /*preferences*/)
}
