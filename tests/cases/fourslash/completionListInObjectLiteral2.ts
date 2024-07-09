/// <reference path='fourslash.ts'/>

////interface TelemetryService {
////    publicLog(eventName: string, data: any): any;
////};

////class SearchResult {
////    count() { return 5; }
////    isEmpty() { return true; }
////    fileCount(): string { return ""; }
////}

////class Foo {
////    public telemetryService: TelemetryService;   // If telemetry service is of type 'any' (i.e. uncomment below line), the drop-down list works
////    public telemetryService2;
////    private test() {
////        var onComplete = (searchResult: SearchResult) => {
////            var hasResults = !searchResult.isEmpty();  // Drop-down list on searchResult fine here
////            // No drop-down list available on searchResult members within object literal below
////            this.telemetryService.publicLog('searchResultsShown', { count: searchResult./*1*/count(), fileCount: searchResult.fileCount() });
////            this.telemetryService2.publicLog('searchResultsShown', { count: searchResult./*2*/count(), fileCount: searchResult.fileCount() });
////        };
////    }
////}

verify.completions({ marker: test.markers(), exact: ["count", "fileCount", "isEmpty"] });
