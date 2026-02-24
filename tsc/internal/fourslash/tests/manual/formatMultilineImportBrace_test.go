package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

// The formatter should move the closing brace of a multiline import to its own line.
func TestFormatMultilineImportBrace(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `import {
	basename,
	extname, joinPath } from '../base/resources.js';
import { URI } from '../base/uri.js';`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.FormatDocument(t, "")
	f.VerifyCurrentFileContent(t, `import {
    basename,
    extname, joinPath
} from '../base/resources.js';
import { URI } from '../base/uri.js';`)
}
