package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestIndirectJsRequireRename(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowJs: true
// @Filename: /bin/serverless.js
require('../lib/classes/Error').log/**/Warning(` + "`" + `CLI triage crashed with: ${error.stack}` + "`" + `);
// @Filename: /lib/plugins/aws/package/compile/events/httpApi/index.js
const { logWarning } = require('../../../../../../classes/Error');
// @Filename: /lib/classes/Error.js
module.exports.logWarning = message => { };`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "")
	f.VerifyBaselineFindAllReferences(t, "")
}
