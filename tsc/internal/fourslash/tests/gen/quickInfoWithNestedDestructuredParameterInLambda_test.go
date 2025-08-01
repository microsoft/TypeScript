package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoWithNestedDestructuredParameterInLambda(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @filename: a.tsx
import * as React from 'react';
interface SomeInterface {
    someBoolean: boolean,
    someString: string;
}
interface SomeProps {
    someProp: SomeInterface;
}
export const /*1*/SomeStatelessComponent = ({someProp: { someBoolean, someString}}: SomeProps) => (<div>{` + "`" + `${someBoolean}${someString}` + "`" + `});`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToMarker(t, "1")
	f.VerifyQuickInfoExists(t)
}
