package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGetEditsForFileRename_directory_up(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /a.ts
/// <reference path="./src/old/file.ts" />
import old from "./src/old";
import old2 from "./src/old/file";
export default 0;
// @Filename: /src/b.ts
/// <reference path="./old/file.ts" />
import old from "./old";
import old2 from "./old/file";
export default 0;
// @Filename: /src/foo/c.ts
/// <reference path="../old/file.ts" />
import old from "../old";
import old2 from "../old/file";
export default 0;
// @Filename: /src/old/index.ts
import a from "../../a";
import a2 from "../b";
import a3 from "../foo/c";
import f from "./file";
export default 0;
// @Filename: /src/old/file.ts
export default 0;
// @Filename: /tsconfig.json
{ "files": ["a.ts", "src/b.ts", "src/foo/c.ts", "src/old/index.ts", "src/old/file.ts"] }`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyWillRenameFilesEdits(t, "/src/old", "/newDir/new", map[string]string{
		"/a.ts": `/// <reference path="./newDir/new/file.ts" />
import old from "./newDir/new";
import old2 from "./newDir/new/file";
export default 0;`,
		"/src/b.ts": `/// <reference path="../newDir/new/file.ts" />
import old from "../newDir/new";
import old2 from "../newDir/new/file";
export default 0;`,
		"/src/foo/c.ts": `/// <reference path="../../newDir/new/file.ts" />
import old from "../../newDir/new";
import old2 from "../../newDir/new/file";
export default 0;`,
		"/newDir/new/index.ts": `import a from "../../a";
import a2 from "../../src/b";
import a3 from "../../src/foo/c";
import f from "./file";
export default 0;`,
		"/tsconfig.json": `{ "files": ["a.ts", "src/b.ts", "src/foo/c.ts", "newDir/new/index.ts", "newDir/new/file.ts"] }`,
	}, nil /*preferences*/)
}
