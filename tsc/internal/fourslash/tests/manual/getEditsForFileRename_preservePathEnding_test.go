package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGetEditsForFileRename_preservePathEnding(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowJs: true
// @checkJs: true
// @strict: true
// @jsx: preserve
// @resolveJsonModule: true
// @Filename: /index.js
export const x = 0;
// @Filename: /jsx.jsx
export const y = 0;
// @Filename: /j.jonah.json
{ "j": 0 }
// @Filename: /a.js
import { x as x0 } from ".";
import { x as x1 } from "./index";
import { x as x2 } from "./index.js";
import { y } from "./jsx.jsx";
import { j } from "./j.jonah.json";`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyNoErrors(t)
	f.VerifyWillRenameFilesEdits(t, "/a.js", "/b.js", map[string]string{}, nil /*preferences*/)
	f.VerifyWillRenameFilesEdits(t, "/b.js", "/src/b.js", map[string]string{
		"/src/b.js": `import { x as x0 } from "..";
import { x as x1 } from "../index";
import { x as x2 } from "../index.js";
import { y } from "../jsx.jsx";
import { j } from "../j.jonah.json";`,
	}, nil /*preferences*/)
}
