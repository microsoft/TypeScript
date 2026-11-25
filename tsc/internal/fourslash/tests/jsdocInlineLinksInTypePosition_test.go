package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestJsdocInlineLinksInTypePosition(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class C {}
/**
 * @throws {@link /*throwsLink*/C}
 * @returns {@linkcode /*returnsLink*/C}
 * @param value {@linkplain /*paramLink*/C}
 */
function /*inlineLinks*/f(value: C) {}

/**
 * @throws {/*throwsType*/C} description
 * @returns {/*returnsType*/C} description
 * @param {/*paramType*/C} value description
 */
function /*types*/g(value: C) { return value; }`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineHover(t)
	f.VerifyBaselineGoToDefinition(t, false, "throwsLink", "returnsLink", "paramLink", "throwsType", "returnsType", "paramType")
}
