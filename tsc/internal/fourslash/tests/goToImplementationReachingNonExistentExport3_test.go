package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToImplementationReachingNonExistentExport3(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
// @allowJs: true
// @checkJs: true

// @Filename: /github.js
export { transformRecordedData };

// @Filename: /gitGateway.js
import { transformRecordedData as transformGitHub } from './github';

const methods = { github: {
    transformData: /*impl*/transformGitHub,
}};
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToImplementation(t, "impl")
}
