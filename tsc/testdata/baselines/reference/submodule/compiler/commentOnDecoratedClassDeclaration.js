//// [tests/cases/compiler/commentOnDecoratedClassDeclaration.ts] ////

//// [commentOnDecoratedClassDeclaration.ts]
declare function decorator(x: string): any;

/**
 * Leading trivia
 */
@decorator("hello")
class Remote { }

/**
 * Floating Comment
 */

@decorator("hi")
class AnotherRomote {
    constructor() {}
}

//// [commentOnDecoratedClassDeclaration.js]
@decorator("hello")
class Remote {
}
@decorator("hi")
class AnotherRomote {
    constructor() { }
}
