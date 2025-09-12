package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestTsxGoToDefinitionStatelessFunction2(t *testing.T) {
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
interface ClickableProps {
    children?: string;
    className?: string;
}
interface ButtonProps extends ClickableProps {
    onClick(event?: React.MouseEvent<HTMLButtonElement>): void;
}
interface LinkProps extends ClickableProps {
    goTo: string;
}
declare function /*firstSource*/MainButton(buttonProps: ButtonProps): JSX.Element;
declare function /*secondSource*/MainButton(linkProps: LinkProps): JSX.Element;
declare function /*thirdSource*/MainButton(props: ButtonProps | LinkProps): JSX.Element;
let opt = <[|Main/*firstTarget*/Button|] />;
let opt = <[|Main/*secondTarget*/Button|] children="chidlren" />;
let opt = <[|Main/*thirdTarget*/Button|] onClick={()=>{}} />;
let opt = <[|Main/*fourthTarget*/Button|] onClick={()=>{}} ignore-prop />;
let opt = <[|Main/*fifthTarget*/Button|] goTo="goTo" />;
let opt = <[|Main/*sixthTarget*/Button|] wrong />;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineGoToDefinition(t, "firstTarget", "secondTarget", "thirdTarget", "fourthTarget", "fifthTarget", "sixthTarget")
}
