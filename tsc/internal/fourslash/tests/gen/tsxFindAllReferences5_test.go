package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestTsxFindAllReferences5(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `//@Filename: file.tsx
// @jsx: preserve
// @noLib: true
declare module JSX {
    interface Element { }
    interface IntrinsicElements {
    }
    interface ElementAttributesProperty { props; }
}
interface OptionPropBag {
    propx: number
    propString: string
    optional?: boolean
}
/*1*/declare function /*2*/Opt(attributes: OptionPropBag): JSX.Element;
let opt = /*3*/</*4*/Opt />;
let opt1 = /*5*/</*6*/Opt propx={100} propString />;
let opt2 = /*7*/</*8*/Opt propx={100} optional/>;
let opt3 = /*9*/</*10*/Opt wrong />;
let opt4 = /*11*/</*12*/Opt propx={100} propString="hi" />;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineFindAllReferences(t, "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12")
}
