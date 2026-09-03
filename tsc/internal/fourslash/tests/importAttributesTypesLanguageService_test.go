package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	. "github.com/microsoft/TypeScript/tsc/internal/fourslash/tests/util"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCompletionsPatternAmbientModuleWithImportAttributes(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /tsconfig.json
{ "compilerOptions": { "module": "preserve", "moduleResolution": "bundler" } }

// @Filename: /types.d.ts
declare const outerAttributeName: unique symbol;
type OuterAttributeValue = "css";

declare module "*.asset" with { /*attributeName*/type: /*attributeValue*/"css" } {
	export interface CssAttributeValue {}
    export const shared: "css";
    export const cssOnly: "css-only";
}
declare module "*.asset" with { type: "text" } {
	export interface TextAttributeValue {}
    export const shared: "text";
    export const textOnly: "text-only";
}

// @Filename: /index.ts
import * as css from "./style.asset" with { type: "css" };
import * as text from "./copy.asset" with { type: "text" };
css./*css*/cssOnly;
text./*text*/textOnly;`

	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCompletions(t, "attributeName", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{"outerAttributeName"},
			Excludes: []string{"CssAttributeValue", "cssOnly", "shared"},
		},
	})
	f.VerifyCompletions(t, "attributeValue", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{"OuterAttributeValue"},
			Excludes: []string{"CssAttributeValue", "TextAttributeValue"},
		},
	})
	f.VerifyCompletions(t, "css", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{"cssOnly", "shared"},
			Excludes: []string{"textOnly"},
		},
	})
	f.VerifyCompletions(t, "text", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{"shared", "textOnly"},
			Excludes: []string{"cssOnly"},
		},
	})
}

func TestPatternAmbientModuleWithImportAttributesLanguageService(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /tsconfig.json
{ "compilerOptions": { "module": "preserve", "moduleResolution": "bundler" } }

// @Filename: /types.d.ts
declare module "*.asset" with { type: "css" } {
    export interface CssPayload { kind: "css" }
    export const shared: CssPayload;
}
declare module "*.asset" with { type: "text" } {
    export interface TextPayload { kind: "text" }
    export const shared: TextPayload;
}

// @Filename: /index.ts
import * as css from /*cssModule*/"./style.asset" with { type: "css" };
import * as text from /*textModule*/"./copy.asset" with { type: "text" };
css./*cssUse*/shared;
text./*textUse*/shared;`

	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyNoErrors(t)
	f.VerifyBaselineHover(t)
	f.VerifyBaselineGoToDefinition(t, true, "cssModule", "textModule", "cssUse", "textUse")
	f.VerifyBaselineGoToTypeDefinition(t, "cssUse", "textUse")
	f.VerifyBaselineFindAllReferences(t, "cssUse", "textUse")
	f.VerifyBaselineRename(t, nil /*preferences*/, "cssUse", "textUse")
	f.VerifyBaselineDocumentHighlights(t, nil /*preferences*/, "cssUse", "textUse")
}
