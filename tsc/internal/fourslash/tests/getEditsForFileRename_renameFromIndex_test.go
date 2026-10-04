package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestGetEditsForFileRename_renameFromIndex(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /a.ts
/// <reference path="./src/index.ts" />
import old from "./src";
import old2 from "./src/index";
// @Filename: /src/a.ts
/// <reference path="./index.ts" />
import old from ".";
import old2 from "./index";
// @Filename: /src/foo/a.ts
/// <reference path="../index.ts" />
import old from "..";
import old2 from "../index";
// @Filename: /src/index.ts

// @Filename: /tsconfig.json
{ "files": ["a.ts", "src/a.ts", "src/foo/a.ts", "src/index.ts"] }`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyWillRenameFilesEdits(t, "/src/index.ts", "/src/new.ts", map[string]string{
		"/a.ts": `/// <reference path="./src/new.ts" />
import old from "./src/new";
import old2 from "./src/new";`,
		"/src/a.ts": `/// <reference path="./new.ts" />
import old from "./new";
import old2 from "./new";`,
		"/src/foo/a.ts": `/// <reference path="../new.ts" />
import old from "../new";
import old2 from "../new";`,
		"/tsconfig.json": `{ "files": ["a.ts", "src/a.ts", "src/foo/a.ts", "src/new.ts"] }`,
	}, nil /*preferences*/)
}
