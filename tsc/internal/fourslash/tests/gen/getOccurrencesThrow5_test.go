package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGetOccurrencesThrow5(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `function f(a: number) {
    try {
        throw "Hello";

        try {
            throw 10;
        }
        catch (x) {
            return 100;
        }
        finally {
            throw 10;
        }
    }
    catch (x) {
        throw "Something";
    }
    finally {
        throw "Also something";
    }
    if (a > 0) {
        return (function () {
            return;
            return;
            return;

            if (false) {
                return true;
            }
            throw "Hello!";
        })() || true;
    }

    throw 10;

    var unusued = [1, 2, 3, 4].map(x => { [|thr/**/ow|] 4 })

    return;
    return true;
    throw false;
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineDocumentHighlights(t, nil /*preferences*/, ToAny(f.Ranges())...)
}
