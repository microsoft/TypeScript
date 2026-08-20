package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestFormatSimulatingScriptBlocks(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `/* BEGIN EXTERNAL SOURCE */
/*begin5*/
                        var a = 1;
                        alert("/*end5*//********//*begin4*/");
                    /*end4*/
/* END EXTERNAL SOURCE */

/* BEGIN EXTERNAL SOURCE */
/*begin3*/
                            var b = 1;

                        var c = "/*end3*//********//*begin2*/";
       var d = 1;

            var e = "/*end2*//********//*begin1*/";
            var f = 1;
        /*end1*/
/* END EXTERNAL SOURCE */`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	opts640 := f.GetOptions()
	opts640.FormatCodeSettings.BaseIndentSize = 12
	f.Configure(t, opts640)
	f.FormatSelection(t, "begin1", "end1")
	f.FormatSelection(t, "begin2", "end2")
	f.FormatSelection(t, "begin3", "end3")
	opts794 := f.GetOptions()
	opts794.FormatCodeSettings.BaseIndentSize = 24
	f.Configure(t, opts794)
	f.FormatSelection(t, "begin4", "end4")
	f.FormatSelection(t, "begin5", "end5")
	f.VerifyCurrentFileContent(t, `/* BEGIN EXTERNAL SOURCE */

                        var a = 1;
                        alert("/********/");

/* END EXTERNAL SOURCE */

/* BEGIN EXTERNAL SOURCE */

            var b = 1;

            var c = "/********/";
            var d = 1;

            var e = "/********/";
            var f = 1;

/* END EXTERNAL SOURCE */`)
}
