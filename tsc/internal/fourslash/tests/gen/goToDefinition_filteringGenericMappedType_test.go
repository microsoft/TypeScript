package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToDefinition_filteringGenericMappedType(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `const obj = {
  get /*def*/id() {
    return 1;
  },
  name: "test",
};

type Omit2<T, DroppedKeys extends PropertyKey> = {
  [K in keyof T as Exclude<K, DroppedKeys>]: T[K];
};

declare function omit2<O, Mask extends { [K in keyof O]?: true }>(
  obj: O,
  mask: Mask
): Omit2<O, keyof Mask>;

const obj2 = omit2(obj, {
  name: true,
});

obj2.[|/*ref*/id|];`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineGoToDefinition(t, "ref")
}
