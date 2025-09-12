package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestJsObjectDefinePropertyRenameLocations(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowJs: true
// @checkJs: true
// @noEmit: true
// @Filename: index.js
var CircularList = (function () {
    var CircularList = function() {};
    Object.defineProperty(CircularList.prototype, "[|maxLength|]", { value: 0, writable: true });
    CircularList.prototype.push = function (value) {
        // ...
        this.[|maxLength|] + this.[|maxLength|]
    }
    return CircularList;
})()`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineRenameAtRangesWithText(t, nil /*preferences*/)
}
