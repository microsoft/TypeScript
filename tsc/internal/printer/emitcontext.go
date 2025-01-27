package printer

import (
	"fmt"
	"strings"
	"sync/atomic"

	"github.com/microsoft/typescript-go/internal/ast"
)

// Stores side-table information used during transformation that can be read by the printer to customize emit
type EmitContext struct {
	Factory      ast.NodeFactory
	autoGenerate map[*ast.MemberName]*autoGenerateInfo
	textSource   map[*ast.StringLiteralNode]*ast.Node
}

type AutoGenerateOptions struct {
	Flags  GeneratedIdentifierFlags
	Prefix string
	Suffix string
}

func (ctx *EmitContext) newGeneratedIdentifier(kind GeneratedIdentifierFlags, text string, options AutoGenerateOptions) (*ast.IdentifierNode, *autoGenerateInfo) {
	name := ctx.Factory.NewIdentifier(text)
	autoGenerate := &autoGenerateInfo{
		Id:     autoGenerateId(nextAutoGenerateId.Add(1)),
		Flags:  kind | (options.Flags & ^GeneratedIdentifierFlagsKindMask),
		Prefix: options.Prefix,
		Suffix: options.Suffix,
	}
	if ctx.autoGenerate == nil {
		ctx.autoGenerate = make(map[*ast.MemberName]*autoGenerateInfo)
	}
	ctx.autoGenerate[name] = autoGenerate
	return name, autoGenerate
}

func (ctx *EmitContext) NewTempVariable(options AutoGenerateOptions) *ast.IdentifierNode {
	name, _ := ctx.newGeneratedIdentifier(GeneratedIdentifierFlagsAuto, "", options)
	return name
}

func (ctx *EmitContext) NewLoopVariable(options AutoGenerateOptions) *ast.IdentifierNode {
	name, _ := ctx.newGeneratedIdentifier(GeneratedIdentifierFlagsLoop, "", options)
	return name
}

func (ctx *EmitContext) NewUniqueName(text string, options AutoGenerateOptions) *ast.IdentifierNode {
	name, _ := ctx.newGeneratedIdentifier(GeneratedIdentifierFlagsUnique, text, options)
	return name
}

func (ctx *EmitContext) NewGeneratedNameForNode(node *ast.Node, options AutoGenerateOptions) *ast.IdentifierNode {
	if len(options.Prefix) > 0 || len(options.Suffix) > 0 {
		options.Flags |= GeneratedIdentifierFlagsOptimistic
	}

	// For debugging purposes, set the `text` of the identifier to a reasonable value
	var text string
	switch {
	case node == nil:
		text = formatGeneratedName(false /*privateName*/, options.Prefix, "" /*base*/, options.Suffix)
	case ast.IsMemberName(node):
		text = formatGeneratedName(false, options.Prefix, node.Text(), options.Suffix)
	default:
		text = fmt.Sprintf("generated@%v", ast.GetNodeId(node))
	}

	name, autoGenerate := ctx.newGeneratedIdentifier(GeneratedIdentifierFlagsNode, text, options)
	autoGenerate.Node = node
	return name
}

func (ctx *EmitContext) newGeneratedPrivateIdentifier(kind GeneratedIdentifierFlags, text string, options AutoGenerateOptions) (*ast.PrivateIdentifierNode, *autoGenerateInfo) {
	if !strings.HasPrefix(text, "#") {
		panic("First character of private identifier must be #: " + text)
	}

	name := ctx.Factory.NewPrivateIdentifier(text)
	autoGenerate := &autoGenerateInfo{
		Id:     autoGenerateId(nextAutoGenerateId.Add(1)),
		Flags:  kind | (options.Flags &^ GeneratedIdentifierFlagsKindMask),
		Prefix: options.Prefix,
		Suffix: options.Suffix,
	}
	if ctx.autoGenerate == nil {
		ctx.autoGenerate = make(map[*ast.MemberName]*autoGenerateInfo)
	}
	ctx.autoGenerate[name] = autoGenerate
	return name, autoGenerate
}

func (ctx *EmitContext) NewUniquePrivateName(text string, options AutoGenerateOptions) *ast.PrivateIdentifierNode {
	name, _ := ctx.newGeneratedPrivateIdentifier(GeneratedIdentifierFlagsUnique, text, options)
	return name
}

func (ctx *EmitContext) NewGeneratedPrivateNameForNode(node *ast.Node, options AutoGenerateOptions) *ast.PrivateIdentifierNode {
	if len(options.Prefix) > 0 || len(options.Suffix) > 0 {
		options.Flags |= GeneratedIdentifierFlagsOptimistic
	}

	var text string
	switch {
	case node == nil:
		text = formatGeneratedName(true /*privateName*/, options.Prefix, "" /*base*/, options.Suffix)
	case ast.IsMemberName(node):
		text = formatGeneratedName(true /*privateName*/, options.Prefix, node.Text(), options.Suffix)
	default:
		text = fmt.Sprintf("#generated@%v", ast.GetNodeId(node))
	}

	name, autoGenerate := ctx.newGeneratedPrivateIdentifier(GeneratedIdentifierFlagsNode, text, options)
	autoGenerate.Node = node
	return name
}

func (ctx *EmitContext) NewStringLiteralFromNode(textSourceNode *ast.Node) *ast.Node {
	var text string
	if ast.IsMemberName(textSourceNode) || ast.IsJsxNamespacedName(textSourceNode) {
		text = textSourceNode.Text()
	}
	node := ctx.Factory.NewStringLiteral(text)
	ctx.textSource[node] = textSourceNode
	return node
}

func (ctx *EmitContext) HasAutoGenerateInfo(node *ast.MemberName) bool {
	if node != nil {
		_, ok := ctx.autoGenerate[node]
		return ok
	}
	return false
}

var nextAutoGenerateId atomic.Uint32

type autoGenerateId uint32

type autoGenerateInfo struct {
	Flags  GeneratedIdentifierFlags // Specifies whether to auto-generate the text for an identifier.
	Id     autoGenerateId           // Ensures unique generated identifiers get unique names, but clones get the same name.
	Prefix string                   // Optional prefix to apply to the start of the generated name
	Suffix string                   // Optional suffix to apply to the end of the generated name
	Node   *ast.Node                // For a GeneratedIdentifierFlagsNode, the node from which to generate an identifier
}

func (info *autoGenerateInfo) Kind() GeneratedIdentifierFlags {
	return info.Flags & GeneratedIdentifierFlagsKindMask
}
