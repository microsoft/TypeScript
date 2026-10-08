package ast

import (
	"math"
	"runtime"
	"sync"
	"testing"
	"unsafe"
)

func TestArenaRecordBoundaries(t *testing.T) {
	t.Parallel()
	factory := NewNodeFactory(NodeFactoryHooks{})
	var nodes []Node
	for range 64 {
		for layout, size := range arenaNodeSizes {
			node := factory.newNode(KindUnknown, uint32(layout))
			if node.offset == 0 || node.offset&arenaForeignRef != 0 {
				t.Fatalf("invalid local offset %#x", node.offset)
			}
			if uintptr(unsafe.Pointer(node.id()))%8 != 0 {
				t.Fatal("node ID is not 64-bit aligned")
			}
			if (node.offset&arenaChunkMask)+uint32(size) > arenaChunkWords {
				t.Fatal("record crosses a chunk boundary")
			}
			words := unsafe.Slice(node.word(0), int(size))
			words[len(words)-1] = uint32(layout)
			GetNodeId(node)
			nodes = append(nodes, node)
		}
	}
	runtime.GC()
	for i, node := range nodes {
		layout := uint32(i % len(arenaNodeSizes))
		size := arenaNodeSizes[layout]
		if node.layout() != layout || node.uintField(int(size)-1) != layout {
			t.Fatal("record changed after arena growth or collection")
		}
		if node.id().Load() == 0 {
			t.Fatal("node ID was lost")
		}
	}
}

func TestArenaLargeFirstRecord(t *testing.T) {
	t.Parallel()
	var arena nodeArena
	offset := arena.allocate(arenaChunkWords - 2)
	if offset != 2 || arena.used != arena.capacity || arena.capacity != arenaChunkWords {
		t.Fatal("the reserved zero offset displaced the first record beyond its chunk")
	}
	next := arena.allocate(arenaHeaderWords)
	if next != arenaChunkWords {
		t.Fatal("the second record did not start in a new chunk")
	}
}

func TestArenaForeignReferenceDeduplication(t *testing.T) {
	t.Parallel()
	factory := NewNodeFactory(NodeFactoryHooks{})
	other := NewNodeFactory(NodeFactoryHooks{})
	local := factory.NewIdentifier("local")
	foreign := other.NewIdentifier("foreign")
	for range 64 {
		node := factory.NewBinaryExpression(nil, foreign, Node{}, factory.NewToken(KindPlusToken), foreign)
		node.SetParent(foreign)
		if node.AsBinaryExpression().Left() != foreign || node.Parent() != foreign {
			t.Fatal("foreign node identity was not preserved")
		}
		node.AsBinaryExpression().SetLeft(local)
		node.SetParent(Node{})
		if node.AsBinaryExpression().Left() != local || !node.Parent().IsNil() {
			t.Fatal("foreign edges could not be replaced with local or absent edges")
		}
	}
	if len(factory.file.arena.foreign) != 1 || len(factory.file.arena.foreignIndex) != 1 {
		t.Fatal("the same foreign handle was retained more than once")
	}
}

func TestArenaAtomicFields(t *testing.T) {
	t.Parallel()
	factory := NewNodeFactory(NodeFactoryHooks{})
	node := factory.NewBinaryExpression(nil, factory.NewIdentifier("left"), Node{}, factory.NewToken(KindPlusToken), factory.NewIdentifier("right"))
	facts := node.SubtreeFacts()
	var wait sync.WaitGroup
	for range 64 {
		wait.Go(func() {
			for range 128 {
				if GetNodeId(node) == 0 || node.SubtreeFacts() != facts {
					t.Error("atomic node metadata was not shared by handle copies")
					return
				}
			}
		})
	}
	wait.Wait()
}

func TestArenaPoolIndexOverflow(t *testing.T) {
	t.Parallel()
	if unsafe.Sizeof(int(0)) < 8 {
		t.Skip("a Go slice cannot exceed uint32 capacity on this architecture")
	}
	length := uint64(math.MaxUint32) + 1
	defer func() {
		if got := recover(); got != "AST arena side table exceeds its index capacity" {
			t.Fatalf("unexpected overflow result: %v", got)
		}
	}()
	arenaPoolIndex(int(length))
}
