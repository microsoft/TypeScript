package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestExternalModuleIntellisense(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: externalModuleIntellisense_file0.ts
export = express;
function express(): express.ExpressServer;
module express {
    export interface ExpressServer {
        enable(name: string): ExpressServer;
        post(path: RegExp, handler: (req: Function) => void): void;
    }
    export class ExpressServerRequest {
    }
}
// @Filename: externalModuleIntellisense_file1.ts
///<reference path='externalModuleIntellisense_file0.ts'/>
import express = require('./externalModuleIntellisense_file0');
var x = express();/*1*/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "1")
	f.VerifyNumberOfErrorsInCurrentFile(t, 0)
	f.GoToEOF(t)
	f.Insert(t, "x.")
	f.VerifyCompletions(t, nil, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				"enable",
				"post",
			},
		},
	})
}
