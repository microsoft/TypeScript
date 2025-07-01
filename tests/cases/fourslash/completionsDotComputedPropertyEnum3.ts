/// <reference path="fourslash.ts" />

// Make sure completion shows fully qualified names for enum members 
// and literals for mapped proeprties keyed with string literals

/////**
//// * Mimicking rxjs to avoid dependency import
//// */
////
////type Observable<X> = {
////	subscribe(): Observable<X>
////};
////
////enum CPEvents {
////	CLICK = "click",
////	EMSG = "emsg",
////}
////
////// Payloads have been replaced for the repro-case, but they do not matter right now.
////interface CPMappedEvents {
////	[CPEvents.EMSG]: unknown; 
////}
////
////type CPUnmappedEvents = {
////	[K in Exclude<CPEvents, keyof CPMappedEvents>]: Event;
////};
////
////export type CPEventsMap = CPMappedEvents & CPUnmappedEvents;
////
////export type CPObservableEvents = {
////	[K in keyof CPEventsMap]: Observable<CPEventsMap[K]>;
////};
////
////declare const eventObservables: CPObservableEvents;
////eventObservables./*a*/;
////eventObservables['/*b*/'];

verify.completions({
    marker: "a",
    unsorted: [
        { name: "click" },
        { name: "CPEvents.EMSG", insertText: "[CPEvents.EMSG]" },
    ],
    preferences: { includeCompletionsWithInsertText: true }
});

verify.completions({
    marker: "a",
    unsorted: [
        { name: "click" },
        { name: "emsg" },
    ],
    preferences: { includeCompletionsWithInsertText: false }
});

verify.completions({
    marker: "b",
    unsorted: [
        { name: "click" },
        { name: "emsg" },
    ]
});

verify.baselineCompletions({
    includeCompletionsWithInsertText: true,
});