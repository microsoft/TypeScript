package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFindReferencesJSXTagName(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: index.tsx
import { /*1*/SubmissionComp } from "./RedditSubmission"
function displaySubreddit(subreddit: string) {
    let components = submissions
        .map((value, index) => <SubmissionComp key={ index } elementPosition= { index } {...value.data} />);
}
// @Filename: RedditSubmission.ts
export const /*2*/SubmissionComp = (submission: SubmissionProps) =>
    <div style={{ fontFamily: "sans-serif" }}></div>;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineFindAllReferences(t, "1", "2")
}
