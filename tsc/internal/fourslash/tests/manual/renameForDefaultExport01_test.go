package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestRenameForDefaultExport01(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `[|export default class [|{| "contextRangeIndex": 0 |}DefaultExportedClass|] {
}|]
/*
 *  Commenting [|{| "inComment": true |}DefaultExportedClass|]
 */

var x: [|DefaultExportedClass|];

var y = new [|DefaultExportedClass|];`

	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	ranges := f.GetRangesByText().Get("DefaultExportedClass")

	var markerOrRanges []fourslash.MarkerOrRangeOrName
	for _, r := range ranges {
		if !(r.Marker != nil && r.Marker.Data != nil && r.Marker.Data["inComment"] == true) {
			markerOrRanges = append(markerOrRanges, r)
		}
	}

	f.VerifyBaselineRename(t, nil /*preferences*/, markerOrRanges...)
}
