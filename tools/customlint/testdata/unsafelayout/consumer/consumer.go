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

func retag(node *ast.Node, kinds []ast.Kind) {
	for _, node.Kind = range kinds {
	}
}

func zeroResult() (n ast.Identifier) {
	return
}

func byValueParam(identifier ast.Identifier, identifiers [2]ast.Identifier) {}

func copies(records map[string]ast.Identifier, channel chan ast.Identifier, get func() ast.Identifier, slice []ast.Identifier) *ast.Identifier {
	record := records["key"]
	_ = <-channel
	_ = get()
	_ = slice[0]
	_ = &slice[0]
	_ = slice[0].Text
	_ = len(slice[:1])
	return &record
}

func rangeCopies(records []ast.Identifier, byKey map[string]ast.Identifier, channel chan ast.Identifier) {
	for _, record := range records {
		_ = record.Text
	}
	for _, record := range byKey {
		_ = record.Text
	}
	for record := range channel {
		_ = record.Text
	}
	for i := range records {
		_ = &records[i]
	}
}

func bulkCopies(dst, src []ast.Identifier, pointers []*ast.Identifier) []ast.Identifier {
	copy(dst, src)
	pointers = append(pointers, pointers...)
	copy(pointers, pointers)
	return append(dst, src...)
}
