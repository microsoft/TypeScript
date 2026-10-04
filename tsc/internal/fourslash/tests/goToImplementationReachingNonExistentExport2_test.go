package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestGoToImplementationReachingNonExistentExport2(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
// @allowJs: true
// @checkJs: true

// @Filename: /github.js
module.exports = { transformRecordedData };

// @Filename: /gitGateway.js
const { transformRecordedData: transformGitHub } = require('./github');

const methods = { github: {
    transformData: /*impl*/transformGitHub,
}};
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToImplementation(t, "impl")
}
