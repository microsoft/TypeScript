// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/63749

declare class Dummy {
    a: number;
}

type Public = Base | Dummy;

declare class Base {
    protected get content(): string;
    protected set content(value: string);
}

declare class Mock {
    get content(): string;
    set content(value: string);
}

declare const w: Public
if (w instanceof Mock) {
    w.content;
}
declare const w2: Mock & Public
w2.content;


declare const w3: Public & Mock
w3.content;
