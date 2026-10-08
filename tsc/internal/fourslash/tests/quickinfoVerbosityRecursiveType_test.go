package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestQuickinfoVerbosityRecursiveType(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @lib: es5
type Node/*N*/<T> = {
    value: T;
    left: Node<T> | undefined;
    right: Node<T> | undefined;
}
const n/*n*/: Node<number> = {
    value: 1,
    left: undefined,
    right: undefined,
}
interface Orange {
    name: string;
}
type TreeNode/*t*/<T> = {
    value: T;
    left: TreeNode<T> | undefined;
    right: TreeNode<T> | undefined;
    orange?: Orange;
}
const m/*m*/: TreeNode<number> = {
    value: 1,
    left: undefined,
    right: undefined,
    orange: { name: "orange" },
}
type Wrapped/*wrapped*/<T> = ({ value: T; next: Wrapped<T> });
declare const wrappedValue/*wrappedValue*/: Wrapped<string>;
type Callable/*callable*/<T> = { (value: T): Callable<T>; link: Wrapped<T> };
declare const callableValue/*callableValue*/: Callable<number>;
const recur/*recur*/ = () => recur;
type RecursiveArray/*recursiveArray*/ = RecursiveArray[];
type RecursiveTuple/*recursiveTuple*/ = [RecursiveTuple?];
type RecursiveUnion/*recursiveUnion*/ = { next: RecursiveUnion } | undefined;
declare const aliasOwner/*aliasOwner*/: Wrapped<string>;
const siblingOwners/*siblingOwners*/ = { first: aliasOwner, second: aliasOwner };
function local() {
    const object/*localObject*/ = { next: () => object };
    const broad: unknown = function self/*localSelf*/() { return self; };
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineHoverWithVerbosity(t, map[string][]int{
		"N": {0}, "n": {0, 1}, "t": {0, 1}, "m": {0, 1, 2},
		"wrapped": {0, 1, 2}, "wrappedValue": {0, 1, 2},
		"callable": {0, 1, 2}, "callableValue": {0, 1, 2},
		"recur": {0, 1, 2}, "localObject": {0, 1, 2}, "localSelf": {0, 1, 2},
		"recursiveArray": {0, 1, 2}, "recursiveTuple": {0, 1, 2}, "recursiveUnion": {0, 1, 2},
		"aliasOwner": {0, 1, 2}, "siblingOwners": {0, 1, 2},
	})
}
