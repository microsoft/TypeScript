/// <reference path='fourslash.ts'/>

// @Filename: /mod.ts
//// export function bar() { return 10; }

// @Filename: /multilineImport.ts
//// [|import b/**/|]
//// bar();

verify.completions({
    isNewIdentifierLocation: true,
    marker: "",
    exact: [{
	name: "bar",
	source: "./mod",
	insertText: `import { bar$1 } from "./mod";`,
	isSnippet: true,
	sourceDisplay: "./mod",
    }],
    preferences: {
	includeCompletionsForImportStatements: true,
	includeInsertTextCompletions: true,
	includeCompletionsWithSnippetText: true,
    }
});
