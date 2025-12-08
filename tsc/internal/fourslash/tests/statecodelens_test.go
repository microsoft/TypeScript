package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/ls/lsutil"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCodeLensAcrossProjects(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	content := `
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
		"bar.ts"
	],
}
// @Filename: /projects/container/lib/index.ts
/*impl*/
export interface Pointable {
  getX(): number;
  getY(): number;
}
export const val = 42;
// @Filename: /projects/container/lib/bar.ts
import { Pointable } from "./index";
class Point implements Pointable {
  getX(): number {
    return 0;
  }
  getY(): number {
    return 0;
  }
}
// @Filename: /projects/container/exec/tsconfig.json
{
	"files": ["./index.ts"],
	"references": [
		{ "path": "../lib" },
	],
}
// @Filename: /projects/container/exec/index.ts
import { Pointable } from "../lib";
class Point1 implements Pointable {
  getX(): number {
    return 0;
  }
  getY(): number {
    return 0;
  }
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
import { Pointable } from "../lib";
class Point2 implements Pointable {
  getX(): number {
    return 0;
  }
  getY(): number {
    return 0;
  }
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
}
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "impl")
	// Open temp file and verify all projects alive
	f.GoToMarker(t, "temp")

	// Ref projects are loaded after as part of this command
	f.VerifyBaselineCodeLens(t, &lsutil.UserPreferences{
		CodeLens: lsutil.CodeLensUserPreferences{
			ReferencesCodeLensEnabled:            true,
			ReferencesCodeLensShowOnAllFunctions: true,

			ImplementationsCodeLensEnabled:                true,
			ImplementationsCodeLensShowOnInterfaceMethods: true,
			ImplementationsCodeLensShowOnAllClassMethods:  true,
		},
	})

	// Open temp file and verify all projects alive
	f.CloseFileOfMarker(t, "temp")
	f.GoToMarker(t, "temp")

	// Close all files and open temp file, only inferred project should be alive
	f.CloseFileOfMarker(t, "impl")
	f.CloseFileOfMarker(t, "temp")
	f.GoToMarker(t, "temp")
}

func TestCodeLensOnFunctionAcrossProjects1(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
// @filename: ./a/tsconfig.json
{
  "compilerOptions": {
	"composite": true,
	"declaration": true,
	"declarationMaps": true,
	"outDir": "./dist",
	"rootDir": "src"
  },
  "include": ["./src"]
}

// @filename: ./a/src/foo.ts
export function aaa() {}
aaa();

// @filename: ./b/tsconfig.json
{
  "compilerOptions": {
	"composite": true,
	"declaration": true,
	"declarationMaps": true,
	"outDir": "./dist",
	"rootDir": "src"
  },
  "references": [{ "path": "../a" }],
  "include": ["./src"]
}

// @filename: ./b/src/bar.ts
import * as foo from '../../a/dist/foo.js';
foo.aaa();
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()

	f.VerifyBaselineCodeLens(t, &lsutil.UserPreferences{
		CodeLens: lsutil.CodeLensUserPreferences{
			ReferencesCodeLensEnabled: true,
		},
	})
}
