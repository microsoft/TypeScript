package ast

import (
	"reflect"
	"slices"
	"strconv"
	"testing"
	"unsafe"

	"gotest.tools/v3/assert"
)

// Records must hold no Go pointers, so the garbage collector can skip
// them; pointer-valued fields belong in the store's side tables.
func TestNodeRecordsArePointerFree(t *testing.T) {
	t.Parallel()
	for layout := nodeLayout(1); layout < layoutCount; layout++ {
		if standaloneLayout(layout) {
			continue
		}
		typ := reflect.TypeOf(layoutRecord(layout))
		assert.Assert(t, typ != nil, "layout %d has no record type", layout)
		if path := findPointer(typ, typ.Name()); path != "" {
			t.Errorf("record field %s holds a pointer", path)
		}
	}
}

func findPointer(typ reflect.Type, path string) string {
	switch typ.Kind() {
	case reflect.Struct:
		for field := range typ.Fields() {
			if p := findPointer(field.Type, path+"."+field.Name); p != "" {
				return p
			}
		}
	case reflect.Array:
		return findPointer(typ.Elem(), path+"[]")
	case reflect.Pointer, reflect.String, reflect.Slice, reflect.Map, reflect.Interface, reflect.Func, reflect.Chan, reflect.UnsafePointer:
		return path + " (" + typ.String() + ")"
	}
	return ""
}

func TestNodeStoreChunks(t *testing.T) {
	t.Parallel()
	factory := NewNodeFactory(NodeFactoryHooks{})
	var statements []Node
	for i := range 20000 {
		statements = append(statements, factory.NewExpressionStatement(factory.NewIdentifier(strconv.Itoa(i))))
	}
	store := factory.store
	assert.Assert(t, len(store.chunks) > 2, "nodes should span several chunks")
	chunkOf := func(n Node) int {
		return slices.Index(store.chunks, unsafe.Add(n.p, -int(n.hdr().self)*int(wordSize)))
	}
	crossed := 0
	for i, statement := range statements {
		expression := statement.Expression()
		if chunkOf(expression) != chunkOf(statement) {
			crossed++
		}
		assert.Equal(t, expression.Text(), strconv.Itoa(i))
		assert.Equal(t, expression.store(), store)
		expression.SetParent(statement)
		assert.Equal(t, expression.Parent(), statement)
	}
	assert.Assert(t, crossed > 0, "some children should be in an earlier chunk than their parents")
	factory.CompactStore()
	assert.Equal(t, statements[0].Expression().Text(), "0")
}

func TestNodeSideTableZeroValues(t *testing.T) {
	t.Parallel()
	factory := NewNodeFactory(NodeFactoryHooks{})
	node := factory.NewBlock(nil, false)
	assert.Equal(t, len(factory.store.nodeLists.items), 0)
	assert.Assert(t, node.AsBlock().Locals() == nil)

	locals := SymbolTable{}
	node.AsBlock().SetLocals(locals)
	assert.Assert(t, node.AsBlock().Locals() != nil)
	node.AsBlock().SetLocals(nil)
	assert.Assert(t, node.AsBlock().Locals() == nil)
	assert.Equal(t, len(factory.store.symbolTables.items), 1)
}

func TestNodeTextRefs(t *testing.T) {
	t.Parallel()
	factory := NewNodeFactory(NodeFactoryHooks{})
	source := "let alpha = beta;"
	factory.SetSourceText(source)
	inSource := factory.NewIdentifier(source[4:9])
	assert.Equal(t, factory.store.texts.next, uint32(0))
	synthesized := factory.NewIdentifier("gamma")
	empty := factory.NewIdentifier("")
	var long []Node
	for i := range 2000 {
		long = append(long, factory.NewIdentifier(strconv.Itoa(i)+string(make([]byte, i))))
	}
	assert.Equal(t, inSource.Text(), "alpha")
	assert.Equal(t, synthesized.Text(), "gamma")
	assert.Equal(t, empty.Text(), "")
	for i, node := range long {
		assert.Equal(t, node.Text(), strconv.Itoa(i)+string(make([]byte, i)))
	}
}
