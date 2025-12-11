package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGetPreProcessedFile(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @moduleResolution: classic
// @Filename: refFile1.ts
class D { }
// @Filename: refFile2.ts
export class E {}
// @Filename: main.ts
// @ResolveReference: true
///<reference path="refFile1.ts" />
///<reference path = "/*1*/NotExistRef.ts/*2*/" />
/*3*////<reference path "invalidRefFile1.ts" />/*4*/
import ref2 = require("refFile2");
import noExistref2 = require(/*5*/"NotExistRefFile2"/*6*/);
import invalidRef1  /*7*/require/*8*/("refFile2");
import invalidRef2 = /*9*/requi/*10*/(/*10A*/"refFile2");
var obj: /*11*/C/*12*/;
var obj1: D;
var obj2: ref2.E;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToFile(t, "main.ts")
	f.VerifyNumberOfErrorsInCurrentFile(t, 7)
	f.VerifyErrorExistsBetweenMarkers(t, "1", "2")
	f.VerifyErrorExistsBetweenMarkers(t, "3", "4")
	f.VerifyErrorExistsBetweenMarkers(t, "5", "6")
	f.VerifyErrorExistsBetweenMarkers(t, "7", "8")
	f.VerifyErrorExistsBetweenMarkers(t, "9", "10")
	f.VerifyErrorExistsBetweenMarkers(t, "10", "10A")
	f.VerifyErrorExistsBetweenMarkers(t, "11", "12")
}
