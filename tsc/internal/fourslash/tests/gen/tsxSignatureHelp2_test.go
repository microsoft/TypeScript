package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestTsxSignatureHelp2(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @jsx: preserve
//@Filename: file.tsx
import React = require('react');
export interface ClickableProps {
    children?: string;
    className?: string;
}
export interface ButtonProps extends ClickableProps {
    onClick(event?: React.MouseEvent<HTMLButtonElement>): void;
}
export interface LinkProps extends ClickableProps {
    goTo(where: "home" | "contact"): void;
}
function _buildMainButton({ onClick, children, className }: ButtonProps): JSX.Element {
    return(<button className={className} onClick={onClick}>{ children || 'MAIN BUTTON'}</button>);
}
export function MainButton(buttonProps: ButtonProps): JSX.Element;
export function MainButton(linkProps: LinkProps): JSX.Element;
export function MainButton(props: ButtonProps | LinkProps): JSX.Element {
    return this._buildMainButton(props);
}
let e1 = <MainButton/*1*/ /*2*/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "1")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "MainButton(buttonProps: ButtonProps): JSX.Element", ParameterSpan: "buttonProps: ButtonProps", OverloadsCount: 2})
	f.GoToMarker(t, "2")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "MainButton(buttonProps: ButtonProps): JSX.Element", ParameterSpan: "buttonProps: ButtonProps", OverloadsCount: 2})
}
