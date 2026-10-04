package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestFormatDocumentWithTrivia(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `  
// 1 below   
    
// 2 above   
    
let x;
  
// abc
  
let y;
  
// 3 above
   
while (true) {
    while (true) {
    }
      
    // 4 above   
}
  
// 5 above  
   
   `
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.FormatDocument(t, "")
	f.VerifyCurrentFileContent(t, `
// 1 below   

// 2 above   

let x;

// abc

let y;

// 3 above

while (true) {
    while (true) {
    }

    // 4 above   
}

// 5 above  

`)
}
