package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestGoToDefinitionGetterReturningCallableInterface(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /home/src/workspaces/project/type.d.ts
export interface DidChangeContentEvent {
    (): void;
}

export declare class TextDocuments {
    get onDidChangeContent(): DidChangeContentEvent;
}

// @Filename: /home/src/workspaces/project/index.ts
import { TextDocuments } from "./type";

declare const documents: TextDocuments | undefined;

documents!./*usage*/onDidChangeContent()`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToDefinition(t, false /*includeOriginalSelectionRange*/, "usage")
}
