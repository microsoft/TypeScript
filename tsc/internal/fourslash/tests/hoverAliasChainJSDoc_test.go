package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	. "github.com/microsoft/TypeScript/tsc/internal/fourslash/tests/util"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestHoverAliasChainJSDoc(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /lib.ts
/**
 * Doc on impl
 */
export function foo() {}
// @Filename: /main.ts
import * as lib from "./lib.js";

/**
 * Doc on export import alias
 */
export import bar = lib.foo
// @Filename: /use.ts
import {
    /**
     * Doc on import alias
     */
    /*specifier*/bar
} from "./main.js"

/*call*/bar()
/*reference*/bar`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	const documentation = "Doc on import alias\nDoc on export import alias\nDoc on impl"
	f.VerifyQuickInfoAt(t, "call", "(alias) function foo(): void", documentation)
	f.VerifyQuickInfoAt(t, "reference", "(alias) function foo(): void", documentation)
	f.VerifyQuickInfoAt(t, "specifier", "(alias) function foo(): void", documentation)
}

func TestHoverAliasChainJSDocShapes(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /lib.ts
/**
 * Doc on impl
 */
export function foo() {}
// @Filename: /main.ts
import * as lib from "./lib.js";

/**
 * Doc on export import alias
 */
export import bar = lib.foo
// @Filename: /namespaceImport.ts
import * as m from "./main.js";
m./*namespaceImportCall*/bar();
m./*namespaceImport*/bar;
// @Filename: /uncommentedReexport.ts
export { foo } from "./lib.js";
// @Filename: /middleHop.ts
import {
    /** Doc on import alias */
    foo
} from "./uncommentedReexport.js";
/*middleHopCall*/foo();
/*middleHop*/foo;
// @Filename: /impl.ts
/** on impl */
export function f() {}
/** on impl */
export default function d() {}
// @Filename: /reexport.ts
export { /** on re-export */ f as g } from "./impl.js";
// @Filename: /useReexport.ts
import { g } from "./reexport.js";
/*reexportCall*/g();
/*reexport*/g;
// @Filename: /useDefault.ts
/** before import */
import d from "./impl.js";
/*defaultImportCall*/d();
/*defaultImport*/d;
// @Filename: /namespaces.ts
declare namespace a {
    /** on the declaration */
    export function fn(): void;
    /** on the declaration */
    export interface S {}
    /** Same */
    export function same(): void;
    /** on the declaration */
    export function tagged(): void;
}
declare namespace b {
    /** on the alias */
    export import fn = a.fn;
    export namespace S {}
    /** on the alias */
    export import S = a.S;
    /** Same */
    export import same = a.same;
    /** @deprecated on the alias */
    export import tagged = a.tagged;
}
b./*importEqualsCall*/fn();
b./*importEquals*/fn;
let s: b./*merged*/S;
b./*sameTextCall*/same();
b./*sameText*/same;
b./*tagOnlyCall*/tagged();
b./*tagOnly*/tagged;
// @Filename: /useDeprecated.ts
import { /** @deprecated */ dep } from "./deprecated.js";
[|dep|];
// @Filename: /deprecated.ts
export function dep() {}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineHover(t)
	f.VerifyCompletions(t, "importEquals", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "fn",
					Detail: new("(alias) function a.fn(): void"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "on the alias\non the declaration",
						},
					},
				},
			},
		},
	})
	f.GoToFile(t, "/useDeprecated.ts")
	f.VerifySuggestionDiagnostics(t, []*lsproto.Diagnostic{
		{
			Code:    &lsproto.IntegerOrString{Integer: new(int32(6385))},
			Message: lsproto.StringOrMarkupContent{String: new("'dep' is deprecated.")},
			Tags:    &[]lsproto.DiagnosticTag{lsproto.DiagnosticTagDeprecated},
			Range:   f.Ranges()[0].LSRange,
		},
	})
}
