# How does TypeScript formatting work?

## Blank lines

The language server accepts two optional formatting preferences through its
existing configuration mechanism, under `format` in the language settings:

```json
{
    "format": {
        "removeBlankLinesBeforeClosingBrace": true,
        "maxConsecutiveBlankLines": 1
    }
}
```

Both are opt-in. `maxConsecutiveBlankLines` accepts nonnegative integers; zero
removes all blank lines between tokens or comments while retaining the line break
that separates them. An omitted limit preserves existing blank lines. Invalid
values leave the current setting unchanged. Removing blank lines before structural
closing braces takes precedence over the general limit.

These preferences apply to document and selection formatting, including formatting
on save. They do not apply to on-type formatting, file-leading or file-trailing
blank lines, or the contents of comments, strings, templates, and JSX text.
The closing-brace preference excludes template interpolations and JSX expressions.

## Overview

To format code you need to have a formatting context and a `SourceFile`.  The formatting context contains 
all user settings like tab size, newline character, etc.

The end result of formatting is represented by TextChange objects which hold the new string content, and 
the text to replace it with. 

## Internals

Most of the exposed APIs internally are `Format*` and they all set up and configure `FormatSpan` which could be considered the root call for formatting. Span in this case refers to the range of 
the sourcefile which should be formatted. 

The formatSpan then uses a scanner (either with or without JSX support) which starts at the highest
node the covers the span of text and recurses down through the node's children.

As it recurses, `processNode` is called on the children setting the indentation is decided and passed 
through into each of that node's children.

The meat of formatting decisions is made via `processPair`, the pair here being the current node and the previous node. `processPair` which mutates the formatting context to represent the current place in the scanner and requests a set of rules which can be applied to the items via `createRulesMap`.

There are a lot of rules, which you can find in [rules.ts](./rules.ts) each one has a left and right reference to nodes or token ranges and note of what action should be applied by the formatter.

### Where is this used?

The formatter is used mainly from any language service operation that inserts or modifies code.  The formatter is not exported publicly, and so all usage can only come through the language server.
