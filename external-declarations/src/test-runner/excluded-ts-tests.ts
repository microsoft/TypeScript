export const  excludedTsTests = new Set([
    // These two tests contain a declaration error
    // A variable that is not of a literal type is used as a computed property name
    // TS will error on this and will not merge the overloads to a singe symbol
    // This means TS will not remove the implementation overload
    //
    // The external declaration emitter will use the variable name to merge symbols.
    "computedPropertyNamesOnOverloads_ES5",
    "computedPropertyNamesOnOverloads_ES6",
    // Symbols are merged across files and excluded. We can't do cross file analysis
    "jsFileCompilationDuplicateFunctionImplementation",
    "jsFileCompilationDuplicateFunctionImplementationFileOrderReversed",
    // Output emitted to same file test ios not of interest for isolated declarations
    "filesEmittingIntoSameOutput",
    // Error in TS, but excludes implementation in declarations.
    // Generating same output if we have an error is best effort
    "overloadsInDifferentContainersDisagreeOnAmbient",
    // The function is elided because the eval function is merged with eval from libs into a single symbol
    // We can't reproduce this behavior
    "parserStrictMode8",
]);