///<reference path="references.ts" />

module TypeScript.Services {
    // Inject support for incremental parsing to the core compiler Document class.
    Document.incrementalParse = IncrementalParser.parse;
}