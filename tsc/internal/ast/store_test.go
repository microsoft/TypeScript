package ast

import (
	"reflect"
	"slices"
	"strconv"
	"testing"

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

// Records are ordered so that their only padding rounds out their size.
func TestNodeRecordsAreUnpadded(t *testing.T) {
	t.Parallel()
	for layout := nodeLayout(1); layout < layoutCount; layout++ {
		if standaloneLayout(layout) {
			continue
		}
		typ := reflect.TypeOf(layoutRecord(layout))
		var used uintptr
		for field := range typ.Fields() {
			used += field.Type.Size()
		}
		if typ.Size()-used >= uintptr(typ.Align()) {
			t.Errorf("record %s has %d bytes of padding", typ.Name(), typ.Size()-used)
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

func TestNodeStoreBlocks(t *testing.T) {
	t.Parallel()
	factory := NewNodeFactory(NodeFactoryHooks{})
	var statements []Node
	for i := range 20000 {
		statements = append(statements, factory.NewExpressionStatement(factory.NewIdentifier(strconv.Itoa(i))))
	}
	store := factory.store
	assert.Assert(t, store.nblocks > 2, "nodes should span several blocks")
	blockOfNode := func(n Node) int {
		return slices.Index(store.blocks[:store.nblocks], n.block())
	}
	crossed := 0
	for i, statement := range statements {
		expression := statement.Expression()
		if blockOfNode(expression) != blockOfNode(statement) {
			crossed++
		}
		assert.Equal(t, expression.Text(), strconv.Itoa(i))
		assert.Equal(t, expression.store(), store)
		expression.SetParent(statement)
		assert.Equal(t, expression.Parent(), statement)
	}
	assert.Assert(t, crossed > 0, "some children should be in an earlier block than their parents")
	assert.Equal(t, store.far.next, ref(0), "refs between blocks of a store should not be far")
	factory.CompactStore()
	assert.Equal(t, statements[0].Expression().Text(), "0")
}

func TestNodeStoreCrossStoreRefs(t *testing.T) {
	t.Parallel()
	a := NewNodeFactory(NodeFactoryHooks{})
	b := NewNodeFactory(NodeFactoryHooks{})
	target := a.NewIdentifier("x")
	first := b.NewExpressionStatement(target)
	second := b.NewExpressionStatement(target)
	assert.Equal(t, first.Expression(), target)
	assert.Equal(t, second.Expression(), target)
	assert.Equal(t, b.store.far.next, ref(1), "far refs to one target should share an entry")
	target.SetParent(first)
	assert.Equal(t, target.Parent(), first)
	first.AsExpressionStatement().SetExpression(Node{})
	assert.Assert(t, first.Expression().IsNil())
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
