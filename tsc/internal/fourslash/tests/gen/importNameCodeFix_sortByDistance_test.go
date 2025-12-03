package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestImportNameCodeFix_sortByDistance(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: commonjs
// @Filename: /src/admin/utils/db/db.ts
export const db = {};
// @Filename: /src/admin/utils/db/index.ts
export * from "./db";
// @Filename: /src/client/helpers/db.ts
export const db = {};
// @Filename: /src/client/db.ts
export const db = {};
// @Filename: /src/client/foo.ts
db/**/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "")
	f.VerifyImportFixAtPosition(t, []string{
		`import { db } from "./db";

db`,
		`import { db } from "./helpers/db";

db`,
		`import { db } from "../admin/utils/db";

db`,
		`import { db } from "../admin/utils/db/db";

db`,
	}, nil /*preferences*/)
}
