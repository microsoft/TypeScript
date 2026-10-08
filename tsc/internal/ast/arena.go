package ast

import (
	"math"
	"sync/atomic"
	"unsafe"

	"github.com/microsoft/TypeScript/tsc/internal/core"
)

const (
	arenaChunkShift = 12
	arenaChunkWords = 1 << arenaChunkShift
	arenaChunkMask  = arenaChunkWords - 1
	arenaForeignRef = uint32(1 << 31)
)

// Node is a comparable, source-file-relative handle. Its zero value is absent.
// Copies share identity and mutations; the source file owns their records.
type Node struct {
	file   *SourceFile
	offset uint32
}

// Records and their local edges contain no GC pointers. Chunks never move, so
// atomic IDs and subtree facts remain valid while a factory allocates more nodes.
type nodeArena struct {
	chunks       []unsafe.Pointer
	used         uint32
	capacity     uint32
	foreign      []Node
	foreignIndex map[Node]uint32
	nodeArenaPools
}

func (a *nodeArena) allocate(size uint32) uint32 {
	if size < arenaHeaderWords || size > arenaChunkWords-2 {
		panic("invalid AST arena record size")
	}
	size = (size + 1) &^ 1
	if len(a.chunks) == 0 || a.used+size > a.capacity {
		if len(a.chunks) >= int(arenaForeignRef>>arenaChunkShift) {
			panic("AST arena exceeds its node offset capacity")
		}
		words := min(max(a.capacity*2, 64), arenaChunkWords)
		words = max(words, size)
		if len(a.chunks) == 0 {
			words = max(words, size+2)
		}
		chunk := make([]uint64, words/2)
		a.chunks = append(a.chunks, unsafe.Pointer(&chunk[0]))
		a.capacity = words
		a.used = 0
		if len(a.chunks) == 1 {
			a.used = 2 // Reserve offset zero for an absent node.
		}
	}
	offset := uint32(len(a.chunks)-1)<<arenaChunkShift | a.used
	a.used += size
	return offset
}

func (n Node) IsNil() bool { return n.file == nil }

func (n Node) word(index int) *uint32 {
	offset := (n.offset & arenaChunkMask) + uint32(index)
	chunk := n.file.arena.chunks[n.offset>>arenaChunkShift]
	return (*uint32)(unsafe.Add(chunk, uintptr(offset)*4))
}

func (n Node) uintField(index int) uint32 {
	return *n.word(index)
}

func (n Node) setUintField(index int, value uint32) {
	*n.word(index) = value
}

func (n Node) atomicField(index int) *atomic.Uint32 {
	return (*atomic.Uint32)(unsafe.Pointer(n.word(index)))
}

// The layout remains immutable even when a transformer changes the syntax kind.
func (n Node) layout() uint32 { return n.uintField(7) }

func (n Node) checkLayout(layout uint32) {
	if n.layout() != layout {
		panic("AST node has incompatible arena layout")
	}
}

func (n Node) baseOffset(offsets *[arenaLayoutCount]uint8) int {
	offset := offsets[n.layout()]
	if offset == 0 {
		panic("AST node does not have the requested base field")
	}
	return int(offset)
}

func (n Node) id() *atomic.Uint64 {
	return (*atomic.Uint64)(unsafe.Pointer(n.word(0)))
}

func (n Node) Kind() Kind       { return Kind(n.uintField(3)) }
func (n Node) Flags() NodeFlags { return NodeFlags(n.uintField(2)) }
func (n Node) Loc() core.TextRange {
	return core.NewTextRange(int(int32(n.uintField(4))), int(int32(n.uintField(5))))
}
func (n Node) Parent() Node             { return n.nodeField(6) }
func (n Node) SetKind(kind Kind)        { n.setUintField(3, uint32(kind)) }
func (n Node) SetFlags(flags NodeFlags) { n.setUintField(2, uint32(flags)) }
func (n Node) SetLoc(loc core.TextRange) {
	n.setUintField(4, uint32(loc.Pos()))
	n.setUintField(5, uint32(loc.End()))
}
func (n Node) SetParent(parent Node) { n.setNodeField(6, parent) }

func (n Node) nodeField(index int) Node {
	return n.nodeFromOffset(n.uintField(index))
}

func (n Node) nodeFromOffset(offset uint32) Node {
	if offset == 0 {
		return Node{}
	}
	if offset&arenaForeignRef != 0 {
		return n.file.arena.foreign[(offset&^arenaForeignRef)-1]
	}
	return Node{file: n.file, offset: offset}
}

func (n Node) setNodeField(index int, value Node) {
	var offset uint32
	if !value.IsNil() {
		if value.file == n.file {
			offset = value.offset
		} else {
			a := &n.file.arena
			if a.foreignIndex == nil {
				a.foreignIndex = make(map[Node]uint32)
			}
			offset = a.foreignIndex[value]
			if offset == 0 {
				if uint64(len(a.foreign)) >= uint64(arenaForeignRef)-1 {
					panic("AST arena exceeds its foreign reference capacity")
				}
				a.foreign = append(a.foreign, value)
				offset = arenaForeignRef | uint32(len(a.foreign))
				a.foreignIndex[value] = offset
			}
		}
	}
	n.setUintField(index, offset)
}

func (f *NodeFactory) newNode(kind Kind, layout uint32) Node {
	if f.file == nil {
		f.file = &SourceFile{}
	}
	size := uint32(arenaNodeSizes[layout])
	if size < arenaHeaderWords {
		panic("AST node kind has no arena layout")
	}
	n := Node{file: f.file, offset: f.file.arena.allocate(size)}
	n.SetKind(kind)
	n.setUintField(7, layout)
	n.SetLoc(core.UndefinedTextRange())
	f.nodeCount++
	return n
}

func (f *NodeFactory) onCreate(node Node) {
	if f.hooks.OnCreate != nil {
		f.hooks.OnCreate(node)
	}
}

func arenaPoolIndex(length int) uint32 {
	if uint64(length) > math.MaxUint32 {
		panic("AST arena side table exceeds its index capacity")
	}
	return uint32(length)
}
