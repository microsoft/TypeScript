package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestTsxQuickInfo3(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `//@Filename: file.tsx
// @jsx: preserve
// @noLib: true
interface OptionProp {
    propx: 2
}
class Opt extends React.Component<OptionProp, {}> {
    render() {
        return <div>Hello</div>;
    }
}
const obj1: OptionProp = {
    propx: 2
}
let y1 = <O/*1*/pt pro/*2*/px={2} />;
let y2 = <Opt {...ob/*3*/j1} />;
let y2 = <Opt {...obj1} pr/*4*/opx />;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "class Opt", "")
	f.VerifyQuickInfoAt(t, "2", "(property) propx: number", "")
	f.VerifyQuickInfoAt(t, "3", "const obj1: OptionProp", "")
	f.VerifyQuickInfoAt(t, "4", "(property) propx: true", "")
}
