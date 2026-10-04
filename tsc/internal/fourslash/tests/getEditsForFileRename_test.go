package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestGetEditsForFileRename(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /a.ts
/// <reference path="./src/old.ts" />
import old from "./src/old";
// @Filename: /src/a.ts
/// <reference path="./old.ts" />
import old from "./old";
// @Filename: /src/foo/a.ts
/// <reference path="../old.ts" />
import old from "../old";
// @Filename: /unrelated.ts
import { x } from "././src/./foo/./a";
// @Filename: /src/old.ts
export default 0;
// @Filename: /tsconfig.json
{ "files": ["a.ts", "src/a.ts", "src/foo/a.ts", "src/old.ts"] }`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyWillRenameFilesEdits(t, "/src/old.ts", "/src/new.ts", map[string]string{
		"/a.ts": `/// <reference path="./src/new.ts" />
import old from "./src/new";`,
		"/src/a.ts": `/// <reference path="./new.ts" />
import old from "./new";`,
		"/src/foo/a.ts": `/// <reference path="../new.ts" />
import old from "../new";`,
		"/tsconfig.json": `{ "files": ["a.ts", "src/a.ts", "src/foo/a.ts", "src/new.ts"] }`,
	}, nil /*preferences*/)
}
