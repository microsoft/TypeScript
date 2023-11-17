/// <reference path='fourslash.ts'/>

//// type TFoo<Value> = { value: Value };
//// type TBar<[|in|] [|out|] Value> = TFoo<Value>;

verify.baselineDocumentHighlights();
