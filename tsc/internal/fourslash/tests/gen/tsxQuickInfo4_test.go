package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestTsxQuickInfo4(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `//@Filename: file.tsx
// @jsx: preserve
// @noLib: true
export interface ClickableProps {
    children?: string;
    className?: string;
}
export interface ButtonProps extends ClickableProps {
    onClick(event?: React.MouseEvent<HTMLButtonElement>): void;
}
export interface LinkProps extends ClickableProps {
    to: string;
}
export function MainButton(buttonProps: ButtonProps): JSX.Element;
export function MainButton(linkProps: LinkProps): JSX.Element;
export function MainButton(props: ButtonProps | LinkProps): JSX.Element {
    const linkProps = props as LinkProps;
    if(linkProps.to) {
        return this._buildMainLink(props);
    }
    return this._buildMainButton(props);
}
function _buildMainButton({ onClick, children, className }: ButtonProps): JSX.Element {
    return(<button className={className} onClick={onClick}>{ children || 'MAIN BUTTON'}</button>);
}
declare function buildMainLink({ to, children, className }: LinkProps): JSX.Element;
function buildSomeElement1(): JSX.Element {
    return (
        <MainB/*1*/utton t/*2*/o='/some/path'>GO</MainButton>
    );
}
function buildSomeElement2(): JSX.Element {
    return (
        <MainB/*3*/utton onC/*4*/lick={()=>{}}>GO</MainButton>;
    );
}
let componenet = <MainButton onClick={()=>{}} ext/*5*/ra-prop>GO</MainButton>;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "function MainButton(linkProps: LinkProps): JSX.Element (+1 overload)", "")
	f.VerifyQuickInfoAt(t, "2", "(property) LinkProps.to: string", "")
	f.VerifyQuickInfoAt(t, "3", "function MainButton(buttonProps: ButtonProps): JSX.Element (+1 overload)", "")
	f.VerifyQuickInfoAt(t, "4", "(method) ButtonProps.onClick(event?: React.MouseEvent<HTMLButtonElement>): void", "")
	f.VerifyQuickInfoAt(t, "5", "(property) extra-prop: true", "")
}
