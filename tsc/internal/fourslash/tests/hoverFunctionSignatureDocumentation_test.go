package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestHoverFunctionSignatureDocumentation(t *testing.T) {
	t.Parallel()
	for _, test := range []struct {
		name        string
		declaration string
	}{
		{name: "declaration", declaration: "function func() {}"},
		{name: "arrow", declaration: "const func = () => {};"},
		{name: "expression", declaration: "const func = function () {};"},
	} {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()
			defer testutil.RecoverAndFail(t, "Panic on fourslash test")
			content := "/** doc */\n" + test.declaration + `
const obj = { func };
obj./*reference*/func;
obj./*call*/func();
const alias = func;
/*alias*/alias();`
			f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
			defer done()

			f.VerifyQuickInfoAt(t, "reference", "(property) func: () => void", "")
			f.VerifyQuickInfoAt(t, "call", "(property) func: () => void", "doc")
			f.VerifyQuickInfoAt(t, "alias", "const alias: () => void", "doc")
		})
	}
}

func TestHoverFunctionSignatureDocumentationDirectAssignment(t *testing.T) {
	t.Parallel()
	for _, test := range []struct {
		name          string
		content       string
		display       string
		documentation string
	}{
		{
			name: "variable",
			content: `/** declaration doc */
const func = /** initializer doc */ () => {};
/*call*/func();`,
			display:       "const func: () => void",
			documentation: "declaration doc",
		},
		{
			name: "property",
			content: `const obj = {
    /** declaration doc */
    func: /** initializer doc */ () => {},
};
obj./*call*/func();`,
			display:       "(property) func: () => void",
			documentation: "declaration doc",
		},
		{
			name: "variableParenthesizedArrow",
			content: `/** declaration doc */
const func = (/** initializer doc */ () => {});
/*call*/func();`,
			display:       "const func: () => void",
			documentation: "declaration doc",
		},
		{
			name: "variableParenthesizedFunctionExpression",
			content: `/** declaration doc */
const func = (/** initializer doc */ function () {});
/*call*/func();`,
			display:       "const func: () => void",
			documentation: "declaration doc",
		},
		{
			name: "variableSatisfiesArrow",
			content: `/** declaration doc */
const func = (/** initializer doc */ () => {}) satisfies () => void;
/*call*/func();`,
			display:       "const func: () => void",
			documentation: "declaration doc",
		},
		{
			name: "propertyParenthesizedArrow",
			content: `const obj = {
    /** declaration doc */
    func: (/** initializer doc */ () => {}),
};
obj./*call*/func();`,
			display:       "(property) func: () => void",
			documentation: "declaration doc",
		},
		{
			name: "alias",
			content: `/** declaration doc */
const func = /** initializer doc */ () => {};
const alias = func;
/*call*/alias();`,
			display:       "const alias: () => void",
			documentation: "declaration doc",
		},
		{
			name: "shorthandProperty",
			content: `/** declaration doc */
const func = /** initializer doc */ () => {};
const obj = { func };
obj./*call*/func();`,
			display:       "(property) func: () => void",
			documentation: "declaration doc",
		},
		{
			name: "variableInitializerOnly",
			content: `const func = /** initializer doc */ () => {};
/*call*/func();`,
			display:       "const func: () => void",
			documentation: "initializer doc",
		},
		{
			name: "propertyInitializerOnly",
			content: `const obj = {
    func: /** initializer doc */ () => {},
};
obj./*call*/func();`,
			display:       "(property) func: () => void",
			documentation: "initializer doc",
		},
		{
			name: "variableFunctionExpressionInitializerOnly",
			content: `const func = /** initializer doc */ function () {};
/*call*/func();`,
			display:       "const func: () => void",
			documentation: "initializer doc",
		},
		{
			name: "propertyFunctionExpressionInitializerOnly",
			content: `const obj = {
    func: /** initializer doc */ function () {},
};
obj./*call*/func();`,
			display:       "(property) func: () => void",
			documentation: "initializer doc",
		},
		{
			name: "variableParenthesizedArrowInitializerOnly",
			content: `const func = (/** initializer doc */ () => {});
/*call*/func();`,
			display:       "const func: () => void",
			documentation: "initializer doc",
		},
		{
			name: "emptyDeclarationDocumentation",
			content: `/** */
const func = /** initializer doc */ () => {};
/*call*/func();`,
			display:       "const func: () => void",
			documentation: "initializer doc",
		},
	} {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()
			defer testutil.RecoverAndFail(t, "Panic on fourslash test")
			f, done := fourslash.NewFourslash(t, nil /*capabilities*/, test.content)
			defer done()

			f.VerifyQuickInfoAt(t, "call", test.display, test.documentation)
		})
	}
}

func TestHoverFunctionSignatureDocumentationPrecedence(t *testing.T) {
	t.Parallel()
	for _, test := range []struct {
		name        string
		functionDoc string
		expectedDoc string
	}{
		{name: "signature", functionDoc: "/** function doc */", expectedDoc: "function doc"},
		{name: "propertyFallback", expectedDoc: "property doc"},
	} {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()
			defer testutil.RecoverAndFail(t, "Panic on fourslash test")
			content := test.functionDoc + `
function func() {}
const obj = {
    /** property doc */
    func,
};
obj./*reference*/func;
obj./*call*/func();`
			f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
			defer done()

			f.VerifyQuickInfoAt(t, "reference", "(property) func: () => void", "property doc")
			f.VerifyQuickInfoAt(t, "call", "(property) func: () => void", test.expectedDoc)
		})
	}
}

func TestHoverFunctionSignatureDocumentationOverloads(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `/** number doc */
function func(value: number): number;
/** string doc */
function func(value: string): string;
function func(value: number | string) { return value; }
const obj = { func };
obj./*number*/func(1);
obj./*string*/func("hello");`

	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()

	f.VerifyQuickInfoAt(t, "number", "(property) func: (value: number) => number", "number doc")
	f.VerifyQuickInfoAt(t, "string", "(property) func: (value: string) => string", "string doc")
}
