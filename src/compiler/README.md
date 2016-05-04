# Compiler Manual

Welcome to the compiler manual. It details the compiler implementation
and its philosophy. Because it focusses on implementation, it's
necessarily out-of-date and incomplete. Also, in this version, I
totally make guesses about things I'm not sure about.

## Parser

It's a recursive descent parser. It's pretty resilient, so if you
search for functions matching the thing you want to change, you can
probably get away with just adding the code to parse. There aren't any
surprises in the general implementation style here.

TODO: More here later.

## Binder

It gathers symbols from files. There's one created when you start the
compiler, and that's it. It creates symbols for
declarations so that the checker can stick types on them.

TODO: This is woefully incomplete.

TODO: It also sets up some data structures that the checker uses, like
control flow.

## Checker

The checker makes sure the types are right. 'Nuff said! Actually, it's
20,000 lines long, and does almost everything that's not syntactic.
Surprisingly, a checker gets created every time the language service
requests information because it tries to present an immutable
interface. This works because the checker is very lazy.

### Survey

This is a boring in-order survey of what's in the checker. I'll use
this list to see what can be moved out to a separate file.

1. `nextSymbolId, nextNodeId, nextMergeId, nextFlowId` and associated
   `get` functions. These are core to the state of the checker, so
   should not be moved.
2. `createTypeChecker`. This creates a checker. Don't move this!
3. getEmitResolver and error. Miscellaneous?
4. createSymbol to mergeSymbolTable. Manage Symbols and SymbolTables.


## Transformer

The transformer is nearing completion to replace the emitter. The
change in name is because the *emitter* translated TypeScript to
JavaScript. The *transformer* transforms TypeScript or JavaScript
(various versions) to JavaScript (various versions) using various
module systems. The input and output are basically both trees from the
same AST type, just using different features*.

TODO: This is woefully incomplete.

## Services

I don't know anything about services. And besides, this readme is in
the `compiler` directory.

## Other files

This is an unsorted inventory. Some of these deserve an in-depth
explanation, or at least a big overview of what they mean.

1. core
2. utilities
3. program
4. scanner
5. sourcemap
6. sys
7. tsc
8. types
8. commandLineParser
9. declarationEmitter
