
interface C { }

declare class C { }

interface C { }

interface C { }

declare module M {

    interface C1 { }

    class C1 { }

    interface C1 { }

    interface C1 { }

    export class C2 { }
}

declare module M {
    export interface C2 { }
}