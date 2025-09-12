package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestTsxCompletionInFunctionExpressionOfChildrenCallback(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `//@module: commonjs
//@jsx: preserve
// @Filename: 1.tsx
declare module JSX {
    interface Element { }
    interface IntrinsicElements {
    }
    interface ElementAttributesProperty { props; }
}
interface IUser {
    Name: string;
}
interface IFetchUserProps {
    children: (user: IUser) => any;
}
function FetchUser(props: IFetchUserProps) { return undefined; }
function UserName() {
    return (
        <FetchUser>
            { user => (
                <h1>{ user./**/ }</h1>
            )}
        </FetchUser>
    );
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, "", nil)
}
