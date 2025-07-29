package fourslash_test

import (
	"strings"
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionListInUnclosedTypeArguments(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `let x = 10;
type Type = void;
declare function f<T>(): void;
declare function f2<T, U>(): void;
f</*1a*/T/*2a*/y/*3a*/
f</*1b*/T/*2b*/y/*3b*/;
f</*1c*/T/*2c*/y/*3c*/>
f</*1d*/T/*2d*/y/*3d*/>
f</*1e*/T/*2e*/y/*3e*/>();

f2</*1k*/T/*2k*/y/*3k*/,
f2</*1l*/T/*2l*/y/*3l*/,{| "newId": true |}T{| "newId": true |}y{| "newId": true |}
f2</*1m*/T/*2m*/y/*3m*/,{| "newId": true |}T{| "newId": true |}y{| "newId": true |};
f2</*1n*/T/*2n*/y/*3n*/,{| "newId": false |}T{| "newId": false |}y{| "newId": false |}>
f2</*1o*/T/*2o*/y/*3o*/,{| "newId": false |}T{| "newId": false |}y{| "newId": false |}>
f2</*1p*/T/*2p*/y/*3p*/,{| "newId": true, "typeOnly": true |}T{| "newId": true, "typeOnly": true |}y{| "newId": true, "typeOnly": true |}>();

f2<typeof /*1uValueOnly*/x, {| "newId": true |}T{| "newId": true |}y{| "newId": true |}

f2</*1x*/T/*2x*/y/*3x*/, () =>/*4x*/T/*5x*/y/*6x*/
f2<() =>/*1y*/T/*2y*/y/*3y*/, () =>/*4y*/T/*5y*/y/*6y*/
f2<any, () =>/*1z*/T/*2z*/y/*3z*/`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToEachMarker(t, nil, func(marker *fourslash.Marker, index int) {
		markerName := marker.Name
		valueOnly := markerName != nil && strings.HasSuffix(*markerName, "ValueOnly")
		commitCharacters := &DefaultCommitCharacters
		if marker.Data != nil {
			newId := marker.Data["newId"]
			typeOnly := marker.Data["typeOnly"]
			if newId != nil && newId.(bool) && !(typeOnly != nil && typeOnly.(bool)) {
				commitCharacters = &[]string{".", ";"}
			}
		}
		var includes []fourslash.CompletionsExpectedItem
		var excludes []string
		if valueOnly {
			includes = []fourslash.CompletionsExpectedItem{
				"x",
			}
			excludes = []string{
				"Type",
			}
		} else {
			includes = []fourslash.CompletionsExpectedItem{
				"Type",
			}
			excludes = []string{
				"x",
			}
		}
		f.VerifyCompletions(t, marker, &fourslash.CompletionsExpectedList{
			IsIncomplete: false,
			ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
				CommitCharacters: commitCharacters,
				EditRange:        Ignored,
			},
			Items: &fourslash.CompletionsExpectedItems{
				Includes: includes,
				Excludes: excludes,
			},
		})
	})
}
