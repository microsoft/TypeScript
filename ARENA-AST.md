# Arena AST: nodes as offsets into per-file, pointer-free storage

Branch: [`jakebailey/TypeScript@arena-ast`](https://github.com/jakebailey/TypeScript/tree/arena-ast) (previous attempt backed up at `arena-ast-old`). This file is the living design doc for the branch and is updated alongside it.

## Goal

Every `*ast.Node` is a heap object full of Go pointers: children, parent, symbol, flow node, lists, and so on. The GC has to trace all of them. The idea here is that a node is "a file plus an offset", and its fields are pointer-free data, so the GC barely sees the AST.

## Design

### A node is a value handle

```go
type Node struct{ p unsafe.Pointer }            // address of a record
type PropertyAccessExpression struct{ Node }    // typed views carry no extra data
```

`Node` is passed by value everywhere, and the zero `Node` means "no node". Kind-specific views such as `node.AsPropertyAccessExpression()` are free conversions.

### Records live in per-file block arenas

Each file (more precisely, each `NodeFactory`) has a `nodeStore`, which allocates blocks. Each block is a single Go object built with `reflect.StructOf` so that **only word 0 is a pointer**:

```
block: [ *nodeStore | record | record | record | ... ]
         ^ the only word the GC scans in the whole block
```

Blocks start at 512 bytes and each adds a quarter of the store's size, up to 1GB so that any offset within a block fits in an `int32`. The store keeps every block in `blocks`, and every block points back at the store, so any handle into any block keeps the whole store alive.

### Every record starts with a 32-byte header

```go
type nodeBaseData struct {
    id     atomic.Uint64
    loc    core.TextRange
    parent nodeRef
    flags  NodeFlags
    self   uint32  // this record's word offset in its block
    kind   Kind
}
```

`self` lets any node find its store in O(1): step back `self`'s offset to word 0 of the block and load the `*nodeStore`. A compile-time assertion keeps the header at 32 bytes.

### Records are flat and pointer-free

Records are generated from the AST schema (`tools/scripts/tsc/generate-go-ast.ts`):

```go
type propertyAccessExpressionData struct {
    nodeBaseData
    expression       nodeRef        // Expression
    questionDotToken nodeRef        // QuestionDotToken (optional)
    name             nodeRef        // MemberName
    flowNode         sideRef        // *FlowNode
    facts            atomic.Uint32
}
```

All fields, including those from "base" shapes (declaration, function-like, flow container, and so on), are laid out inline after the header and sorted by alignment, so there's no padding. Generic accessors like `node.FlowNode()` or `node.Symbol()` find their field through generated per-kind offset tables, which costs one indexed load instead of a switch on kind.

### How fields reference things

| Field type | Stored as | Read path |
|---|---|---|
| Another node | `nodeRef` (`ref`, 32 bits). Odd: byte offset from the field itself, plus one. Even: far-table index × 2. Zero: none | Same block: `&field + r − 1`. Otherwise: store's far table, found through `self` |
| Flow node | `flowRef` (`ref` to a pointer-free `FlowNode` record in a block) | As for nodes |
| Other Go pointers (`*Symbol`, `*NodeList`, `[]Node`, `SymbolTable`, `any`, …) | `sideRef uint32`, an index into a typed `sideTable[T]` on the store | `store().table.items[i-1]` |
| `string` | `textRef{off, len uint32}` into the file's source text, or into an append-only text arena | `unsafe.String` over the backing bytes |

Flow nodes and flow lists are arena records like nodes: `FlowNode{node nodeRef; antecedent flowRef; antecedents flowListRef; Flags; self}` is 24 bytes with no Go pointers. The binder allocates them in the file's store, and the checker allocates its synthetic flow nodes in its own factory's store. The API still hands out a real `*FlowNode`; an interior pointer into a chunk keeps the chunk, and through word 0 the whole store, alive, so checker maps keyed by `*FlowNode` stay safe.

Refs are plain numbers, never addresses hidden from the GC, so liveness falls out of ordinary Go pointers:
- Handles are real interior pointers, so they keep their block alive, and word 0 keeps the store alive.
- A store keeps all of its own blocks in `blocks`.
- A ref to a record in **another** store (synthesized nodes, cross-file reuse) is an index into the referring store's far table, which holds a real pointer to the target. Refs to other blocks of the same store also go through it.
- `SourceFile`, which can't avoid real pointers, is allocated as a standalone record behind its own store pointer and indexed as a block of its own.

As a result, the GC scans one word per block plus the side tables and far table, instead of every child, parent, symbol and string pointer of every node.

### How we got here (commit sequence)

1. Value-handle `Node` codemod (`*Node` → `Node`) across the compiler.
2. Store-backed records, side tables for pointer fields, and text refs.
3. Arena chunks with a noscan body.
4. Self-relative 32-bit refs with a far-ref table. These were compact, but the near/far branching and the locked far table cost 6–8% of check time.
5. **Absolute address refs** (check −5.59% vs relative refs, memory +4.85%).
6. **Slower chunk growth** (memory −2.63%).
7. **32-byte header** (memory −3.28%).
8. **Flattened records + offset tables** (memory −0.39%, check time unchanged).
9. **Flow nodes in the arena** (memory −0.67%, check time unchanged). This drops the `*FlowNode` side table and makes flow nodes invisible to the GC.
10. **32-bit block-indexed refs** (check **+10.2%**, memory −1.0%). Absolute refs were Go pointers hidden in `uintptr`s, so this replaces them with real 32-bit refs. It's a deliberate stepping stone and is slower; see [Next: one block per file](#next-one-block-per-file).
11. **Field-relative refs** (check +6.3% vs step 9). A near ref is an offset from the field holding it, and decoding makes no calls, so it inlines into every accessor. The remaining cost is refs leaving their block. Sizing the first block to fit the file didn't recover it, so the next step is the index-based redesign below.

## Next: one block per file

Profiling step 10 shows that its check-time cost is ref decoding:

- 750M derefs in a vscode build, of which 21% cross blocks. Containers are allocated after their members, so walking up parent chains keeps crossing blocks, and 42M derefs land on the standalone `SourceFile`.
- But sizing the first block from the source length, so that most files fit in one block, does **not** recover the time. The same-block path itself (load the field, load `self`, subtract, add) costs about as much as the cross-block lookups.

So the fix is architectural:

1. **Lists become arena records**: a count followed by 32-bit refs. `*NodeList` becomes a view (`Len`, `At`, `All`) instead of a `[]Node` holder, so no side table holds node handles once parsing is done.
2. **`SourceFile` moves into the arena**, with its Go-pointer fields in a separate struct reached through the store.
3. **Compact once at the end of parse**: a Cheney-style copy from the `SourceFile` into one exact-size block, leaving forwarding addresses in the old records. This also drops the garbage left by speculative parsing. After that the file's store is immutable.
4. **Field-relative refs**: a ref is a word offset from the field's own address. Decoding needs neither `self` nor a block table, and since every in-file ref stays inside one Go object, it's ordinary `unsafe.Add` arithmetic. Refs to other stores keep going through the far table.
5. **Binder output gets its own per-file tables**: flow nodes, and then symbols, live in paged typed tables addressed by 32-bit index. Nothing allocates into the node block after parse.

## Performance (vscode, n=10, interleaved)

### Branch tip vs main

```
       │    main    │               arena               │
       │ check-sec  │ check-sec   vs base               │
VSCode   7.272 ± 2%   7.391 ± 2%  +1.64% (p=0.035 n=10)

       │    main    │            arena             │
       │ total-sec  │ total-sec   vs base          │
VSCode   8.249 ± 3%   8.360 ± 1%  ~ (p=0.197 n=10)

       │     main     │                arena                │
       │    mem-B     │    mem-B      vs base               │
VSCode   3.302Gi ± 0%   3.398Gi ± 0%  +2.92% (p=0.000 n=10)
```

`mem-B` is `MemStats.Alloc` after two forced GCs at the end of the run, i.e. the live heap.

### What did improve

- **GC mark CPU: 9.07s → 4.23s (−53%)**. Total CPU samples went from 48.95s to 44.11s (−10%).
- **Parse: about 5–10% faster.**
- **CPU-constrained (`taskset` to 4 cores): about 1–2% faster overall**, because GC can no longer hide on idle cores.
- 6 concurrent compiles on one machine: parity.

### Why wall-clock check time doesn't move

- On an unconstrained machine, Go's GC marks on otherwise idle cores. Halving mark work frees CPU that the checkers weren't going to use.
- Following AST references is only about **2–3% of check CPU**, so making it cheaper (or more expensive) barely shows up.
- About **15% of check CPU is map lookups**, mostly keyed by `*Symbol` or `string`:
  - `mergedSymbols map[*Symbol]*Symbol` (`getMergedSymbol`)
  - map-based symbol `LinkStore`s (checker.go ~695–723; node links already use a paged, ID-indexed store)
  - `getPropertyOfTypeEx` and symbol table lookups
  - `GetIdentifierToken`
  - `compareNodes` → `fileIndexMap`

  That is a checker data-structure problem, not an AST layout problem.

## Where the memory actually goes

Live heap at the end of a vscode run, from a heap profile taken right after the final forced GC. Each sample is attributed to the allocation site closest to the leaf:

| Category | main | arena |
|---|---|---|
| **AST** (records, lists, node slices) | 981MB | 897MB |
| AST side tables, text arena, stores | – | ~125MB |
| **AST total** | **~0.98GB** | **~1.02GB** |
| Source text | 110MB | 111MB |
| Binder symbols | 234MB | 248MB |
| Binder flow nodes | 71MB | 63MB |
| **Checker total** | **~2.0GB** | **~2.0GB** |
| …node links (paged) | 479MB | 472MB |
| …instantiated symbol tables / inherited members | ~650MB | ~650MB |
| …types | ~0.3–0.4GB | ~0.3–0.4GB |
| …checker symbols, symbol links, relations | ~200MB | ~200MB |
| **Total live** | 3.47GB | 3.56GB |

Peak RSS is 4.19GB on main and 4.21GB on the arena. Symbol (7.09M), type (2.43M) and identifier (4.52M) counts are identical.

### Why a "more compact" AST doesn't save memory

1. **Main is already compact.** Main's `Node` is also a 32-byte header (`Kind, Flags, Loc, id, Parent`, with no `data` interface), embedded at the start of each concrete node, and nodes come from per-kind slab pools rather than individual allocations. Arena records are only 0–16 bytes smaller per kind:

   | Kind | main | arena |
   |---|---|---|
   | Identifier | 56 | 48 |
   | StringLiteral | 56 | 48 |
   | PropertyAccessExpression | 72 | 64 |
   | CallExpression | 80 | 64 |
   | BinaryExpression | 88 | 80 |
   | TypeReference | 48 | 48 |
   | Token | 32 | 32 |

   The savings come from `string` (16 bytes) → `textRef` (8 bytes) and from pointer fields → 4-byte `sideRef`s. Together that's roughly 85MB.
2. **Side tables give it back, and more.** Moving `*Symbol` and `*FlowNode` out of the node replaces one 8-byte pointer with a 4-byte index plus an 8-byte table entry. These fields are populated on most declarations and identifiers, so this is a net loss, and the tables also carry append-growth slack and a clone on compaction. That costs about 125MB.
3. **Refs were 8 bytes.** These measurements predate step 10. With 32-bit refs, records round up to whole words, so many kinds don't shrink (Identifier: 32 + 4 + 8 → 48 bytes either way).
4. **The AST is only about 30% of the heap.** About 60% is checker state: instantiated symbol tables, node links, types and relations. This work doesn't touch any of that.

## Future work and expected impact

| Idea | What it is | Expected impact | Effort |
|---|---|---|---|
| **Inline symbol/flow IDs instead of side tables** | Give symbols and flow nodes dense uint32 IDs into global (or per-program) arrays and store the ID inline in the record, dropping the per-store side tables for densely populated fields. | About −125MB, recovering the side-table overhead. Lookup cost is similar (one indexed load). | Medium: needs stable ID allocation for binder- and checker-created symbols. |
| **24-byte header (drop `id`)** | Derive the node ordinal from the store plus the record position instead of storing an 8-byte atomic id. Node links index by ordinal. | About −80–100MB (8 bytes × ~10M+ nodes). Check time roughly neutral. | Medium: everything that uses `GetNodeId` must be able to compute it, and ordinals must be stable and dense. |
| **Lists in the arena** | Store `NodeList`, `ModifierList` and `[]Node` as inline ref arrays in chunks instead of side-table slices. | About −50–100MB, fewer GC-visible slices, and better locality in `ForEachChild`. | Medium: the list API currently hands out `*NodeList` / `[]Node`, so it needs a view type. |
| **Compacted per-file image** | After parse and bind, copy a file's chunks into one exact-size block (with refs rewritten), dropping growth tails and side-table slack. | About −20–50MB. More importantly, a file becomes **one contiguous, pointer-free blob**: zero-copy hand-off to the JS API or IPC, mmap-able caches, and cheap incremental reuse. | Medium-high: cross-store refs and `keep` sets need fixing up, and this must happen before the file is shared. |
| **Relative refs again, done right** | 32-bit refs relative to the chunk or image base (not the field), with the image making "far" refs rare. | Shrinks every ref field by 4 bytes (about −100MB+). The previous attempt cost 6–8% of check time; with a contiguous image it should be one add instead of a branch plus a table lookup. | Medium, and depends on the image. |
| **Cheaper instantiated symbol tables** | `instantiateSymbolTable`, `addInheritedMembers` and `getNamedMembers` build about 650MB of maps and symbols. Use sorted slices or shared/lazy tables for small or derived members. | The largest single memory target, bigger than the whole AST saving potential. Likely a check-time win too (fewer map writes). | Medium-high; separate project. |
| **Dense symbol IDs in the checker** | Replace `map[*Symbol]…` link stores and `mergedSymbols` with ID-indexed paged arrays, as node links already are. | The actual check-time lever: up to about 10% of check CPU is in these maps. Independent of the AST work, but it compounds with it (and shares the symbol IDs from the first row). | Medium-high; separate project. |
| **Interned names** | Intern identifier text to dense IDs at parse time, and key symbol tables and `GetIdentifierToken` by ID instead of string. | Cuts string hashing in symbol table lookups: another few % of check CPU. Pairs naturally with `textRef`. | High: touches symbol tables broadly. |

### Rough combined picture

- **Inline IDs + header + lists + image:** the AST goes from about 1.02GB to roughly 0.7–0.8GB. Total memory goes from +3% to roughly −5–8% vs main, with GC mark CPU still about half. Check time is about neutral.
- **The bigger memory lever is the checker:** instantiated symbol tables and node links alone are about 1.1GB, more than the whole AST.
- **Plus dense symbol IDs and interned names:** this is where a real check-time win (high single digits to ~10%) would come from. The arena makes the AST cheap enough that the checker's maps are clearly the next bottleneck.
- **The image is the most interesting payoff:** a parsed and bound file as a single relocatable, pointer-free blob enables zero-copy API transfer and on-disk AST caching. A pointer-graph AST can't do that.
