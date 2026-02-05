package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFunctionIndentation(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `namespace M {
export =
C;
class C {
constructor(b
) {
}
foo(a
: string) {
return a
|| true;
}
get bar(
) {
return 1;
}
}
function foo(a,
b?) {
new M.C(
"hello");
}
{
{
}
}
foo(
function() {
"hello";
});
foo(
() => {
"hello";
});
var t,
u = 1,
v;
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.FormatDocument(t, "")
	f.VerifyCurrentFileContent(t, `namespace M {
`+`    export =
`+`        C;
`+`    class C {
`+`        constructor(b
`+`        ) {
`+`        }
`+`        foo(a
`+`            : string) {
`+`            return a
`+`                || true;
`+`        }
`+`        get bar(
`+`        ) {
`+`            return 1;
`+`        }
`+`    }
`+`    function foo(a,
`+`        b?) {
`+`        new M.C(
`+`            "hello");
`+`    }
`+`    {
`+`        {
`+`        }
`+`    }
`+`    foo(
`+`        function() {
`+`            "hello";
`+`        });
`+`    foo(
`+`        () => {
`+`            "hello";
`+`        });
`+`    var t,
`+`        u = 1,
`+`        v;
`+`}`)
}
