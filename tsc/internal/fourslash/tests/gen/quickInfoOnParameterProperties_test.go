package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoOnParameterProperties(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface IFoo {
  /** this is the name of blabla 
   *  - use blabla 
   *  @example blabla
   */
  name?: string;
}

// test1 should work
class Foo implements IFoo {
  //public name: string = '';
  constructor(
    public na/*1*/me: string, // documentation should leech and work ! 
  ) {
  }
}

// test2 work
class Foo2 implements IFoo {
  public na/*2*/me: string = ''; // documentation leeched and work ! 
  constructor(
    //public name: string,
  ) {
  }
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineHover(t)
}
