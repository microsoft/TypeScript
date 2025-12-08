package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCallHierarchyAcrossProject(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
// @stateBaseline: true
// @Filename: /projects/temp/temp.ts
/*temp*/let x = 10
// @Filename: /projects/temp/tsconfig.json
{}
// @Filename: /projects/container/lib/tsconfig.json
{
	"compilerOptions": {
		"composite": true,
	},
	references: [],
	files: [
		"index.ts",
		"bar.ts",
		"baz.ts"
	],
}
// @Filename: /projects/container/lib/index.ts
export function /*call*/createModelReference() {}
// @Filename: /projects/container/lib/bar.ts
import { createModelReference } from "./index";
function openElementsAtEditor() {
  createModelReference();
}
// @Filename: /projects/container/lib/baz.ts
import { createModelReference } from "./index";
function registerDefaultLanguageCommand() {
  createModelReference();
}
// @Filename: /projects/container/exec/tsconfig.json
{
	"files": ["./index.ts"],
	"references": [
		{ "path": "../lib" },
	],
}
// @Filename: /projects/container/exec/index.ts
import { createModelReference } from "../lib";
function openElementsAtEditor1() {
  createModelReference();
}
// @Filename: /projects/container/compositeExec/tsconfig.json
{
	"compilerOptions": {
		"composite": true,
	},
	"files": ["./index.ts"],
	"references": [
		{ "path": "../lib" },
	],
}
// @Filename: /projects/container/compositeExec/index.ts
import { createModelReference } from "../lib";
function openElementsAtEditor2() {
  createModelReference();
}
// @Filename: /projects/container/tsconfig.json
{
	"files": [],
	"include": [],
	"references": [
		{ "path": "./exec" },
		{ "path": "./compositeExec" },
	],
}
// @Filename: /projects/container/tsconfig.json
{
	"files": [],
	"include": [],
	"references": [
		{ "path": "./exec" },
		{ "path": "./compositeExec" },
	],
}
// @Filename: /projects/container/tsconfig.json
{
	"files": [],
	"include": [],
	"references": [
		{ "path": "./exec" },
		{ "path": "./compositeExec" },
	],
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "call")
	// Open temp file and verify all projects alive
	f.GoToMarker(t, "temp")

	// Ref projects are loaded after as part of this command
	f.GoToMarker(t, "call")
	f.VerifyBaselineCallHierarchy(t)

	// Open temp file and verify all projects alive
	f.CloseFileOfMarker(t, "temp")
	f.GoToMarker(t, "temp")

	// Close all files and open temp file, only inferred project should be alive
	f.CloseFileOfMarker(t, "call")
	f.CloseFileOfMarker(t, "temp")
	f.GoToMarker(t, "temp")
}
