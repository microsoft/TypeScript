package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestGetEditsForFileRename_renameToIndex(t *testing.T) {
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
// @Filename: /src/old.ts

// @Filename: /tsconfig.json
{ "files": ["a.ts", "src/a.ts", "src/foo/a.ts", "src/old.ts"] }`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyWillRenameFilesEdits(t, "/src/old.ts", "/src/index.ts", map[string]string{
		"/a.ts": `/// <reference path="./src/index.ts" />
import old from "./src";`,
		"/src/a.ts": `/// <reference path="./index.ts" />
import old from ".";`,
		"/src/foo/a.ts": `/// <reference path="../index.ts" />
import old from "..";`,
		"/tsconfig.json": `{ "files": ["a.ts", "src/a.ts", "src/foo/a.ts", "src/index.ts"] }`,
	}, nil /*preferences*/)
}
