package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestGetEditsForFileRename_escapedSpecifier(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = "// @Filename: /tsconfig.json\n" +
		"{ \"files\": [\"application/app.ts\", \"libraries/old/a';process.exit(7);'\\\"`${b}.d.ts\"] }\n" +
		"// @Filename: /libraries/old/a';process.exit(7);'\"`${b}.d.ts\n" +
		"export declare const X: number;\n" +
		"// @Filename: /application/app.ts\n" +
		"import { X } from '../libraries/old/a\\';process.exit(7);\\'\"`${b}';\n" +
		"import { X as Y } from \"../libraries/old/a';process.exit(7);'\\\"`${b}\";\n" +
		"const Z = import(`../libraries/old/a';process.exit(7);'\"\\`\\${b}`);\n"
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyWillRenameFilesEdits(t, "/libraries/old", "/libraries/new", map[string]string{
		"/application/app.ts": "import { X } from '../libraries/new/a\\';process.exit(7);\\'\"`${b}';\n" +
			"import { X as Y } from \"../libraries/new/a';process.exit(7);'\\\"`${b}\";\n" +
			"const Z = import(`../libraries/new/a';process.exit(7);'\"\\`\\${b}`);\n",
		"/tsconfig.json": "{ \"files\": [\"application/app.ts\", \"libraries/new/a';process.exit(7);'\\\"`${b}.d.ts\"] }",
	}, nil /*preferences*/)
}

func TestGetEditsForFileRename_escapedNewDirectoryName(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /tsconfig.json
{ "files": ["a.ts", "old/b.ts"] }
// @Filename: /a.ts
/// <reference path="./old/b.ts" />
/// <reference path='./old/b.ts' />
import b1 from "./old/b";
import b2 from './old/b';
export default 0;
// @Filename: /old/b.ts
export default 0;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyWillRenameFilesEdits(t, "/old", "/n'e\"w", map[string]string{
		"/a.ts": `/// <reference path="./old/b.ts" />
/// <reference path='./old/b.ts' />
import b1 from "./n'e\"w/b";
import b2 from './n\'e"w/b';
export default 0;`,
		"/tsconfig.json": `{ "files": ["a.ts", "n'e\"w/b.ts"] }`,
	}, nil /*preferences*/)
}

func TestGetEditsForFileRename_jsDocCommentTerminator(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /tsconfig.json
{ "compilerOptions": { "allowJs": true, "checkJs": true } }
// @Filename: /pkg*/a.js
export class Foo {}
// @Filename: /src/index.js
/** @type {import("../pkg*\/a.js").Foo} */
const x = null;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyWillRenameFilesEdits(t, "/src/index.js", "/src/sub/index.js", map[string]string{
		"/src/sub/index.js": `/** @type {import("../../pkg*/a.js").Foo} */
const x = null;`,
	}, nil /*preferences*/)
}
