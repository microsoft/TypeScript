package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionListAfterPropertyName(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: a.ts
class Test1 {
	public some /*afterPropertyName*/
}
// @Filename: b.ts
class Test2 {
	public some(/*inMethodParameter*/
}
// @Filename: c.ts
class Test3 {
	public some(a/*atMethodParameter*/
}
// @Filename: d.ts
class Test4 {
	public some(a /*afterMethodParameter*/
}
// @Filename: e.ts
class Test5 {
	public some(a /*afterMethodParameterBeforeComma*/,
}
// @Filename: f.ts
class Test6 {
	public some(a, /*afterMethodParameterComma*/
}
// @Filename: g.ts
class Test7 {
	constructor(/*inConstructorParameter*/
}
// @Filename: h.ts
class Test8 {
	constructor(public /*inConstructorParameterAfterModifier*/
}
// @Filename: i.ts
class Test9 {
	constructor(a/*atConstructorParameter*/
}
// @Filename: j.ts
class Test10 {
	constructor(public/*atConstructorParameterModifier*/
}
// @Filename: k.ts
class Test11 {
	constructor(public a/*atConstructorParameterAfterModifier*/
}
// @Filename: l.ts
class Test12 {
	constructor(a /*afterConstructorParameter*/
}
// @Filename: m.ts
class Test13 {
	constructor(a /*afterConstructorParameterBeforeComma*/,
}
// @Filename: n.ts
class Test14 {
	constructor(public a, /*afterConstructorParameterComma*/
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, []string{"afterPropertyName", "inMethodParameter", "atMethodParameter", "afterMethodParameter", "afterMethodParameterBeforeComma", "afterMethodParameterComma", "afterConstructorParameter"}, nil)
	f.VerifyCompletions(t, []string{"inConstructorParameter", "inConstructorParameterAfterModifier", "atConstructorParameter", "atConstructorParameterModifier", "atConstructorParameterAfterModifier", "afterConstructorParameterComma"}, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: CompletionConstructorParameterKeywords,
		},
	})
}
