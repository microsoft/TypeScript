CHANGES.md lists intentional changes between the Strada (Typescript) and Corsa (Go) compilers.

## Scanner

1. Node positions use UTF8 offsets from the beginning of the file, not UTF16 offsets. Node positions in files with non-ASCII characters will be greater than before.

## Parser

1. Source files do not contain an EndOfFile token as their last child.
2. Malformed `...T?` at the end of a tuple now fails with a parse error instead of a grammar error.
3. Malformed string ImportSpecifiers (`import x as "OOPS" from "y"`) now contain the string's text instead of an empty identifier.
4. Empty binding elements no longer have a separate kind for OmittedExpression. Instead they have Kind=BindingElement with a nil Initialiser, Name and DotDotDotToken.
5. ShorthandPropertyAssignment no longer includes an EqualsToken as a child when it has an ObjectAssignmentInitializer.
6. JSDoc nodes now include leading whitespace in their location.
7. The parser always parses a JSDocText node for comments in JSDoc. `string` is no longer part of the type of `comment`.
8. In cases where Strada did produce a JSDocText node, Corsa no longer (incorrectly) includes all leading and trailing whitespace/asterisks, as well as initial `/**`.
9. JSDocMemberName is now parsed as QualifiedName. These two nodes previously only differed by type, and now QualifiedName has a much less restrictive type for its left child.

JSDoc types are parsed in normal type annotation position but show a grammar error. Corsa no longer parses the JSDoc types below, giving a parse error instead of a grammar error.

1. No postfix `T?` and `T!` types. Prefix `?T` and `!T` are still parsed and `!T` continues to have no semantics.
2. No Closure `function(string,string): void` types.
3. No JSDoc standalone `?` type.
4. No JSDoc module namepaths: `module:folder/file.C`

Corsa no longer parses the following JSDoc tags with a specific node type. They now parse as generic JSDocTag nodes.

1. `@class`
2. `@throws`
3. `@author`
4. `@enum`
