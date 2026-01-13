package fourslash

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestAutoCloseFragment(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// Using separate files for each example to avoid unclosed JSX tags affecting other tests.
	const content = `// @noLib: true
// @Filename: /0.tsx
const x = <>/*0*/;

// @Filename: /1.tsx
const x = <> foo/*1*/ </>;

// @Filename: /2.tsx
const x = <></>/*2*/;

// @Filename: /3.tsx
const x = </>/*3*/;

// @Filename: /4.tsx
const x = <div>
    <>/*4*/
    </div>
</>;

// @Filename: /5.tsx
const x = <> text /*5*/;

// @Filename: /6.tsx
const x = <>
    <>/*6*/
</>;

// @Filename: /7.tsx
const x = <div>
    <>/*7*/
</div>;

// @Filename: /8.tsx
const x = <div>
    <>/*8*/</>
</div>;

// @Filename: /9.tsx
const x = <p>
    <>
        <>/*9*/
    </>
</p>`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyJsxClosingTag(t, map[string]*string{
		"0": PtrTo("</>"),
		"1": nil,
		"2": nil,
		"3": nil,
		"4": PtrTo("</>"),
		"5": PtrTo("</>"),
		"6": PtrTo("</>"),
		"7": PtrTo("</>"),
		"8": nil,
		"9": PtrTo("</>"),
	})
}
