package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionListInObjectLiteral2(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface TelemetryService {
    publicLog(eventName: string, data: any): any;
};
class SearchResult {
    count() { return 5; }
    isEmpty() { return true; }
    fileCount(): string { return ""; }
}
class Foo {
    public telemetryService: TelemetryService;   // If telemetry service is of type 'any' (i.e. uncomment below line), the drop-down list works
    public telemetryService2;
    private test() {
        var onComplete = (searchResult: SearchResult) => {
            var hasResults = !searchResult.isEmpty();  // Drop-down list on searchResult fine here
            // No drop-down list available on searchResult members within object literal below
            this.telemetryService.publicLog('searchResultsShown', { count: searchResult./*1*/count(), fileCount: searchResult.fileCount() });
            this.telemetryService2.publicLog('searchResultsShown', { count: searchResult./*2*/count(), fileCount: searchResult.fileCount() });
        };
    }
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, f.Markers(), &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				"count",
				"fileCount",
				"isEmpty",
			},
		},
	})
}
