package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionsImportDefaultExportCrash1(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: node18
// @allowJs: true
// @Filename: /node_modules/dom7/index.d.ts
export interface Dom7Array {
  length: number;
  prop(propName: string): any;
}

export interface Dom7 {
  (): Dom7Array;
  fn: any;
}

declare const Dom7: Dom7;

export {
  Dom7 as $,
};
// @Filename: /dom7.js
import * as methods from 'dom7';
Object.keys(methods).forEach((methodName) => {
  if (methodName === '$') return;
  methods.$.fn[methodName] = methods[methodName];
});

export default methods.$;
// @Filename: /swipe-back.js
import $ from './dom7.js';
/*1*/`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, "1", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label: "$",
				},
			},
		},
	})
}
