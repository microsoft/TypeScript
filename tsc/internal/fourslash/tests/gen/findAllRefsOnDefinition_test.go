package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFindAllRefsOnDefinition(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `//@Filename: findAllRefsOnDefinition-import.ts
export class Test{

    constructor(){

    }

    /*1*/public /*2*/start(){
        return this;
    }

    public stop(){
        return this;
    }
}
//@Filename: findAllRefsOnDefinition.ts
import Second = require("./findAllRefsOnDefinition-import");

var second = new Second.Test()
second./*3*/start();
second.stop();`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineFindAllReferences(t, "1", "2", "3")
}
