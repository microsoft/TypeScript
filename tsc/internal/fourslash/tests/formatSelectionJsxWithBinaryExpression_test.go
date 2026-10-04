package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestFormatSelectionJsxWithBinaryExpression(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `//@Filename: file.tsx
function TestWidget() {
    const test = true;
    return (
        <div>
            {test &&
                <div>
 /*1*/                <div>some text</div>/*2*/
                    <div>some text</div>
                    <div>some text</div>
                </div>
            }
            <div>some text</div>
        </div>
    );
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.FormatSelection(t, "1", "2")
	f.VerifyCurrentFileContent(t, `function TestWidget() {
    const test = true;
    return (
        <div>
            {test &&
                <div>
                    <div>some text</div>
                    <div>some text</div>
                    <div>some text</div>
                </div>
            }
            <div>some text</div>
        </div>
    );
}`)
}
