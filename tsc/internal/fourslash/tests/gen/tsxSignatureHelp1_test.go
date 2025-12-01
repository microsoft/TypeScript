package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestTsxSignatureHelp1(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `//@Filename: file.tsx
// @jsx: preserve
// @noLib: true
// @libFiles: react.d.ts,lib.d.ts
import React = require('react');
export interface ClickableProps {
    children?: string;
    className?: string;
}
export interface ButtonProps extends ClickableProps {
    onClick(event?: React.MouseEvent<HTMLButtonElement>): void;
}
function _buildMainButton({ onClick, children, className }: ButtonProps): JSX.Element {
    return(<button className={className} onClick={onClick}>{ children || 'MAIN BUTTON'}</button>);
}
export function MainButton(props: ButtonProps): JSX.Element {
    return this._buildMainButton(props);
}
let e1 = <MainButton/*1*/ /*2*/`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToMarker(t, "1")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "MainButton(props: ButtonProps): JSX.Element", ParameterSpan: "props: ButtonProps"})
	f.GoToMarker(t, "2")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "MainButton(props: ButtonProps): JSX.Element", ParameterSpan: "props: ButtonProps"})
}
