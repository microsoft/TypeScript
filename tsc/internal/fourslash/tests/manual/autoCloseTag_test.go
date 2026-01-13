package fourslash

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestAutoCloseTag(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// Using separate files for each example to avoid unclosed JSX tags affecting other tests.
	const content = `// @noLib: true

// @Filename: /0.tsx
const x = <div>/*0*/;

// @Filename: /1.tsx
const x = <div> foo/*1*/ </div>;

// @Filename: /2.tsx
const x = <div></div>/*2*/;

// @Filename: /3.tsx
const x = <div/>/*3*/;

// @Filename: /4.tsx
const x = <div>
    <p>/*4*/
    </div>
</p>;

// @Filename: /5.tsx
const x = <div> text /*5*/;

// @Filename: /6.tsx
const x = <div>
    <div>/*6*/
</div>;

// @Filename: /7.tsx
const x = <div>
    <p>/*7*/
</div>;

// @Filename: /8.tsx
const x = <div>
    <div>/*8*/</div>
</div>;

// @Filename: /9.tsx
const x = <p>
    <div>
        <div>/*9*/
    </div>
</p>`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyJsxClosingTag(t, map[string]*string{
		"0": PtrTo("</div>"),
		"1": nil,
		"2": nil,
		"3": nil,
		"4": PtrTo("</p>"),
		"5": PtrTo("</div>"),
		"6": PtrTo("</div>"),
		"7": PtrTo("</p>"),
		"8": nil,
		"9": PtrTo("</div>"),
	})
}
