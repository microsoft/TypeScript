package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoJSDocAtBeforeSpace(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `/**
 * @return Don't @ me
 */
function /*f*/f() { }
/**
 * @return One final @
 */
function /*g*/g() { }
/**
 * @return An @
 * But another line
 */
function /*h*/h() { }`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineHover(t)
}
