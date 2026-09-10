---
name: security-report-check
description: >
  Are you doing security research on this repo?
  This document covers what guarantees and non-guarantees are provided.
  Consult this document before reporting a security issue or conducting security research.
---

# Security Properties of `tsc`

## Overview

The TypeScript compiler (`tsc`) is a **build tool**, not a sandbox.
It transforms TypeScript source files into JavaScript output files and reports potential errors.
This document describes what `tsc` guarantees and does not guarantee when invoked on untrusted input.

## Security Guarantees

### No arbitrary code execution

Running `tsc` on a malicious `.ts` or `tsconfig.json` file will never cause the input code to be executed.
The compiler parses, type-checks, and emits; it does not evaluate the programs it compiles.
There is no `eval`-at-compile-time, no macro system, and no plugin mechanism that runs author-supplied code during compilation.
This is the core security property of `tsc`.

*Exception*: If content mappers are enabled, this *does* enable execution of third-party code.
Only pass the `--runExternalCode` flag if you have validated which content mappers are available and that you are OK with running them.

**Limited default side effects.**

Outside of explicitly enabled external code, compiler invocations interact with the system through file-system operations and process I/O. Depending on the options, `tsc` may write compiler, build-info, trace, or profile files, update output timestamps, or delete build outputs (for example, with `--build --clean`).

The compiler does not make HTTP requests or spawn child processes except through content mappers.


**Safe exit.**
Certain adversarial inputs may cause crashes, but these crashes will unwind the process normally, and will not be a source of buffer overrun or other memory safety exploit vectors.

## Non-Guarantees

### Arbitrary file writes

`tsc` writes compiler output to paths derived from its configuration (`outDir`, `outFile`, `declarationDir`, etc.) and the structure of the input project.
It is **expected** that a given `tsconfig.json` can direct output to any path writable by the calling user.
This is by design: writing files to disk *is the point* of a compiler.
Callers who need to constrain output locations must do so externally (e.g., filesystem permissions, containers, sandboxing).
Similarly, running `tsc --build --clean` may delete files from disk; crafted `.tsbuildinfo` or `tsconfig.json`s may cause any file to be deleted.

### Input code is output code

If an attacker has control of an input TS file, they can of course control the contents of the output JS file.
Attacks that depend on control of the input file and execution of the output file are not considered compiler security issues, because the attacker already has control of the input file.

**File read sandboxing.**
`tsc` will read files from paths specified in input files, and transitive references from there, including import paths and reference directives.
An attacker in control of these files may therefore cause a *read* of any file path the `tsc` process has privileges to read, and `tsc` may reprint certain file contents in its output messages.
In other words, for example, it is not generally safe to run `tsc` on untrusted code and print back the error message contents to an untrusted party, as this could expose local filesystem contents to the attacker.
Use of standard sandboxing strategies is recommended to secure scenarios similar to this.

### Resource consumption

TypeScript's type system is Turing-complete.
A crafted input file can cause `tsc` to consume unbounded CPU time or memory during type-checking, and in fact small type constructs that can consume a large amount of time are common and intentional.
Routine compilations of normal code can legitimately take multiple minutes and gigabytes of memory, so there is no reliable way to distinguish between a "normal" long-running compilation and an adversarially-constructed one.

Callers operating on untrusted input should enforce resource limits externally (e.g., `ulimit`, cgroups, process timeouts).
You should not assume that an adverserially-constructed program will successfully typecheck in any bounded amount of time.
"Local Denial of Service (DoS)" is thus not a *security* report; if you encounter a performance problem, you can report this through the normal issue tracker.

### Crashes

`tsc` may gracefully crash, hang, or produce unexpected diagnostics when given adversarial input.
While crashes in "normal" code are treated as bugs and fixed when reported, the compiler does *not* guarantee non-crashing in the presence of all possible malformed inputs (e.g. an unbounded series of `f(f(f(f(...`).

### tsbuildinfo

The `.tsbuildinfo` file is a cache of compiler state that is used to speed up incremental compilation.
If this file is modified, it can cause `tsc` to e.g. fail to build a file because it thinks the file is up-to-date, or to recompile a file that has not changed.
.`tsbuildinfo` files should be considered as sensitive as `tsconfig.json` files in terms of security; an attacker who can modify them can cause arbitrary file reads and writes.

## Language Service

The TypeScript Language Service (LS) only executes in the context of a [trusted workspace (VS Code)](https://code.visualstudio.com/docs/editing/workspaces/workspace-trust) or [trusted folder (VS)](https://learn.microsoft.com/en-us/visualstudio/ide/trust-settings?view=visualstudio).
Similar to tsc, there are no guaranteed resource caps in the LS, and "hangs" may occur in the presence of adversarial inputs.

## Examples

### Hypothetically Valid Security Reports

- Running `tsc malicious.ts` executes top-level code from `malicious.ts`, even though `--runExternalCode` was not passed.
- A specially crafted source file causes `tsc` to launch an attacker-chosen executable, even though  `--runExternalCode` was not passed.
- A malformed input exploits a memory-safety flaw to execute arbitrary native code rather than merely causing the `tsc` process to exit.

### Hypothetically Invalid Security Reports

- A recursive conditional type causes the reporter's local `tsc` process to use all available CPU or memory, hang, or terminate with a stack overflow.
- A malicious `tsconfig.json` directs emitted JavaScript or declarations to an unexpected path that is writable by the user running `tsc`.
- A project causes `tsc --build --clean` to delete a file that the invoking user has permission to delete.
- An import or reference directive causes `tsc` to read a local file, and a diagnostic reveals some of that file's contents to the caller.
- Attacker-controlled TypeScript produces attacker-controlled JavaScript that performs a malicious action when executed.
- A malformed source file crashes `tsc` without escaping the process or causing memory corruption.
- A content mapper executes code after the caller explicitly enables content mappers with `--runExternalCode`.

