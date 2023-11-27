//// [tests/cases/compiler/emitClassExpressionInDeclarationFile2.ts] ////

//// [emitClassExpressionInDeclarationFile2.ts]
export var noPrivates = class {
    static getTags() { }
    tags() { }
    private static ps = -1
    private p = 12
}

// altered repro from #15066 to add private property
export class FooItem {
    foo(): void { }
    name?: string;
    private property = "capitalism"
}

export type Constructor<T> = new(...args: any[]) => T;
export function WithTags<T extends Constructor<FooItem>>(Base: T): {
    new(...args: any[]): {
        tags(): void;
        foo(): void;
        name?: string;
        property: string;
    };
    getTags(): void;
} & T {
    return class extends Base {
        static getTags(): void { }
        tags(): void { }
    }
}

const TestBase: {
    new(...args: any[]): {
        tags(): void;
        foo(): void;
        name?: string;
        property: string;
    };
    getTags(): void;
} & typeof FooItem = WithTags(FooItem);
export class Test extends TestBase {}

const test = new Test();

Test.getTags()
test.tags();


/// [Declarations] ////


/// [Errors] ////

emitClassExpressionInDeclarationFile2.ts(1,12): error TS4094: Property 'p' of exported class expression may not be private or protected.
emitClassExpressionInDeclarationFile2.ts(1,12): error TS4094: Property 'ps' of exported class expression may not be private or protected.
emitClassExpressionInDeclarationFile2.ts(25,5): error TS2322: Type '{ new (...args: any[]): (Anonymous class); prototype: WithTags<any>.(Anonymous class); getTags(): void; } & T' is not assignable to type '{ new (...args: any[]): { tags(): void; foo(): void; name?: string; property: string; }; getTags(): void; } & T'.
  Type '{ new (...args: any[]): (Anonymous class); prototype: WithTags<any>.(Anonymous class); getTags(): void; } & T' is not assignable to type '{ new (...args: any[]): { tags(): void; foo(): void; name?: string; property: string; }; getTags(): void; }'.
    Type '(Anonymous class) & FooItem' is not assignable to type '{ tags(): void; foo(): void; name?: string; property: string; }'.
      Property 'property' is private in type '(Anonymous class) & FooItem' but not in type '{ tags(): void; foo(): void; name?: string; property: string; }'.
emitClassExpressionInDeclarationFile2.ts(40,27): error TS2509: Base constructor return type 'never' is not an object type or intersection of object types with statically known members.
  The intersection '{ tags(): void; foo(): void; name?: string; property: string; } & FooItem' was reduced to 'never' because property 'property' exists in multiple constituents and is private in some.
emitClassExpressionInDeclarationFile2.ts(45,6): error TS2339: Property 'tags' does not exist on type 'Test'.


==== emitClassExpressionInDeclarationFile2.ts (5 errors) ====
    export var noPrivates = class {
               ~~~~~~~~~~
!!! error TS4094: Property 'p' of exported class expression may not be private or protected.
               ~~~~~~~~~~
!!! error TS4094: Property 'ps' of exported class expression may not be private or protected.
        static getTags() { }
        tags() { }
        private static ps = -1
        private p = 12
    }
    
    // altered repro from #15066 to add private property
    export class FooItem {
        foo(): void { }
        name?: string;
        private property = "capitalism"
    }
    
    export type Constructor<T> = new(...args: any[]) => T;
    export function WithTags<T extends Constructor<FooItem>>(Base: T): {
        new(...args: any[]): {
            tags(): void;
            foo(): void;
            name?: string;
            property: string;
        };
        getTags(): void;
    } & T {
        return class extends Base {
        ~~~~~~
!!! error TS2322: Type '{ new (...args: any[]): (Anonymous class); prototype: WithTags<any>.(Anonymous class); getTags(): void; } & T' is not assignable to type '{ new (...args: any[]): { tags(): void; foo(): void; name?: string; property: string; }; getTags(): void; } & T'.
!!! error TS2322:   Type '{ new (...args: any[]): (Anonymous class); prototype: WithTags<any>.(Anonymous class); getTags(): void; } & T' is not assignable to type '{ new (...args: any[]): { tags(): void; foo(): void; name?: string; property: string; }; getTags(): void; }'.
!!! error TS2322:     Type '(Anonymous class) & FooItem' is not assignable to type '{ tags(): void; foo(): void; name?: string; property: string; }'.
!!! error TS2322:       Property 'property' is private in type '(Anonymous class) & FooItem' but not in type '{ tags(): void; foo(): void; name?: string; property: string; }'.
            static getTags(): void { }
            tags(): void { }
        }
    }
    
    const TestBase: {
        new(...args: any[]): {
            tags(): void;
            foo(): void;
            name?: string;
            property: string;
        };
        getTags(): void;
    } & typeof FooItem = WithTags(FooItem);
    export class Test extends TestBase {}
                              ~~~~~~~~
!!! error TS2509: Base constructor return type 'never' is not an object type or intersection of object types with statically known members.
!!! error TS2509:   The intersection '{ tags(): void; foo(): void; name?: string; property: string; } & FooItem' was reduced to 'never' because property 'property' exists in multiple constituents and is private in some.
    
    const test = new Test();
    
    Test.getTags()
    test.tags();
         ~~~~
!!! error TS2339: Property 'tags' does not exist on type 'Test'.
    