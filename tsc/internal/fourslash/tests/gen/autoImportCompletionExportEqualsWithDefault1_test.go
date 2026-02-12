package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestAutoImportCompletionExportEqualsWithDefault1(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @strict: true
// @module: commonjs
// @esModuleInterop: false
// @allowSyntheticDefaultImports: false
// @filename: node.ts
import Container from "./container.js";
import Document from "./document.js";

declare namespace Node {
  class Node extends Node_ {}

  export { Node as default };
}

declare abstract class Node_ {
  parent: Container | Document | undefined;
}

declare class Node extends Node_ {}

export = Node;
// @filename: document.ts
import Container from "./container.js";

declare namespace Document {
  export { Document_ as default };
}

declare class Document_ extends Container {}

declare class Document extends Document_ {}

export = Document;
// @filename: container.ts
import Node from "./node.js";

declare namespace Container {
  export { Container_ as default };
}

declare abstract class Container_ extends Node {
  p/*1*/
}

declare class Container extends Container_ {}

export = Container;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCompletions(t, "1", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:               "parent",
					InsertText:          new("parent: Container_ | Document_ | undefined;"),
					FilterText:          new("parent"),
					AdditionalTextEdits: fourslash.AnyTextEdits,
					Data: &lsproto.CompletionItemData{
						Source: "ClassMemberSnippet/",
					},
				},
			},
		},
	})
	f.VerifyApplyCodeActionFromCompletion(t, new("1"), &fourslash.ApplyCodeActionFromCompletionOptions{
		Name:        "parent",
		Source:      "ClassMemberSnippet/",
		Description: "Includes imports of types referenced by 'parent'",
		NewFileContent: new(`import Document_ from "./document.js";
import Node from "./node.js";

declare namespace Container {
  export { Container_ as default };
}

declare abstract class Container_ extends Node {
  p
}

declare class Container extends Container_ {}

export = Container;`),
	})
}
