package ast

import (
	"unsafe"

	"github.com/microsoft/TypeScript/tsc/internal/linkarena"
)

// Nodes and node lists are allocated from arenas (see package linkarena) and refer to each
// other through 32-bit links. The garbage collector does not look inside arena memory, so
// what a node holds is kept alive in other ways:
//
//   - Links and the Parent pointer go through accessors, which record when a node refers to
//     a node of another factory.
//   - Strings and slices passed to a NodeFactory are registered with its arena.
//   - Any other pointer to a Go object that is stored in a node (a symbol, a flow node, a
//     symbol table) must be registered by whoever stores it; see KeepAlive.
//
// The exceptions are SourceFile nodes, the synthetic nodes of flow analysis and any Node
// that was not created by a NodeFactory. Those are ordinary Go objects, which cannot be the
// target of a link.

// link refers to a T in arena memory. It is 4 bytes wide.
type link[T any] struct {
	l linkarena.Link
}

func (l link[T]) get() *T {
	return (*T)(linkarena.At(l.l))
}

// set makes the link refer to p. The link itself and p must be in arena memory.
func (l *link[T]) set(p *T) {
	l.l = linkarena.LinkTo(unsafe.Pointer(l), unsafe.Pointer(p))
}

// arena returns the arena the node was allocated from, or nil for a node that is an
// ordinary Go object.
func (n *Node) arena() *linkarena.Arena {
	if !n.inArena {
		return nil
	}
	return linkarena.Of(unsafe.Pointer(n))
}

// Parent returns the node's parent.
func (n *Node) Parent() *Node {
	return n.parent
}

// SetParent sets the node's parent.
func (n *Node) SetParent(parent *Node) {
	n.parent = parent
	if parent != nil {
		n.refersTo(parent)
	}
}

// refersTo records that the node's memory holds a pointer to target.
func (n *Node) refersTo(target *Node) {
	if !n.inArena {
		// The collector sees what an ordinary Go object points to.
		return
	}
	if !target.inArena {
		linkarena.Of(unsafe.Pointer(n)).Keep(unsafe.Pointer(target), unsafe.Sizeof(*target))
		return
	}
	linkarena.Refer(unsafe.Pointer(n), unsafe.Pointer(target))
}

// KeepAlive keeps the Go object p points to alive for as long as node. It must be called
// when a pointer to a Go object is stored in a field of node or of its data, because the
// garbage collector does not see such pointers.
func KeepAlive[T any](node *Node, p *T) {
	if p == nil {
		return
	}
	if a := node.arena(); a != nil {
		a.Keep(unsafe.Pointer(p), unsafe.Sizeof(*p))
	}
}

// SetSymbol stores a symbol in a declaration node that was not created by the parser. (The
// binder keeps the symbols it gives to parsed nodes alive as a whole.)
func SetSymbol(node *Node, symbol *Symbol) {
	node.DeclarationData().Symbol = symbol
	KeepAlive(node, symbol)
}

// SetFlowNode stores a flow node in a node that was not created by the parser.
func SetFlowNode(node *Node, flowNode *FlowNode) {
	node.FlowNodeData().FlowNode = flowNode
	KeepAlive(node, flowNode)
}

// SetLocals stores a symbol table in a node that can have locals.
func SetLocals(container *Node, locals SymbolTable) {
	container.LocalsContainerData().Locals = locals
	keepSymbolTable(container, locals)
}

func keepSymbolTable(holder *Node, table SymbolTable) {
	if table == nil {
		return
	}
	if a := holder.arena(); a != nil {
		// A map value is a pointer to the map.
		a.Keep(*(*unsafe.Pointer)(unsafe.Pointer(&table)), 1)
	}
}

// mem returns the arena the factory allocates from.
func (f *NodeFactory) mem() *linkarena.Arena {
	if f.arena == nil {
		f.arena = linkarena.NewArena(0)
	}
	return f.arena
}

// newParseArena returns an arena for nodes parsed from sourceText. The arena keeps the text
// alive, so that the many strings that are slices of it need no registration of their own.
func newParseArena(sourceText string, sizeHint int) *linkarena.Arena {
	arena := linkarena.NewArena(sizeHint)
	if len(sourceText) != 0 {
		arena.Keep(unsafe.Pointer(unsafe.StringData(sourceText)), uintptr(len(sourceText)))
	}
	return arena
}

// StartParse readies the factory for building the syntax tree of sourceText in a new arena.
// progress reports how much of the text has been parsed; the arena uses it to avoid holding
// much more memory than the tree turns out to need. FinishParse must be called when the tree
// is complete. Until the factory is reset, every node placed in a node list must have been
// created by it.
func (f *NodeFactory) StartParse(sourceText string, progress linkarena.Progress) {
	// A syntax tree takes several times the size of its text. This first estimate only
	// decides the size of the first chunk, and a low one costs little.
	f.arena = newParseArena(sourceText, len(sourceText)*5)
	f.arena.TrackProgress(progress)
	f.parsing = true
	f.sourceText = sourceText
}

// FinishParse ends what StartParse began.
func (f *NodeFactory) FinishParse() {
	f.arena.TrackProgress(nil)
}

// StartLazyJSDocParse readies the factory for parsing a JSDoc comment of file on demand.
// All such comments of a file share one arena; a comment is far smaller than the smallest
// arena. The caller holds the lock that guards the file's JSDoc cache.
func (f *NodeFactory) StartLazyJSDocParse(file *SourceFile) {
	if file.lazyJSDocArena == nil {
		file.lazyJSDocArena = newParseArena(file.text, 0)
	}
	f.arena = file.lazyJSDocArena
	f.parsing = true
	f.sourceText = file.text
}

// Factories that are reset after each use keep allocating from the same arena until it has
// reached this size. A node that outlives its factory's reset keeps its whole arena alive,
// so starting a new arena for every use would cost a chunk for each such node, and keeping
// one arena forever would never release anything.
const maxReusedArenaSize = 64 << 10

// ReleaseArenas resets the factory so that the nodes it created can be collected once
// nothing refers to them.
func (f *NodeFactory) ReleaseArenas() {
	f.VerifyArena()
	arena := f.arena
	if arena != nil && arena.Size() >= maxReusedArenaSize {
		arena = nil
	}
	*f = NodeFactory{
		hooks:     f.hooks,
		arena:     arena,
		textCount: f.textCount,
		nodeCount: f.nodeCount,
	}
}

func newData[T any](f *NodeFactory) *T {
	return linkarena.New[T](f.mem())
}

// NewNodeSlice returns a slice for the elements of a node list created by this factory.
func (f *NodeFactory) NewNodeSlice(length int) []*Node {
	return linkarena.MakeSlice[*Node](f.mem(), length, length)
}

// keepString registers the data of a string stored in a node of the factory.
func (f *NodeFactory) keepString(s string) {
	if len(s) == 0 {
		return
	}
	data := unsafe.StringData(s)
	if uintptr(unsafe.Pointer(data))-uintptr(unsafe.Pointer(unsafe.StringData(f.sourceText))) < uintptr(len(f.sourceText)) {
		return
	}
	f.mem().Keep(unsafe.Pointer(data), uintptr(len(s)))
}

// keepSlice registers the backing array of a slice stored in a node of the factory. The
// array is an ordinary Go object, so the collector sees what its elements point to.
func keepSlice[T any](f *NodeFactory, s []T) {
	linkarena.KeepSlice(f.mem(), s)
}

// keepValue registers the object behind an interface value stored in a node of the factory.
func (f *NodeFactory) keepValue(v any) {
	if v != nil {
		// The second word of an interface value points to its data.
		f.mem().Keep((*[2]unsafe.Pointer)(unsafe.Pointer(&v))[1], 1)
	}
}

// keepNodes registers a slice of nodes stored in arena memory.
func (f *NodeFactory) keepNodes(nodes []*Node) {
	adoptNodes(f.mem(), nodes, f.parsing)
}

// adoptNodes makes arena keep alive what a slice of nodes, stored in the arena's memory,
// refers to. sameArena states that the nodes are known to belong to the arena.
func adoptNodes(arena *linkarena.Arena, nodes []*Node, sameArena bool) {
	if cap(nodes) == 0 {
		return
	}
	if !arena.Contains(unsafe.Pointer(unsafe.SliceData(nodes))) {
		// The backing array is an ordinary Go object: the collector sees its elements.
		linkarena.KeepSlice(arena, nodes)
		return
	}
	if sameArena {
		return
	}
	for _, node := range nodes {
		if node == nil {
			continue
		}
		if !node.inArena {
			arena.Keep(unsafe.Pointer(node), unsafe.Sizeof(*node))
		} else {
			arena.Use(unsafe.Pointer(node))
		}
	}
}

// SetNodes replaces the elements of the list.
func (list *NodeList) SetNodes(nodes []*Node) {
	list.Nodes = nodes
	adoptNodes(linkarena.Of(unsafe.Pointer(list)), nodes, false)
}

// VerifyArena checks, when verification is on (see package linkarena), that everything the
// nodes created by the factory refer to is kept alive, and panics otherwise.
func (f *NodeFactory) VerifyArena() {
	if f.arena != nil {
		verifyArena(f.arena, "a node factory")
	}
}

func verifyArena(arena *linkarena.Arena, owner string) {
	if !linkarena.Verifying() {
		return
	}
	if violations := arena.Verify(8); len(violations) != 0 {
		panic("nodes of " + owner + " refer to memory that is not kept alive:" + linkarena.FormatViolations(violations))
	}
}
