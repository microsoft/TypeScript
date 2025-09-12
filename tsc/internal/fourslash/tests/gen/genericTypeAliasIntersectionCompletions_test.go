package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGenericTypeAliasIntersectionCompletions(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `type MixinCtor<A, B> = new () => A & B & { constructor: MixinCtor<A, B> };
function merge<A, B>(a: { prototype: A }, b: { prototype: B }): MixinCtor<A, B> {
  let merged = function() { }
  Object.assign(merged.prototype, a.prototype, b.prototype);
  return <MixinCtor<A, B>><any>merged;
}

class TreeNode {
  value: any;
}

abstract class LeftSideNode extends TreeNode {
  abstract right(): TreeNode;
  left(): TreeNode {
    return null;
  }
}

abstract class RightSideNode extends TreeNode {
  abstract left(): TreeNode;
  right(): TreeNode {
    return null;
  };
}

var obj = new (merge(LeftSideNode, RightSideNode))();
obj./**/`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Unsorted: []fourslash.CompletionsExpectedItem{
				"right",
				"left",
				"value",
				"constructor",
			},
		},
	})
}
