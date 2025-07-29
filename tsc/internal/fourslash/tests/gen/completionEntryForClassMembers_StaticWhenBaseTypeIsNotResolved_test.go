package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionEntryForClassMembers_StaticWhenBaseTypeIsNotResolved(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /node_modules/@types/react/index.d.ts
export = React;
export as namespace React;
declare namespace React {
    function createElement(): any;
    interface Component<P = {}, S = {}, SS = any> { }
    class Component<P, S> {
        static contextType?: any;
        context: any;
        constructor(props: Readonly<P>);
        setState<K extends keyof S>(
            state: ((prevState: Readonly<S>, props: Readonly<P>) => (Pick<S, K> | S | null)) | (Pick<S, K> | S | null),
            callback?: () => void
        ): void;
    }
}
// @Filename: /a.ts
import React from 'react'
class Slider extends React.Component {
    static defau/**/ltProps = {
        onMouseDown: () => { },
        onMouseUp: () => { },
        unit: 'px',
    }
    handleChange = () => 10;
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: CompletionClassElementKeywords,
		},
	})
}
