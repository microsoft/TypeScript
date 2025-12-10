/// <reference path="fourslash.ts" />

////type ListenerTemplate<T, S extends string, I extends string = "${1}"> = {
////    [K in keyof T as K extends string
////        ? S extends `${infer F}${I}${infer R}` ? `${F}${K}${R}` : K : K]
////        : (listener: (payload: T[K]) => void) => void;
////};
////type ListenActionable<E> = ListenerTemplate<E, "add*Listener" | "remove*Listener", "*">;
////type ClickEventSupport = ListenActionable<{ Click: 'some-click-event-payload' }>;
////
////const foo = (): ClickEventSupport => {
////    [|return|] { /*1*/ }
////}

verify.completions({
    marker: '1',
    exact: [{
        name: 'addClickListener',
        sortText: completion.SortText.ObjectLiteralProperty(completion.SortText.LocationPriority, 'addClickListener')
    }, {
        source: completion.CompletionSource.ObjectLiteralMethodSnippet,
        isSnippet: true,
        name: 'addClickListener(listener)',
        insertText: `addClickListener(listener) {
    $0
},`,
        sortText: completion.SortText.SortBelow(completion.SortText.ObjectLiteralProperty(completion.SortText.LocationPriority, 'addClickListener'))
    }, {
        name: 'removeClickListener',
        sortText: completion.SortText.ObjectLiteralProperty(completion.SortText.LocationPriority, 'removeClickListener')
    }, {
        source: completion.CompletionSource.ObjectLiteralMethodSnippet,
        isSnippet: true,
        name: 'removeClickListener(listener)',
        insertText: `removeClickListener(listener) {
    $0
},`,
        sortText: completion.SortText.SortBelow(completion.SortText.ObjectLiteralProperty(completion.SortText.LocationPriority, 'removeClickListener'))
    }],
    preferences: {
        includeCompletionsWithInsertText: true,
        includeCompletionsWithSnippetText: true,
        includeCompletionsWithObjectLiteralMethodSnippets: true,
    }
});
