package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestReverseMappedTypeQuickInfo(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface IAction {
    type: string;
}

type Reducer<S> = (state: S, action: IAction) => S

function combineReducers<S>(reducers: { [K in keyof S]: Reducer<S[K]> }): Reducer<S> {
    const dummy = {} as S;
    return () => dummy;
}

const test_inner = (test: string, action: IAction) => {
    return 'dummy';
}
const test = combineReducers({
    test_inner
});

const test_outer = combineReducers({
    test
});

// '{test: { test_inner: any } }'
type FinalType/*1*/ = ReturnType<typeof test_outer>;

var k: FinalType;
k.test.test_inner/*2*/`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "type FinalType = {\n    test: {\n        test_inner: string;\n    };\n}", "")
	f.VerifyQuickInfoAt(t, "2", "(property) test_inner: string", "")
}
