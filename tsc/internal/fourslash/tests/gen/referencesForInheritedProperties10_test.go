package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestReferencesForInheritedProperties10(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface IFeedbackHandler {
  /*1*/handleAccept?(): void;
  handleReject?(): void;
}

abstract class AbstractFeedbackHandler implements IFeedbackHandler {}

class FeedbackHandler extends AbstractFeedbackHandler {
  /*2*/handleAccept(): void {
    console.log("Feedback accepted");
  }

  handleReject(): void {
    console.log("Feedback rejected");
  }
}

function foo(handler: IFeedbackHandler) {
  handler./*3*/handleAccept?.();
  handler.handleReject?.();
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineFindAllReferences(t, "1", "2", "3")
}
