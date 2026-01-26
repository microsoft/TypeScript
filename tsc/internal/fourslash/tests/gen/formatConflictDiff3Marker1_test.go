package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFormatConflictDiff3Marker1(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class C {
<<<<<<< HEAD
v = 1;
||||||| merged common ancestors
v = 3;
=======
v = 2;
>>>>>>> Branch - a
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.FormatDocument(t, "")
	f.VerifyCurrentFileContent(t, `class C {
<<<<<<< HEAD
    v = 1;
||||||| merged common ancestors
v = 3;
=======
v = 2;
>>>>>>> Branch - a
}`)
}
