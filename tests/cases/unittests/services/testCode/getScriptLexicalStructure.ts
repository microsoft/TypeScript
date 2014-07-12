module Bar {                    // Module
    var x: number;              // Variable
    function f(): void { }      // Function

    interface IFoo {
        (i: number): IFoo;   // CallSignature
        new (): IFoo;        // ConstructSignature
        [i: number]: number; // IndexSignature
        foo: number;         // PropertySignature
        bar(): void;         // FunctionSignature
    }

    enum Blah {
        foo = 2             // EnumMemberDeclaration
    }

    class Bar {
        constructor(private barVar: Bar) { } // ConstructorImplementation

        public barProp: number;              // MemberVariableDeclaration
        public barPropFunc(): void { }       // MemberFunctionDeclaration
        public get prop1(): void { }         // MemberAccessorDeclaration
        public set prop1() { }               // MemberAccessorDeclaration

        private barPropP: number;            // MemberVariableDeclaration
        private barPropFuncP(): void { }     // MemberFunctionDeclaration
        private get prop1P(): void { }       // MemberAccessorDeclaration
        private set prop1P() { }             // MemberAccessorDeclaration

        static foo: number;                  // StaticVariableDeclaration
        static bar(): void { }               // StaticFunctionDeclaration
        static get foo2(): void { }          // StaticAccessorDeclaration
        static set foo2() { }                // StaticAccessorDeclaration
    }
}

module Bar2 {                           // Module
    export var x: number;               // Variable
    export function f(): void { }       // Function

    export interface IFoo {
        (i: number): IFoo;   // CallSignature
        new (): IFoo;        // ConstructSignature
        [i: number]: number; // IndexSignature
        foo: number;         // PropertySignature
        bar(): void;         // FunctionSignature
    }

    export enum Blah {
        foo = 2             // EnumMemberDeclaration
    }

    export class Bar {
        constructor(private barVar: Bar) { } // ConstructorImplementation

        public barProp: number;              // MemberVariableDeclaration
        public barPropFunc(): void { }       // MemberFunctionDeclaration
        public get prop1(): void { }         // MemberAccessorDeclaration
        public set prop1() { }               // MemberAccessorDeclaration

        private barPropP: number;            // MemberVariableDeclaration
        private barPropFuncP(): void { }     // MemberFunctionDeclaration
        private get prop1P(): void { }       // MemberAccessorDeclaration
        private set prop1P() { }             // MemberAccessorDeclaration

        static foo: number;                  // StaticVariableDeclaration
        static bar(): void { }               // StaticFunctionDeclaration
        static get foo2(): void { }          // StaticAccessorDeclaration
        static set foo2() { }                // StaticAccessorDeclaration
    }
}


declare module Bar3 {

}

module Bar4 {                   // Module
    declare var x: number;      // Variable
    declare function f(): void; // Function

    declare interface IFoo {
        (i: number): IFoo;   // CallSignature
        new (): IFoo;        // ConstructSignature
        [i: number]: number; // IndexSignature
        foo: number;         // PropertySignature
        bar(): void;         // FunctionSignature
    }

    declare enum Blah {
        foo = 2             // EnumMemberDeclaration
    }

    declare class Bar {
        constructor (private barVar: Bar);  // ConstructorImplementation

        public barProp: number;              // MemberVariableDeclaration
        public barPropFunc(): void;          // MemberFunctionDeclaration
        public get prop1(): void;            // MemberAccessorDeclaration
        public set prop1();                  // MemberAccessorDeclaration

        private barPropP: number;            // MemberVariableDeclaration
        private barPropFuncP(): void;        // MemberFunctionDeclaration
        private get prop1P(): void;          // MemberAccessorDeclaration
        private set prop1P();                // MemberAccessorDeclaration

        static foo: number;                  // StaticVariableDeclaration
        static bar(): void;                  // StaticFunctionDeclaration
        static get foo2(): void;             // StaticAccessorDeclaration
        static set foo2();                   // StaticAccessorDeclaration
    }
}
