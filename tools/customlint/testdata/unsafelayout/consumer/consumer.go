package consumer

import (
	"unsafe"

	"testdata/unsafelayout/internal/ast"
	"testdata/unsafelayout/internal/checker"
)

type BadNode ast.Node

type NodeAlias = ast.Node

type BorrowedNode struct {
	*ast.Node
}

func uses(node *ast.Node, declaration *ast.ImportDeclaration, kind ast.Kind, typ *checker.Type) {
	node.Kind = ast.KindIdentifier
	declaration.Kind = ast.KindImportDeclaration
	declaration.Kind = ast.KindJSImportDeclaration
	node.AsImportDeclaration().Kind = ast.KindImportDeclaration
	declaration.Kind = ast.KindIdentifier
	declaration.Kind = kind
	declaration.Kind++
	_ = &node.Kind
	_ = &ast.Node{Kind: ast.KindIdentifier}
	_ = &ast.Identifier{}
	_ = new(ast.Node)
	_ = new(ast.Identifier)
	_ = new(NodeAlias)
	_ = unsafe.Sizeof(ast.Node{})
	_ = unsafe.Offsetof(ast.Identifier{}.Node)
	_ = (*ast.Identifier)(unsafe.Pointer(node))
	_ = *node
	_ = *declaration
	_ = *typ
	copy := *node
	_ = copy
	pointer := unsafe.Pointer(node)
	_ = pointer
	borrowed := BorrowedNode{Node: node}
	borrowed.Kind = ast.KindIdentifier
	_ = &borrowed.Kind
}

type Pointer unsafe.Pointer

type PointerAlias = unsafe.Pointer

func zeroValues(node *ast.Node) {
	var identifier ast.Identifier
	_ = &identifier
	var identifiers [2]ast.Identifier
	_ = &identifiers[0]
	var holder struct{ identifier ast.Identifier }
	_ = &holder.identifier
	var pointers [2]*ast.Identifier
	_ = pointers
	_ = new([2]ast.Identifier)
	_ = make([]ast.Identifier, 1)
	_ = make([]*ast.Identifier, 1)
	_ = [2]ast.Identifier{}
	_ = (*ast.Identifier)(Pointer(node))
	_ = (*ast.Identifier)(PointerAlias(node))
}
