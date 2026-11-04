# Arena AST: nodes as offsets into per-file, pointer-free storage

Branch: [`jakebailey/TypeScript@arena-ast`](https://github.com/jakebailey/TypeScript/tree/arena-ast) (previous attempt backed up at `arena-ast-old`). This file is the living design doc for the branch and is updated alongside it.

## Goal

Every `*ast.Node` is a heap object full of Go pointers: children, parent, symbol, flow node, lists, and so on. The GC has to trace all of them. The idea here is that a node is "a file plus an offset", and its fields are pointer-free data, so the GC barely sees the AST.

## Design

A node is the address of a pointer-free record in a per-file chunk of words. Fields refer to other records by 32-bit refs, mostly as offsets. The garbage collector sees one pointer per chunk, not one per child, parent, symbol and string.

### A node is a record address

```go
type Node struct{ p unsafe.Pointer }        // address of the node's record
type PropertyAccessExpression struct{ Node } // typed views carry no extra data
```

`Node` is one word, so it is passed in a register and is cheap to compare and to use as a map key. The zero `Node` is "no node". Kind-specific views are free conversions. `Kind()` is one load from the record header.

### Records live in chunks that never move

```go
type chunkHeader struct {
    store *nodeStore  // the only pointer in a chunk
    index uint32
    _     uint32
}
// A chunk is reflect.StructOf{Header chunkHeader; Words [n]uint64}.
```

Each store (one per `NodeFactory`, so one per parsed file) allocates records from chunks. Each chunk is a single Go object whose only pointer is its header, so the GC never scans the records. Chunks are sized to allocator size classes (2^k or 3·2^(k-1) bytes), so no rounding is wasted. A parsed file's first chunk is sized from its source length, and later chunks add 1/16 of the store's size. Records never move. An interior `Node` pointer keeps its chunk alive, and the chunk header keeps the store alive.

`ParseSourceFile` parses, binds right away while the file is still private, then freezes the store and clips its side tables. Allocating in a frozen store panics.

### Every record starts with a 32-byte header

```go
type nodeBaseData struct {
    id     atomic.Uint64
    loc    core.TextRange
    parent parentRef
    flags  NodeFlags
    chunk  uint32 // byte offset of the record in its chunk
    kind   Kind
}
```

`chunk` leads from any record back to its chunk header, and from there to the store and its side tables.

### Records are flat and generated

Records are generated from the AST schema (`tools/scripts/tsc/generate-go-ast.ts`). All fields, including those of "base" shapes (declaration, function-like, flow container, …), are laid out inline after the header and sorted by alignment, so there is no padding. Accessors for members that many kinds share (`Name`, `Modifiers`, `Symbol`, `Locals`, `Body`, …) find their field through a generated per-kind offset table (`unsafe.Offsetof`). Kind-specific accessors use fixed offsets.

### How fields reference things

| Field type | Stored as | Read path |
|---|---|---|
| Node in the same chunk | `nodeRef` with the low bit set: signed byte offset from the field | `f + (r-1)` |
| No node | `nodeRef` 0 | tested before anything else |
| Node in another chunk or store | `nodeRef` even, nonzero: index into the store's `far []Node` | `store.far[r>>1]` |
| Parent | `parentRef`: even = byte offset from the record, odd = far slot `<<1\|1`, `1` = none | one add on the near path |
| Node list, modifier list | `listRef`, same encoding as `nodeRef`, over `farLists` | as for nodes |
| Flow node, flow list | index into the store's `flows`/`flowLists` arrays (pointer-free, 16 bytes each) | `FlowNode{store, i}` |
| `*Symbol`, `SymbolTable`, `[]string`, `[]Node`, `any` | `sideRef`: index into a typed side table, whose slot 0 is the zero value | `store.T.items[r]` |
| `string` | `textRef{off, len}`: the top 5 bits pick one of 32 pieces of up to 128MB. The first pieces hold the source text, so source substrings are referenced in place; the rest are an append-only arena. | `unsafe.String(pieces[off>>27]+off&mask, len)` |

Lists are records too: a range, a count, a flags word (missing list, or a `ModifierList`'s flags), then packed element refs. The parser collects elements on one scratch stack and copies each finished list into the store, so parsing allocates no `[]Node` per list.

Records are word aligned and refs are 4-byte aligned, so a distance between them is never odd, and the low bit is free to mark near refs. Go's compiler can't emit a three-operand LEA, so every encoding is chosen to make the hot decode one add: near refs keep the bit set and subtract a constant, and parents use even offsets from the record itself.

### What unsafe is left

- `unsafe.Add` from a ref field to a record in the same chunk. This stays within one Go object, so it satisfies the `unsafe.Pointer` rules and `-d=checkptr`.
- Record casts `(*T)(p)`, where every `T` is pointer-free.
- Offset tables built with `unsafe.Offsetof`. The generator produces them, so nothing is laid out by hand.
- `unsafe.String` for text refs.

No Go pointer is ever stored in an integer. Every cross-chunk or cross-store reference goes through a real `[]Node` slot that the GC scans.

## Where it stands (vscode, n=8, interleaved, HEAD vs main)

```
       │    main    │            arena-ast            │
       │ check-sec  │ check-sec   vs base             │
VSCode   7.188 ± 3%   7.247 ± 3%  ~ (p=0.234 n=8)

       │    main    │            arena-ast            │
       │ total-sec  │ total-sec   vs base             │
VSCode   8.185 ± 3%   8.057 ± 2%  ~ (p=0.488 n=8)

       │     main     │             arena-ast              │
       │    mem-B     │    mem-B      vs base              │
VSCode   3.302Gi ± 0%   3.212Gi ± 0%  -2.74% (p=0.000 n=8)
```

Single-threaded with GC off, this branch executes about 8% more instructions than main, but task time is within noise (+1.3%, p=0.13), since parsing is much cheaper and the extra instructions are well-predicted branches.

### Where the remaining instructions go

- **Following a parent** costs about 6 instructions vs 1 on main: load the ref, test near/far, add, plus the far path's code size, which keeps some callers just over the inlining budget (80). Main inlines many parent-walk helpers (`FindAncestor` closures, `getControlFlowContainer`, `GetRootDeclaration`) that this branch can't. This is inherent to storing no pointers. Cross-chunk deltas would break the unsafe rules.
- **Far refs are common**: on vscode, 1.9M far node refs, 1.0M of them parents, 113K far list refs, about 6 chunks per store. A one-chunk-per-file experiment (sizing the first chunk at 2× the source) removed nearly all of them but gained only −0.5% instructions and −0.8% time, so relocating into a single chunk isn't worth its memory.
- **Shared-member accessors** read a per-kind offset table, where main reads a fixed field of the embedded base.

Experiments that didn't pay: a zero check in side-table getters (+0.03% instructions), a cached source file in the chunk header (no inlining change), early-outs in `GetRootDeclaration` (−0.09%).

### How we got here (commit sequence)

1. Value-handle `Node` codemod (`*Node` → `Node`) across the compiler.
2. Store-backed records, side tables for pointer fields, and text refs.
3. Arena chunks with a noscan body.
4. Self-relative 32-bit refs with a far-ref table, which cost 6–8% of check time at the time.
5. **Absolute address refs** (check −5.59%, memory +4.85%). These hid pointers in `uintptr`s and were later removed.
6. **Slower chunk growth** (memory −2.63%).
7. **32-byte header** (memory −3.28%).
8. **Flattened records + offset tables** (memory −0.39%).
9. **Flow nodes in the arena** (memory −0.67%).
10. **32-bit block-indexed refs** (check +10.2%, memory −1.0%), which replaced the hidden pointers with real 32-bit refs.
11. **Field-relative refs** (check +6.3% vs step 9).
12. **Index-based store** (`Node = {store, index}`, check +5.5% vs step 9).
13. **Bind at parse, then freeze.**
14. **Flow nodes as indexed values** (memory −2.9%).
15. **Lists as records** (memory −3.2%).
16. **Iterate lists in place** (check −1.0%).
17. **Kind cached in the handle** (check −1.7%). At this point check was +13% vs main and memory −4.1%. Hardware counters showed +29% instructions, all in ref-following accessors.
18. **Source file from the store** (check −1.8%).
19. **Record-address handles with self-relative refs** (`ba2d083f1da`, `2e5b2083626`). `Node` becomes a single pointer to a record in a never-moving chunk, and near refs are offsets from the field. This drops the 16–24 byte handle, which spilled around every call.
20. **Size-class chunks** (`4b85ba3d4f5`): no allocator rounding waste.
21. **Per-kind offset tables for shared members** (`ca2bc7e2fb7`).
22. **Ref encoding flip** (`a4fca73683b`): near refs carry the low bit, so the near decode is one add and parent walks inline.
23. **Accessors within the inlining budget** (`b65f487e501`).
24. **One text path** (`f6245c449b5`): source text and arena text are both pieces of one table, so `Text()` has no branch.
25. **Parent as a record-relative delta** (`86be7af1fdd`, −0.32% instructions).
26. **Zero refs tested first** (`1e5f65ab9fc`, −0.21% instructions): absent fields no longer load the far table.
27. **`GetNodeId` inlinable again** (`67837fcf02d`, −0.28% instructions).

## Next

- Find more places where the store can answer structurally what main answers by walking parents (as `GetSourceFileOfNode` does).
- Symbols as per-store typed arrays addressed by index, which would shrink the remaining GC-scanned side tables.

## Historical: earlier measurements (step 9 vs main, vscode, n=10, interleaved)

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
| **Lists in the arena** (done, step 15) | Store `NodeList`, `ModifierList` and `[]Node` as inline ref arrays in chunks instead of side-table slices. | About −50–100MB, fewer GC-visible slices, and better locality in `ForEachChild`. | Medium: the list API currently hands out `*NodeList` / `[]Node`, so it needs a view type. |
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
