/// <reference path="fourslash.ts" />

////type ListenerTemplate<T, S extends string, I extends string = "${1}"> = {
////    [K in keyof T as K extends string
////        ? S extends `${infer F}${I}${infer R}` ? `${F}${K}${R}` : K : K]
////        : (listener: (payload: T[K]) => void) => void;
////};
////type ListenActionable<E> = ListenerTemplate<E, "add*Listener" | "remove*Listener", "*">;
////type ClickEventSupport = ListenActionable<{ Click: 'some-click-event-payload' }>;
////
////[|class C implements ClickEventSupport { }|]

verify.codeFix({
    description: "Implement interface 'ClickEventSupport'",
    newRangeContent:
`class C implements ClickEventSupport {
    addClickListener: (listener: (payload: "some-click-event-payload") => void) => void;
    removeClickListener: (listener: (payload: "some-click-event-payload") => void) => void;
}`,
});
