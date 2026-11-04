//// [tests/cases/compiler/abstractMethodNonConsecutiveDeclarations.ts] ////

//// [abstractMethodNonConsecutiveDeclarations.ts]
// https://github.com/microsoft/TypeScript/issues/61783

abstract class SeparatedByMethod {
    abstract func1(): void;

    func2(): string {
        return 'hi';
    }

    abstract func1(): void;
}

abstract class SeparatedByProperty {
    abstract func1(): void;

    prop: string = 'hi';

    abstract func1(): void;
}


//// [abstractMethodNonConsecutiveDeclarations.js]
"use strict";
// https://github.com/microsoft/TypeScript/issues/61783
class SeparatedByMethod {
    func2() {
        return 'hi';
    }
}
class SeparatedByProperty {
    prop = 'hi';
}
