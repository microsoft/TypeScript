package encoder

import (
	"encoding/binary"
	"errors"
	"fmt"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/tspath"
)

// astDecoder reconstructs real *ast.Node objects from binary-encoded data.
type astDecoder struct {
	raw       []byte
	strTable  uint32
	strData   uint32
	extData   uint32
	nodeOff   uint32
	nodeCount int
	factory   *ast.NodeFactory
	childBuf  []int
	// Single Go string covering all string data; substrings are zero-alloc slices.
	allStringData string
	// Arena for batch-allocating []*ast.Node slices used by NodeLists.
	nodeArena []*ast.Node
	// Results
	nodes     []*ast.Node
	nodeLists []*ast.NodeList
}

// DecodeSourceFile decodes binary-encoded data into an *ast.SourceFile.
func DecodeSourceFile(data []byte) (*ast.SourceFile, error) {
	node, err := DecodeNodes(data)
	if err != nil {
		return nil, err
	}
	if node.Kind != ast.KindSourceFile {
		return nil, fmt.Errorf("expected SourceFile root, got %v", node.Kind)
	}
	return node.AsSourceFile(), nil
}

// DecodeNodes decodes binary-encoded AST data into a tree of *ast.Node objects.
func DecodeNodes(data []byte) (*ast.Node, error) {
	d, err := newASTDecoder(data)
	if err != nil {
		return nil, err
	}
	return d.decode()
}

func newASTDecoder(data []byte) (*astDecoder, error) {
	if len(data) < HeaderSize {
		return nil, fmt.Errorf("data too short for header: %d bytes", len(data))
	}
	version := data[HeaderOffsetMetadata+3]
	if version != ProtocolVersion {
		return nil, fmt.Errorf("unsupported protocol version %d (expected %d)", version, ProtocolVersion)
	}

	strTable := readLE32(data, HeaderOffsetStringOffsets)
	strData := readLE32(data, HeaderOffsetStringData)
	extData := readLE32(data, HeaderOffsetExtendedData)
	nodeOff := readLE32(data, HeaderOffsetNodes)

	dataLen := uint32(len(data))

	// Validate that all offsets are within the buffer.
	if strTable > dataLen || strData > dataLen || extData > dataLen || nodeOff > dataLen {
		return nil, fmt.Errorf("invalid AST header offsets: offsets exceed data length (%d)", dataLen)
	}

	// Validate monotonic non-decreasing order of regions.
	if !(strTable <= strData && strData <= extData && extData <= nodeOff) {
		return nil, fmt.Errorf("invalid AST header offsets: expected strTable <= strData <= extData <= nodeOff (got %d, %d, %d, %d)", strTable, strData, extData, nodeOff)
	}

	d := &astDecoder{
		raw:      data,
		strTable: strTable,
		strData:  strData,
		extData:  extData,
		nodeOff:  nodeOff,
		factory:  ast.NewNodeFactory(ast.NodeFactoryHooks{}),
	}

	d.nodeCount = (len(data) - int(d.nodeOff)) / NodeSize

	// Convert entire string data region to a single Go string upfront.
	// Substringing a Go string shares the backing array, so subsequent
	// getString calls produce substrings with zero allocations.
	d.allStringData = string(data[d.strData:])

	return d, nil
}

// allocNodeSlice returns a zero-length slice with the given capacity, backed by
// the pre-allocated nodeArena. This avoids a heap allocation per NodeList.
func (d *astDecoder) allocNodeSlice(capacity int) []*ast.Node {
	start := len(d.nodeArena)
	d.nodeArena = d.nodeArena[:start+capacity]
	return d.nodeArena[start : start : start+capacity]
}

// nodeField reads a uint32 field from node i at the given field offset.
func (d *astDecoder) nodeField(i int, field int) uint32 {
	return readLE32(d.raw, int(d.nodeOff)+i*NodeSize+field)
}

func (d *astDecoder) getString(idx uint32) string {
	offBase := int(d.strTable) + int(idx)*4
	start := readLE32(d.raw, offBase)
	end := readLE32(d.raw, offBase+4)
	return d.allStringData[start:end]
}

// collectChildren returns indices of direct children of node i.
// The returned slice is reused across calls; callers must not retain it.
func (d *astDecoder) collectChildren(i int) []int {
	d.childBuf = d.childBuf[:0]
	if i+1 >= d.nodeCount {
		return d.childBuf
	}
	firstChild := i + 1
	if d.nodeField(firstChild, NodeOffsetParent) != uint32(i) {
		return d.childBuf
	}
	d.childBuf = append(d.childBuf, firstChild)
	next := int(d.nodeField(firstChild, NodeOffsetNext))
	for next != 0 {
		d.childBuf = append(d.childBuf, next)
		next = int(d.nodeField(next, NodeOffsetNext))
	}
	return d.childBuf
}

func (d *astDecoder) decode() (*ast.Node, error) {
	if d.nodeCount < 2 {
		return nil, errors.New("no nodes to decode")
	}

	d.nodes = make([]*ast.Node, d.nodeCount)
	d.nodeLists = make([]*ast.NodeList, d.nodeCount)
	// Pre-allocate arena for NodeList child slices. Each node can appear as a
	// child at most once, so nodeCount is an upper bound on total child pointers.
	d.nodeArena = make([]*ast.Node, 0, d.nodeCount)

	// Process bottom-up so children exist before parents.
	for i := d.nodeCount - 1; i >= 1; i-- {
		kind := d.nodeField(i, NodeOffsetKind)
		pos := d.nodeField(i, NodeOffsetPos)
		end := d.nodeField(i, NodeOffsetEnd)
		data := d.nodeField(i, NodeOffsetData)
		childIndices := d.collectChildren(i)

		if kind == SyntaxKindNodeList {
			childNodes := d.allocNodeSlice(len(childIndices))
			for _, ci := range childIndices {
				if d.nodes[ci] != nil {
					childNodes = append(childNodes, d.nodes[ci])
				}
			}
			nl := d.factory.NewNodeList(childNodes)
			nl.Loc = core.NewTextRange(int(pos), int(end))
			d.nodeLists[i] = nl
			continue
		}

		node, err := d.createNode(ast.Kind(kind), data, childIndices)
		if err != nil {
			return nil, fmt.Errorf("at node %d (kind %v): %w", i, ast.Kind(kind), err)
		}
		node.Loc = core.NewTextRange(int(pos), int(end))
		d.nodes[i] = node
	}

	return d.nodes[1], nil
}

// getModifierList creates a *ast.ModifierList from a child index that is a NodeList.
func (d *astDecoder) getModifierList(ci int) *ast.ModifierList {
	nl := d.nodeLists[ci]
	if nl == nil {
		return nil
	}
	ml := d.factory.NewModifierList(nl.Nodes)
	ml.Loc = nl.Loc
	return ml
}

// childIterator helps walk through children based on a bitmask.
type childIterator struct {
	indices []int
	pos     int
}

func newChildIter(indices []int) childIterator {
	return childIterator{indices: indices}
}

// next returns the index of the next child, advancing the position.
func (it *childIterator) next() int {
	if it.pos >= len(it.indices) {
		return 0
	}
	ci := it.indices[it.pos]
	it.pos++
	return ci
}

// nextIf returns the index of the next child if the corresponding mask bit is set.
func (it *childIterator) nextIf(mask uint8, bit uint8) int {
	if mask&(1<<bit) == 0 {
		return 0
	}
	return it.next()
}

func (d *astDecoder) nodeAt(ci int) *ast.Node {
	if ci == 0 {
		return nil
	}
	return d.nodes[ci]
}

func (d *astDecoder) nodeListAt(ci int) *ast.NodeList {
	if ci == 0 {
		return nil
	}
	return d.nodeLists[ci]
}

func (d *astDecoder) modifierListAt(ci int) *ast.ModifierList {
	if ci == 0 {
		return nil
	}
	return d.getModifierList(ci)
}

func (d *astDecoder) createNode(kind ast.Kind, data uint32, childIndices []int) (*ast.Node, error) {
	dataType := data & NodeDataTypeMask
	definedBits := uint8((data >> 24) & 0x3f)

	switch dataType {
	case NodeDataTypeString:
		return d.createStringNode(kind, data, definedBits)
	case NodeDataTypeExtendedData:
		return d.createExtendedNode(kind, data, childIndices, definedBits)
	default:
		return d.createChildrenNode(kind, data, childIndices, definedBits)
	}
}

func (d *astDecoder) createStringNode(kind ast.Kind, data uint32, definedBits uint8) (*ast.Node, error) {
	strIdx := data & NodeDataStringIndexMask
	text := d.getString(strIdx)

	switch kind {
	case ast.KindIdentifier:
		return d.factory.NewIdentifier(text), nil
	case ast.KindPrivateIdentifier:
		return d.factory.NewPrivateIdentifier(text), nil
	case ast.KindStringLiteral:
		return d.factory.NewStringLiteral(text, 0), nil
	case ast.KindNumericLiteral:
		return d.factory.NewNumericLiteral(text, 0), nil
	case ast.KindBigIntLiteral:
		return d.factory.NewBigIntLiteral(text, 0), nil
	case ast.KindRegularExpressionLiteral:
		return d.factory.NewRegularExpressionLiteral(text, 0), nil
	case ast.KindNoSubstitutionTemplateLiteral:
		return d.factory.NewNoSubstitutionTemplateLiteral(text, 0), nil
	case ast.KindJsxText:
		containsOnly := definedBits&1 != 0
		return d.factory.NewJsxText(text, containsOnly), nil
	case ast.KindJSDocText:
		return d.factory.NewJSDocText([]string{text}), nil
	default:
		return nil, fmt.Errorf("unknown string node kind %v", kind)
	}
}

func (d *astDecoder) createExtendedNode(kind ast.Kind, data uint32, childIndices []int, definedBits uint8) (*ast.Node, error) {
	extOff := int(d.extData) + int(data&NodeDataStringIndexMask)

	switch kind {
	case ast.KindSourceFile:
		textIdx := readLE32(d.raw, extOff)
		fileNameIdx := readLE32(d.raw, extOff+4)
		pathIdx := readLE32(d.raw, extOff+8)
		text := d.getString(textIdx)
		fileName := d.getString(fileNameIdx)
		path := d.getString(pathIdx)

		// Recover parse options from header.
		parseOpts := readLE32(d.raw, HeaderOffsetParseOptions)
		opts := ast.SourceFileParseOptions{
			FileName: fileName,
			Path:     tspath.Path(path),
			ExternalModuleIndicatorOptions: ast.ExternalModuleIndicatorOptions{
				JSX:   parseOpts&1 != 0,
				Force: parseOpts&2 != 0,
			},
		}

		// Collect children: first is statements NodeList, second is EndOfFile.
		var stmts *ast.NodeList
		var endOfFile *ast.Node
		for _, ci := range childIndices {
			if d.nodeField(ci, NodeOffsetKind) == SyntaxKindNodeList {
				stmts = d.nodeListAt(ci)
			} else if d.nodes[ci] != nil && d.nodes[ci].Kind == ast.KindEndOfFile {
				endOfFile = d.nodes[ci]
			}
		}
		if endOfFile == nil {
			endOfFile = d.factory.NewToken(ast.KindEndOfFile)
		}
		return d.factory.NewSourceFile(opts, text, stmts, endOfFile), nil

	case ast.KindTemplateHead:
		textIdx := readLE32(d.raw, extOff)
		rawTextIdx := readLE32(d.raw, extOff+4)
		flags := readLE32(d.raw, extOff+8)
		return d.factory.NewTemplateHead(d.getString(textIdx), d.getString(rawTextIdx), ast.TokenFlags(flags)), nil

	case ast.KindTemplateMiddle:
		textIdx := readLE32(d.raw, extOff)
		rawTextIdx := readLE32(d.raw, extOff+4)
		flags := readLE32(d.raw, extOff+8)
		return d.factory.NewTemplateMiddle(d.getString(textIdx), d.getString(rawTextIdx), ast.TokenFlags(flags)), nil

	case ast.KindTemplateTail:
		textIdx := readLE32(d.raw, extOff)
		rawTextIdx := readLE32(d.raw, extOff+4)
		flags := readLE32(d.raw, extOff+8)
		return d.factory.NewTemplateTail(d.getString(textIdx), d.getString(rawTextIdx), ast.TokenFlags(flags)), nil

	default:
		return nil, fmt.Errorf("unknown extended data node kind %v", kind)
	}
}

func (d *astDecoder) createChildrenNode(kind ast.Kind, data uint32, childIndices []int, definedBits uint8) (*ast.Node, error) {
	mask := uint8(data & NodeDataChildMask)

	switch kind {
	// === Multi-child nodes with property mask ===

	case ast.KindQualifiedName:
		it := newChildIter(childIndices)
		left := d.nodeAt(it.nextIf(mask, 0))
		right := d.nodeAt(it.nextIf(mask, 1))
		return d.factory.NewQualifiedName(left, right), nil

	case ast.KindTypeParameter:
		it := newChildIter(childIndices)
		mods := d.modifierListAt(it.nextIf(mask, 0))
		name := d.nodeAt(it.nextIf(mask, 1))
		constraint := d.nodeAt(it.nextIf(mask, 2))
		defaultType := d.nodeAt(it.nextIf(mask, 3))
		return d.factory.NewTypeParameterDeclaration(mods, name, constraint, defaultType), nil

	case ast.KindIfStatement:
		it := newChildIter(childIndices)
		expr := d.nodeAt(it.nextIf(mask, 0))
		thenStmt := d.nodeAt(it.nextIf(mask, 1))
		elseStmt := d.nodeAt(it.nextIf(mask, 2))
		return d.factory.NewIfStatement(expr, thenStmt, elseStmt), nil

	case ast.KindDoStatement:
		it := newChildIter(childIndices)
		stmt := d.nodeAt(it.nextIf(mask, 0))
		expr := d.nodeAt(it.nextIf(mask, 1))
		return d.factory.NewDoStatement(stmt, expr), nil

	case ast.KindWhileStatement:
		it := newChildIter(childIndices)
		expr := d.nodeAt(it.nextIf(mask, 0))
		stmt := d.nodeAt(it.nextIf(mask, 1))
		return d.factory.NewWhileStatement(expr, stmt), nil

	case ast.KindForStatement:
		it := newChildIter(childIndices)
		initializer := d.nodeAt(it.nextIf(mask, 0))
		condition := d.nodeAt(it.nextIf(mask, 1))
		incrementor := d.nodeAt(it.nextIf(mask, 2))
		stmt := d.nodeAt(it.nextIf(mask, 3))
		return d.factory.NewForStatement(initializer, condition, incrementor, stmt), nil

	case ast.KindForInStatement, ast.KindForOfStatement:
		it := newChildIter(childIndices)
		awaitMod := d.nodeAt(it.nextIf(mask, 0))
		initializer := d.nodeAt(it.nextIf(mask, 1))
		expr := d.nodeAt(it.nextIf(mask, 2))
		stmt := d.nodeAt(it.nextIf(mask, 3))
		return d.factory.NewForInOrOfStatement(kind, awaitMod, initializer, expr, stmt), nil

	case ast.KindWithStatement:
		it := newChildIter(childIndices)
		expr := d.nodeAt(it.nextIf(mask, 0))
		stmt := d.nodeAt(it.nextIf(mask, 1))
		return d.factory.NewWithStatement(expr, stmt), nil

	case ast.KindSwitchStatement:
		it := newChildIter(childIndices)
		expr := d.nodeAt(it.nextIf(mask, 0))
		caseBlock := d.nodeAt(it.nextIf(mask, 1))
		return d.factory.NewSwitchStatement(expr, caseBlock), nil

	case ast.KindCaseClause:
		it := newChildIter(childIndices)
		expr := d.nodeAt(it.nextIf(mask, 0))
		stmts := d.nodeListAt(it.nextIf(mask, 1))
		return d.factory.NewCaseOrDefaultClause(ast.KindCaseClause, expr, stmts), nil

	case ast.KindDefaultClause:
		it := newChildIter(childIndices)
		_ = it.nextIf(mask, 0) // expression slot (always nil for DefaultClause)
		stmts := d.nodeListAt(it.nextIf(mask, 1))
		return d.factory.NewCaseOrDefaultClause(ast.KindDefaultClause, nil, stmts), nil

	case ast.KindTryStatement:
		it := newChildIter(childIndices)
		tryBlock := d.nodeAt(it.nextIf(mask, 0))
		catchClause := d.nodeAt(it.nextIf(mask, 1))
		finallyBlock := d.nodeAt(it.nextIf(mask, 2))
		return d.factory.NewTryStatement(tryBlock, catchClause, finallyBlock), nil

	case ast.KindCatchClause:
		it := newChildIter(childIndices)
		varDecl := d.nodeAt(it.nextIf(mask, 0))
		block := d.nodeAt(it.nextIf(mask, 1))
		return d.factory.NewCatchClause(varDecl, block), nil

	case ast.KindLabeledStatement:
		it := newChildIter(childIndices)
		label := d.nodeAt(it.nextIf(mask, 0))
		stmt := d.nodeAt(it.nextIf(mask, 1))
		return d.factory.NewLabeledStatement(label, stmt), nil

	case ast.KindVariableStatement:
		it := newChildIter(childIndices)
		mods := d.modifierListAt(it.nextIf(mask, 0))
		declList := d.nodeAt(it.nextIf(mask, 1))
		return d.factory.NewVariableStatement(mods, declList), nil

	case ast.KindVariableDeclaration:
		it := newChildIter(childIndices)
		name := d.nodeAt(it.nextIf(mask, 0))
		excl := d.nodeAt(it.nextIf(mask, 1))
		typeNode := d.nodeAt(it.nextIf(mask, 2))
		init := d.nodeAt(it.nextIf(mask, 3))
		return d.factory.NewVariableDeclaration(name, excl, typeNode, init), nil

	case ast.KindParameter:
		it := newChildIter(childIndices)
		mods := d.modifierListAt(it.nextIf(mask, 0))
		dotDotDot := d.nodeAt(it.nextIf(mask, 1))
		name := d.nodeAt(it.nextIf(mask, 2))
		question := d.nodeAt(it.nextIf(mask, 3))
		typeNode := d.nodeAt(it.nextIf(mask, 4))
		init := d.nodeAt(it.nextIf(mask, 5))
		return d.factory.NewParameterDeclaration(mods, dotDotDot, name, question, typeNode, init), nil

	case ast.KindBindingElement:
		it := newChildIter(childIndices)
		dotDotDot := d.nodeAt(it.nextIf(mask, 0))
		propName := d.nodeAt(it.nextIf(mask, 1))
		name := d.nodeAt(it.nextIf(mask, 2))
		init := d.nodeAt(it.nextIf(mask, 3))
		return d.factory.NewBindingElement(dotDotDot, propName, name, init), nil

	case ast.KindFunctionDeclaration:
		it := newChildIter(childIndices)
		mods := d.modifierListAt(it.nextIf(mask, 0))
		asterisk := d.nodeAt(it.nextIf(mask, 1))
		name := d.nodeAt(it.nextIf(mask, 2))
		typeParams := d.nodeListAt(it.nextIf(mask, 3))
		params := d.nodeListAt(it.nextIf(mask, 4))
		retType := d.nodeAt(it.nextIf(mask, 5))
		body := d.nodeAt(it.nextIf(mask, 6))
		return d.factory.NewFunctionDeclaration(mods, asterisk, name, typeParams, params, retType, nil, body), nil

	case ast.KindInterfaceDeclaration:
		it := newChildIter(childIndices)
		mods := d.modifierListAt(it.nextIf(mask, 0))
		name := d.nodeAt(it.nextIf(mask, 1))
		typeParams := d.nodeListAt(it.nextIf(mask, 2))
		heritage := d.nodeListAt(it.nextIf(mask, 3))
		members := d.nodeListAt(it.nextIf(mask, 4))
		return d.factory.NewInterfaceDeclaration(mods, name, typeParams, heritage, members), nil

	case ast.KindTypeAliasDeclaration:
		it := newChildIter(childIndices)
		mods := d.modifierListAt(it.nextIf(mask, 0))
		name := d.nodeAt(it.nextIf(mask, 1))
		typeParams := d.nodeListAt(it.nextIf(mask, 2))
		typeNode := d.nodeAt(it.nextIf(mask, 3))
		return d.factory.NewTypeAliasDeclaration(mods, name, typeParams, typeNode), nil

	case ast.KindEnumMember:
		it := newChildIter(childIndices)
		name := d.nodeAt(it.nextIf(mask, 0))
		init := d.nodeAt(it.nextIf(mask, 1))
		return d.factory.NewEnumMember(name, init), nil

	case ast.KindEnumDeclaration:
		it := newChildIter(childIndices)
		mods := d.modifierListAt(it.nextIf(mask, 0))
		name := d.nodeAt(it.nextIf(mask, 1))
		members := d.nodeListAt(it.nextIf(mask, 2))
		return d.factory.NewEnumDeclaration(mods, name, members), nil

	case ast.KindModuleDeclaration:
		it := newChildIter(childIndices)
		mods := d.modifierListAt(it.nextIf(mask, 0))
		name := d.nodeAt(it.nextIf(mask, 1))
		body := d.nodeAt(it.nextIf(mask, 2))
		return d.factory.NewModuleDeclaration(mods, 0, name, body), nil

	case ast.KindImportEqualsDeclaration:
		isTypeOnly := definedBits&1 != 0
		it := newChildIter(childIndices)
		mods := d.modifierListAt(it.nextIf(mask, 0))
		name := d.nodeAt(it.nextIf(mask, 1))
		modRef := d.nodeAt(it.nextIf(mask, 2))
		return d.factory.NewImportEqualsDeclaration(mods, isTypeOnly, name, modRef), nil

	case ast.KindImportDeclaration, ast.KindJSImportDeclaration:
		it := newChildIter(childIndices)
		mods := d.modifierListAt(it.nextIf(mask, 0))
		importClause := d.nodeAt(it.nextIf(mask, 1))
		modSpecifier := d.nodeAt(it.nextIf(mask, 2))
		attrs := d.nodeAt(it.nextIf(mask, 3))
		return d.factory.NewImportDeclaration(mods, importClause, modSpecifier, attrs), nil

	case ast.KindImportSpecifier:
		isTypeOnly := definedBits&1 != 0
		it := newChildIter(childIndices)
		propName := d.nodeAt(it.nextIf(mask, 0))
		name := d.nodeAt(it.nextIf(mask, 1))
		return d.factory.NewImportSpecifier(isTypeOnly, propName, name), nil

	case ast.KindImportClause:
		bit0 := definedBits & 1
		bit1 := (definedBits >> 1) & 1
		var phaseModifier ast.Kind
		if bit0 != 0 {
			phaseModifier = ast.KindTypeKeyword
		} else if bit1 != 0 {
			phaseModifier = ast.KindDeferKeyword
		}
		it := newChildIter(childIndices)
		name := d.nodeAt(it.nextIf(mask, 0))
		namedBindings := d.nodeAt(it.nextIf(mask, 1))
		return d.factory.NewImportClause(phaseModifier, name, namedBindings), nil

	case ast.KindExportAssignment, ast.KindJSExportAssignment:
		isExportEquals := definedBits&1 != 0
		it := newChildIter(childIndices)
		mods := d.modifierListAt(it.nextIf(mask, 0))
		expr := d.nodeAt(it.nextIf(mask, 1))
		if kind == ast.KindJSExportAssignment {
			return d.factory.NewJSExportAssignment(nil, expr), nil
		}
		return d.factory.NewExportAssignment(mods, isExportEquals, nil, expr), nil

	case ast.KindNamespaceExportDeclaration:
		it := newChildIter(childIndices)
		mods := d.modifierListAt(it.nextIf(mask, 0))
		name := d.nodeAt(it.nextIf(mask, 1))
		return d.factory.NewNamespaceExportDeclaration(mods, name), nil

	case ast.KindExportDeclaration:
		isTypeOnly := definedBits&1 != 0
		it := newChildIter(childIndices)
		mods := d.modifierListAt(it.nextIf(mask, 0))
		exportClause := d.nodeAt(it.nextIf(mask, 1))
		modSpecifier := d.nodeAt(it.nextIf(mask, 2))
		attrs := d.nodeAt(it.nextIf(mask, 3))
		return d.factory.NewExportDeclaration(mods, isTypeOnly, exportClause, modSpecifier, attrs), nil

	case ast.KindExportSpecifier:
		isTypeOnly := definedBits&1 != 0
		it := newChildIter(childIndices)
		propName := d.nodeAt(it.nextIf(mask, 0))
		name := d.nodeAt(it.nextIf(mask, 1))
		return d.factory.NewExportSpecifier(isTypeOnly, propName, name), nil

	case ast.KindCallSignature:
		it := newChildIter(childIndices)
		typeParams := d.nodeListAt(it.nextIf(mask, 0))
		params := d.nodeListAt(it.nextIf(mask, 1))
		retType := d.nodeAt(it.nextIf(mask, 2))
		return d.factory.NewCallSignatureDeclaration(typeParams, params, retType), nil

	case ast.KindConstructSignature:
		it := newChildIter(childIndices)
		typeParams := d.nodeListAt(it.nextIf(mask, 0))
		params := d.nodeListAt(it.nextIf(mask, 1))
		retType := d.nodeAt(it.nextIf(mask, 2))
		return d.factory.NewConstructSignatureDeclaration(typeParams, params, retType), nil

	case ast.KindConstructor:
		it := newChildIter(childIndices)
		mods := d.modifierListAt(it.nextIf(mask, 0))
		typeParams := d.nodeListAt(it.nextIf(mask, 1))
		params := d.nodeListAt(it.nextIf(mask, 2))
		retType := d.nodeAt(it.nextIf(mask, 3))
		body := d.nodeAt(it.nextIf(mask, 4))
		return d.factory.NewConstructorDeclaration(mods, typeParams, params, retType, nil, body), nil

	case ast.KindGetAccessor:
		it := newChildIter(childIndices)
		mods := d.modifierListAt(it.nextIf(mask, 0))
		name := d.nodeAt(it.nextIf(mask, 1))
		typeParams := d.nodeListAt(it.nextIf(mask, 2))
		params := d.nodeListAt(it.nextIf(mask, 3))
		retType := d.nodeAt(it.nextIf(mask, 4))
		body := d.nodeAt(it.nextIf(mask, 5))
		return d.factory.NewGetAccessorDeclaration(mods, name, typeParams, params, retType, nil, body), nil

	case ast.KindSetAccessor:
		it := newChildIter(childIndices)
		mods := d.modifierListAt(it.nextIf(mask, 0))
		name := d.nodeAt(it.nextIf(mask, 1))
		typeParams := d.nodeListAt(it.nextIf(mask, 2))
		params := d.nodeListAt(it.nextIf(mask, 3))
		retType := d.nodeAt(it.nextIf(mask, 4))
		body := d.nodeAt(it.nextIf(mask, 5))
		return d.factory.NewSetAccessorDeclaration(mods, name, typeParams, params, retType, nil, body), nil

	case ast.KindIndexSignature:
		it := newChildIter(childIndices)
		mods := d.modifierListAt(it.nextIf(mask, 0))
		params := d.nodeListAt(it.nextIf(mask, 1))
		retType := d.nodeAt(it.nextIf(mask, 2))
		return d.factory.NewIndexSignatureDeclaration(mods, params, retType), nil

	case ast.KindMethodSignature:
		it := newChildIter(childIndices)
		mods := d.modifierListAt(it.nextIf(mask, 0))
		name := d.nodeAt(it.nextIf(mask, 1))
		postfix := d.nodeAt(it.nextIf(mask, 2))
		typeParams := d.nodeListAt(it.nextIf(mask, 3))
		params := d.nodeListAt(it.nextIf(mask, 4))
		retType := d.nodeAt(it.nextIf(mask, 5))
		return d.factory.NewMethodSignatureDeclaration(mods, name, postfix, typeParams, params, retType), nil

	case ast.KindMethodDeclaration:
		it := newChildIter(childIndices)
		mods := d.modifierListAt(it.nextIf(mask, 0))
		asterisk := d.nodeAt(it.nextIf(mask, 1))
		name := d.nodeAt(it.nextIf(mask, 2))
		postfix := d.nodeAt(it.nextIf(mask, 3))
		typeParams := d.nodeListAt(it.nextIf(mask, 4))
		params := d.nodeListAt(it.nextIf(mask, 5))
		retType := d.nodeAt(it.nextIf(mask, 6))
		body := d.nodeAt(it.nextIf(mask, 7))
		return d.factory.NewMethodDeclaration(mods, asterisk, name, postfix, typeParams, params, retType, nil, body), nil

	case ast.KindPropertySignature:
		it := newChildIter(childIndices)
		mods := d.modifierListAt(it.nextIf(mask, 0))
		name := d.nodeAt(it.nextIf(mask, 1))
		postfix := d.nodeAt(it.nextIf(mask, 2))
		typeNode := d.nodeAt(it.nextIf(mask, 3))
		init := d.nodeAt(it.nextIf(mask, 4))
		return d.factory.NewPropertySignatureDeclaration(mods, name, postfix, typeNode, init), nil

	case ast.KindPropertyDeclaration:
		it := newChildIter(childIndices)
		mods := d.modifierListAt(it.nextIf(mask, 0))
		name := d.nodeAt(it.nextIf(mask, 1))
		postfix := d.nodeAt(it.nextIf(mask, 2))
		typeNode := d.nodeAt(it.nextIf(mask, 3))
		init := d.nodeAt(it.nextIf(mask, 4))
		return d.factory.NewPropertyDeclaration(mods, name, postfix, typeNode, init), nil

	case ast.KindBinaryExpression:
		it := newChildIter(childIndices)
		left := d.nodeAt(it.nextIf(mask, 0))
		opToken := d.nodeAt(it.nextIf(mask, 1))
		right := d.nodeAt(it.nextIf(mask, 2))
		return d.factory.NewBinaryExpression(nil, left, nil, opToken, right), nil

	case ast.KindYieldExpression:
		it := newChildIter(childIndices)
		asterisk := d.nodeAt(it.nextIf(mask, 0))
		expr := d.nodeAt(it.nextIf(mask, 1))
		return d.factory.NewYieldExpression(asterisk, expr), nil

	case ast.KindArrowFunction:
		it := newChildIter(childIndices)
		mods := d.modifierListAt(it.nextIf(mask, 0))
		typeParams := d.nodeListAt(it.nextIf(mask, 1))
		params := d.nodeListAt(it.nextIf(mask, 2))
		retType := d.nodeAt(it.nextIf(mask, 3))
		eqGt := d.nodeAt(it.nextIf(mask, 4))
		body := d.nodeAt(it.nextIf(mask, 5))
		return d.factory.NewArrowFunction(mods, typeParams, params, retType, nil, eqGt, body), nil

	case ast.KindFunctionExpression:
		it := newChildIter(childIndices)
		mods := d.modifierListAt(it.nextIf(mask, 0))
		asterisk := d.nodeAt(it.nextIf(mask, 1))
		name := d.nodeAt(it.nextIf(mask, 2))
		typeParams := d.nodeListAt(it.nextIf(mask, 3))
		params := d.nodeListAt(it.nextIf(mask, 4))
		retType := d.nodeAt(it.nextIf(mask, 5))
		body := d.nodeAt(it.nextIf(mask, 6))
		return d.factory.NewFunctionExpression(mods, asterisk, name, typeParams, params, retType, nil, body), nil

	case ast.KindAsExpression:
		it := newChildIter(childIndices)
		expr := d.nodeAt(it.nextIf(mask, 0))
		typeNode := d.nodeAt(it.nextIf(mask, 1))
		return d.factory.NewAsExpression(expr, typeNode), nil

	case ast.KindSatisfiesExpression:
		it := newChildIter(childIndices)
		expr := d.nodeAt(it.nextIf(mask, 0))
		typeNode := d.nodeAt(it.nextIf(mask, 1))
		return d.factory.NewSatisfiesExpression(expr, typeNode), nil

	case ast.KindConditionalExpression:
		it := newChildIter(childIndices)
		cond := d.nodeAt(it.nextIf(mask, 0))
		question := d.nodeAt(it.nextIf(mask, 1))
		whenTrue := d.nodeAt(it.nextIf(mask, 2))
		colon := d.nodeAt(it.nextIf(mask, 3))
		whenFalse := d.nodeAt(it.nextIf(mask, 4))
		return d.factory.NewConditionalExpression(cond, question, whenTrue, colon, whenFalse), nil

	case ast.KindPropertyAccessExpression:
		it := newChildIter(childIndices)
		expr := d.nodeAt(it.nextIf(mask, 0))
		questionDot := d.nodeAt(it.nextIf(mask, 1))
		name := d.nodeAt(it.nextIf(mask, 2))
		return d.factory.NewPropertyAccessExpression(expr, questionDot, name, 0), nil

	case ast.KindElementAccessExpression:
		it := newChildIter(childIndices)
		expr := d.nodeAt(it.nextIf(mask, 0))
		questionDot := d.nodeAt(it.nextIf(mask, 1))
		argExpr := d.nodeAt(it.nextIf(mask, 2))
		return d.factory.NewElementAccessExpression(expr, questionDot, argExpr, 0), nil

	case ast.KindCallExpression:
		it := newChildIter(childIndices)
		expr := d.nodeAt(it.nextIf(mask, 0))
		questionDot := d.nodeAt(it.nextIf(mask, 1))
		typeArgs := d.nodeListAt(it.nextIf(mask, 2))
		args := d.nodeListAt(it.nextIf(mask, 3))
		return d.factory.NewCallExpression(expr, questionDot, typeArgs, args, 0), nil

	case ast.KindNewExpression:
		it := newChildIter(childIndices)
		expr := d.nodeAt(it.nextIf(mask, 0))
		typeArgs := d.nodeListAt(it.nextIf(mask, 1))
		args := d.nodeListAt(it.nextIf(mask, 2))
		return d.factory.NewNewExpression(expr, typeArgs, args), nil

	case ast.KindTemplateExpression:
		it := newChildIter(childIndices)
		head := d.nodeAt(it.nextIf(mask, 0))
		spans := d.nodeListAt(it.nextIf(mask, 1))
		return d.factory.NewTemplateExpression(head, spans), nil

	case ast.KindTemplateSpan:
		it := newChildIter(childIndices)
		expr := d.nodeAt(it.nextIf(mask, 0))
		literal := d.nodeAt(it.nextIf(mask, 1))
		return d.factory.NewTemplateSpan(expr, literal), nil

	case ast.KindTaggedTemplateExpression:
		it := newChildIter(childIndices)
		tag := d.nodeAt(it.nextIf(mask, 0))
		questionDot := d.nodeAt(it.nextIf(mask, 1))
		typeArgs := d.nodeListAt(it.nextIf(mask, 2))
		tmpl := d.nodeAt(it.nextIf(mask, 3))
		return d.factory.NewTaggedTemplateExpression(tag, questionDot, typeArgs, tmpl, 0), nil

	case ast.KindPropertyAssignment:
		it := newChildIter(childIndices)
		mods := d.modifierListAt(it.nextIf(mask, 0))
		name := d.nodeAt(it.nextIf(mask, 1))
		postfix := d.nodeAt(it.nextIf(mask, 2))
		init := d.nodeAt(it.nextIf(mask, 3))
		return d.factory.NewPropertyAssignment(mods, name, postfix, nil, init), nil

	case ast.KindShorthandPropertyAssignment:
		it := newChildIter(childIndices)
		mods := d.modifierListAt(it.nextIf(mask, 0))
		name := d.nodeAt(it.nextIf(mask, 1))
		postfix := d.nodeAt(it.nextIf(mask, 2))
		eqToken := d.nodeAt(it.nextIf(mask, 3))
		objInit := d.nodeAt(it.nextIf(mask, 4))
		return d.factory.NewShorthandPropertyAssignment(mods, name, postfix, nil, eqToken, objInit), nil

	case ast.KindTypeAssertionExpression:
		it := newChildIter(childIndices)
		typeNode := d.nodeAt(it.nextIf(mask, 0))
		expr := d.nodeAt(it.nextIf(mask, 1))
		return d.factory.NewTypeAssertion(typeNode, expr), nil

	case ast.KindConditionalType:
		it := newChildIter(childIndices)
		check := d.nodeAt(it.nextIf(mask, 0))
		extends := d.nodeAt(it.nextIf(mask, 1))
		trueType := d.nodeAt(it.nextIf(mask, 2))
		falseType := d.nodeAt(it.nextIf(mask, 3))
		return d.factory.NewConditionalTypeNode(check, extends, trueType, falseType), nil

	case ast.KindIndexedAccessType:
		it := newChildIter(childIndices)
		objType := d.nodeAt(it.nextIf(mask, 0))
		idxType := d.nodeAt(it.nextIf(mask, 1))
		return d.factory.NewIndexedAccessTypeNode(objType, idxType), nil

	case ast.KindTypeReference:
		it := newChildIter(childIndices)
		typeName := d.nodeAt(it.nextIf(mask, 0))
		typeArgs := d.nodeListAt(it.nextIf(mask, 1))
		return d.factory.NewTypeReferenceNode(typeName, typeArgs), nil

	case ast.KindExpressionWithTypeArguments:
		it := newChildIter(childIndices)
		expr := d.nodeAt(it.nextIf(mask, 0))
		typeArgs := d.nodeListAt(it.nextIf(mask, 1))
		return d.factory.NewExpressionWithTypeArguments(expr, typeArgs), nil

	case ast.KindTypePredicate:
		it := newChildIter(childIndices)
		assertsMod := d.nodeAt(it.nextIf(mask, 0))
		paramName := d.nodeAt(it.nextIf(mask, 1))
		typeNode := d.nodeAt(it.nextIf(mask, 2))
		return d.factory.NewTypePredicateNode(assertsMod, paramName, typeNode), nil

	case ast.KindImportType:
		isTypeOf := definedBits&1 != 0
		it := newChildIter(childIndices)
		arg := d.nodeAt(it.nextIf(mask, 0))
		attrs := d.nodeAt(it.nextIf(mask, 1))
		qualifier := d.nodeAt(it.nextIf(mask, 2))
		typeArgs := d.nodeListAt(it.nextIf(mask, 3))
		return d.factory.NewImportTypeNode(isTypeOf, arg, attrs, qualifier, typeArgs), nil

	case ast.KindImportAttribute:
		it := newChildIter(childIndices)
		name := d.nodeAt(it.nextIf(mask, 0))
		value := d.nodeAt(it.nextIf(mask, 1))
		return d.factory.NewImportAttribute(name, value), nil

	case ast.KindTypeQuery:
		it := newChildIter(childIndices)
		exprName := d.nodeAt(it.nextIf(mask, 0))
		typeArgs := d.nodeListAt(it.nextIf(mask, 1))
		return d.factory.NewTypeQueryNode(exprName, typeArgs), nil

	case ast.KindMappedType:
		it := newChildIter(childIndices)
		readonlyToken := d.nodeAt(it.nextIf(mask, 0))
		typeParam := d.nodeAt(it.nextIf(mask, 1))
		nameType := d.nodeAt(it.nextIf(mask, 2))
		questionToken := d.nodeAt(it.nextIf(mask, 3))
		typeNode := d.nodeAt(it.nextIf(mask, 4))
		members := d.nodeListAt(it.nextIf(mask, 5))
		return d.factory.NewMappedTypeNode(readonlyToken, typeParam, nameType, questionToken, typeNode, members), nil

	case ast.KindNamedTupleMember:
		it := newChildIter(childIndices)
		dotDotDot := d.nodeAt(it.nextIf(mask, 0))
		name := d.nodeAt(it.nextIf(mask, 1))
		question := d.nodeAt(it.nextIf(mask, 2))
		typeNode := d.nodeAt(it.nextIf(mask, 3))
		return d.factory.NewNamedTupleMember(dotDotDot, name, question, typeNode), nil

	case ast.KindFunctionType:
		it := newChildIter(childIndices)
		typeParams := d.nodeListAt(it.nextIf(mask, 0))
		params := d.nodeListAt(it.nextIf(mask, 1))
		retType := d.nodeAt(it.nextIf(mask, 2))
		return d.factory.NewFunctionTypeNode(typeParams, params, retType), nil

	case ast.KindConstructorType:
		it := newChildIter(childIndices)
		mods := d.modifierListAt(it.nextIf(mask, 0))
		typeParams := d.nodeListAt(it.nextIf(mask, 1))
		params := d.nodeListAt(it.nextIf(mask, 2))
		retType := d.nodeAt(it.nextIf(mask, 3))
		return d.factory.NewConstructorTypeNode(mods, typeParams, params, retType), nil

	case ast.KindTemplateLiteralType:
		it := newChildIter(childIndices)
		head := d.nodeAt(it.nextIf(mask, 0))
		spans := d.nodeListAt(it.nextIf(mask, 1))
		return d.factory.NewTemplateLiteralTypeNode(head, spans), nil

	case ast.KindTemplateLiteralTypeSpan:
		it := newChildIter(childIndices)
		typeNode := d.nodeAt(it.nextIf(mask, 0))
		literal := d.nodeAt(it.nextIf(mask, 1))
		return d.factory.NewTemplateLiteralTypeSpan(typeNode, literal), nil

	case ast.KindJsxElement:
		it := newChildIter(childIndices)
		opening := d.nodeAt(it.nextIf(mask, 0))
		children := d.nodeListAt(it.nextIf(mask, 1))
		closing := d.nodeAt(it.nextIf(mask, 2))
		return d.factory.NewJsxElement(opening, children, closing), nil

	case ast.KindJsxNamespacedName:
		it := newChildIter(childIndices)
		name := d.nodeAt(it.nextIf(mask, 0))
		ns := d.nodeAt(it.nextIf(mask, 1))
		return d.factory.NewJsxNamespacedName(name, ns), nil

	case ast.KindJsxOpeningElement:
		it := newChildIter(childIndices)
		tagName := d.nodeAt(it.nextIf(mask, 0))
		typeArgs := d.nodeListAt(it.nextIf(mask, 1))
		attrs := d.nodeAt(it.nextIf(mask, 2))
		return d.factory.NewJsxOpeningElement(tagName, typeArgs, attrs), nil

	case ast.KindJsxSelfClosingElement:
		it := newChildIter(childIndices)
		tagName := d.nodeAt(it.nextIf(mask, 0))
		typeArgs := d.nodeListAt(it.nextIf(mask, 1))
		attrs := d.nodeAt(it.nextIf(mask, 2))
		return d.factory.NewJsxSelfClosingElement(tagName, typeArgs, attrs), nil

	case ast.KindJsxFragment:
		it := newChildIter(childIndices)
		opening := d.nodeAt(it.nextIf(mask, 0))
		children := d.nodeListAt(it.nextIf(mask, 1))
		closing := d.nodeAt(it.nextIf(mask, 2))
		return d.factory.NewJsxFragment(opening, children, closing), nil

	case ast.KindJsxAttribute:
		it := newChildIter(childIndices)
		name := d.nodeAt(it.nextIf(mask, 0))
		init := d.nodeAt(it.nextIf(mask, 1))
		return d.factory.NewJsxAttribute(name, init), nil

	case ast.KindJsxExpression:
		it := newChildIter(childIndices)
		dotDotDot := d.nodeAt(it.nextIf(mask, 0))
		expr := d.nodeAt(it.nextIf(mask, 1))
		return d.factory.NewJsxExpression(dotDotDot, expr), nil

	case ast.KindJSDoc:
		it := newChildIter(childIndices)
		comment := d.nodeListAt(it.nextIf(mask, 0))
		tags := d.nodeListAt(it.nextIf(mask, 1))
		return d.factory.NewJSDoc(comment, tags), nil

	case ast.KindJSDocTypeTag:
		it := newChildIter(childIndices)
		tagName := d.nodeAt(it.nextIf(mask, 0))
		typeExpr := d.nodeAt(it.nextIf(mask, 1))
		comment := d.nodeListAt(it.nextIf(mask, 2))
		return d.factory.NewJSDocTypeTag(tagName, typeExpr, comment), nil

	case ast.KindJSDocTag:
		it := newChildIter(childIndices)
		tagName := d.nodeAt(it.nextIf(mask, 0))
		comment := d.nodeListAt(it.nextIf(mask, 1))
		return d.factory.NewJSDocUnknownTag(tagName, comment), nil

	case ast.KindJSDocTemplateTag:
		it := newChildIter(childIndices)
		tagName := d.nodeAt(it.nextIf(mask, 0))
		constraint := d.nodeAt(it.nextIf(mask, 1))
		typeParams := d.nodeListAt(it.nextIf(mask, 2))
		comment := d.nodeListAt(it.nextIf(mask, 3))
		return d.factory.NewJSDocTemplateTag(tagName, constraint, typeParams, comment), nil

	case ast.KindJSDocReturnTag:
		it := newChildIter(childIndices)
		tagName := d.nodeAt(it.nextIf(mask, 0))
		typeExpr := d.nodeAt(it.nextIf(mask, 1))
		comment := d.nodeListAt(it.nextIf(mask, 2))
		return d.factory.NewJSDocReturnTag(tagName, typeExpr, comment), nil

	case ast.KindJSDocPublicTag:
		it := newChildIter(childIndices)
		tagName := d.nodeAt(it.nextIf(mask, 0))
		comment := d.nodeListAt(it.nextIf(mask, 1))
		return d.factory.NewJSDocPublicTag(tagName, comment), nil

	case ast.KindJSDocPrivateTag:
		it := newChildIter(childIndices)
		tagName := d.nodeAt(it.nextIf(mask, 0))
		comment := d.nodeListAt(it.nextIf(mask, 1))
		return d.factory.NewJSDocPrivateTag(tagName, comment), nil

	case ast.KindJSDocProtectedTag:
		it := newChildIter(childIndices)
		tagName := d.nodeAt(it.nextIf(mask, 0))
		comment := d.nodeListAt(it.nextIf(mask, 1))
		return d.factory.NewJSDocProtectedTag(tagName, comment), nil

	case ast.KindJSDocReadonlyTag:
		it := newChildIter(childIndices)
		tagName := d.nodeAt(it.nextIf(mask, 0))
		comment := d.nodeListAt(it.nextIf(mask, 1))
		return d.factory.NewJSDocReadonlyTag(tagName, comment), nil

	case ast.KindJSDocOverrideTag:
		it := newChildIter(childIndices)
		tagName := d.nodeAt(it.nextIf(mask, 0))
		comment := d.nodeListAt(it.nextIf(mask, 1))
		return d.factory.NewJSDocOverrideTag(tagName, comment), nil

	case ast.KindJSDocDeprecatedTag:
		it := newChildIter(childIndices)
		tagName := d.nodeAt(it.nextIf(mask, 0))
		comment := d.nodeListAt(it.nextIf(mask, 1))
		return d.factory.NewJSDocDeprecatedTag(tagName, comment), nil

	case ast.KindJSDocSeeTag:
		it := newChildIter(childIndices)
		tagName := d.nodeAt(it.nextIf(mask, 0))
		nameExpr := d.nodeAt(it.nextIf(mask, 1))
		comment := d.nodeListAt(it.nextIf(mask, 2))
		return d.factory.NewJSDocSeeTag(tagName, nameExpr, comment), nil

	case ast.KindJSDocImplementsTag:
		it := newChildIter(childIndices)
		tagName := d.nodeAt(it.nextIf(mask, 0))
		className := d.nodeAt(it.nextIf(mask, 1))
		comment := d.nodeListAt(it.nextIf(mask, 2))
		return d.factory.NewJSDocImplementsTag(tagName, className, comment), nil

	case ast.KindJSDocAugmentsTag:
		it := newChildIter(childIndices)
		tagName := d.nodeAt(it.nextIf(mask, 0))
		className := d.nodeAt(it.nextIf(mask, 1))
		comment := d.nodeListAt(it.nextIf(mask, 2))
		return d.factory.NewJSDocAugmentsTag(tagName, className, comment), nil

	case ast.KindJSDocSatisfiesTag:
		it := newChildIter(childIndices)
		tagName := d.nodeAt(it.nextIf(mask, 0))
		typeExpr := d.nodeAt(it.nextIf(mask, 1))
		comment := d.nodeListAt(it.nextIf(mask, 2))
		return d.factory.NewJSDocSatisfiesTag(tagName, typeExpr, comment), nil

	case ast.KindJSDocThisTag:
		it := newChildIter(childIndices)
		tagName := d.nodeAt(it.nextIf(mask, 0))
		typeExpr := d.nodeAt(it.nextIf(mask, 1))
		comment := d.nodeListAt(it.nextIf(mask, 2))
		return d.factory.NewJSDocThisTag(tagName, typeExpr, comment), nil

	case ast.KindJSDocImportTag:
		it := newChildIter(childIndices)
		tagName := d.nodeAt(it.nextIf(mask, 0))
		importClause := d.nodeAt(it.nextIf(mask, 1))
		modSpecifier := d.nodeAt(it.nextIf(mask, 2))
		attrs := d.nodeAt(it.nextIf(mask, 3))
		comment := d.nodeListAt(it.nextIf(mask, 4))
		return d.factory.NewJSDocImportTag(tagName, importClause, modSpecifier, attrs, comment), nil

	case ast.KindJSDocCallbackTag:
		it := newChildIter(childIndices)
		tagName := d.nodeAt(it.nextIf(mask, 0))
		typeExpr := d.nodeAt(it.nextIf(mask, 1))
		fullName := d.nodeAt(it.nextIf(mask, 2))
		comment := d.nodeListAt(it.nextIf(mask, 3))
		return d.factory.NewJSDocCallbackTag(tagName, typeExpr, fullName, comment), nil

	case ast.KindJSDocOverloadTag:
		it := newChildIter(childIndices)
		tagName := d.nodeAt(it.nextIf(mask, 0))
		typeExpr := d.nodeAt(it.nextIf(mask, 1))
		comment := d.nodeListAt(it.nextIf(mask, 2))
		return d.factory.NewJSDocOverloadTag(tagName, typeExpr, comment), nil

	case ast.KindJSDocTypedefTag:
		it := newChildIter(childIndices)
		tagName := d.nodeAt(it.nextIf(mask, 0))
		typeExpr := d.nodeAt(it.nextIf(mask, 1))
		name := d.nodeAt(it.nextIf(mask, 2))
		comment := d.nodeListAt(it.nextIf(mask, 3))
		return d.factory.NewJSDocTypedefTag(tagName, typeExpr, name, comment), nil

	case ast.KindJSDocSignature:
		it := newChildIter(childIndices)
		typeParams := d.nodeListAt(it.nextIf(mask, 0))
		params := d.nodeListAt(it.nextIf(mask, 1))
		retType := d.nodeAt(it.nextIf(mask, 2))
		return d.factory.NewJSDocSignature(typeParams, params, retType), nil

	case ast.KindClassStaticBlockDeclaration:
		it := newChildIter(childIndices)
		mods := d.modifierListAt(it.nextIf(mask, 0))
		body := d.nodeAt(it.nextIf(mask, 1))
		return d.factory.NewClassStaticBlockDeclaration(mods, body), nil

	case ast.KindClassDeclaration:
		it := newChildIter(childIndices)
		mods := d.modifierListAt(it.nextIf(mask, 0))
		name := d.nodeAt(it.nextIf(mask, 1))
		typeParams := d.nodeListAt(it.nextIf(mask, 2))
		heritage := d.nodeListAt(it.nextIf(mask, 3))
		members := d.nodeListAt(it.nextIf(mask, 4))
		return d.factory.NewClassDeclaration(mods, name, typeParams, heritage, members), nil

	case ast.KindClassExpression:
		it := newChildIter(childIndices)
		mods := d.modifierListAt(it.nextIf(mask, 0))
		name := d.nodeAt(it.nextIf(mask, 1))
		typeParams := d.nodeListAt(it.nextIf(mask, 2))
		heritage := d.nodeListAt(it.nextIf(mask, 3))
		members := d.nodeListAt(it.nextIf(mask, 4))
		return d.factory.NewClassExpression(mods, name, typeParams, heritage, members), nil

	case ast.KindJSDocParameterTag, ast.KindJSDocPropertyTag:
		isBracketed := definedBits&1 != 0
		isNameFirst := (definedBits>>1)&1 != 0
		it := newChildIter(childIndices)
		tagName := d.nodeAt(it.nextIf(mask, 0))
		var typeExpr, name *ast.Node
		var comment *ast.NodeList
		if isNameFirst {
			name = d.nodeAt(it.nextIf(mask, 1))
			typeExpr = d.nodeAt(it.nextIf(mask, 2))
			comment = d.nodeListAt(it.nextIf(mask, 3))
		} else {
			typeExpr = d.nodeAt(it.nextIf(mask, 1))
			name = d.nodeAt(it.nextIf(mask, 2))
			comment = d.nodeListAt(it.nextIf(mask, 3))
		}
		if kind == ast.KindJSDocParameterTag {
			return d.factory.NewJSDocParameterTag(tagName, name, isBracketed, typeExpr, isNameFirst, comment), nil
		}
		return d.factory.NewJSDocPropertyTag(tagName, name, isBracketed, typeExpr, isNameFirst, comment), nil

	// === Single-child nodes (mask=0) ===

	case ast.KindBlock:
		multiline := definedBits&1 != 0
		var stmts *ast.NodeList
		if len(childIndices) > 0 {
			stmts = d.nodeListAt(childIndices[0])
		}
		return d.factory.NewBlock(stmts, multiline), nil

	case ast.KindVariableDeclarationList:
		flags := ast.NodeFlags(definedBits) << 24
		var decls *ast.NodeList
		if len(childIndices) > 0 {
			decls = d.nodeListAt(childIndices[0])
		}
		return d.factory.NewVariableDeclarationList(flags, decls), nil

	case ast.KindImportAttributes:
		multiLine := definedBits&1 != 0
		isAssert := (definedBits>>1)&1 != 0
		token := ast.KindWithKeyword
		if isAssert {
			token = ast.KindAssertKeyword
		}
		var attrs *ast.NodeList
		if len(childIndices) > 0 {
			attrs = d.nodeListAt(childIndices[0])
		}
		return d.factory.NewImportAttributes(token, attrs, multiLine), nil

	case ast.KindReturnStatement:
		return d.factory.NewReturnStatement(d.singleChild(childIndices)), nil
	case ast.KindThrowStatement:
		return d.factory.NewThrowStatement(d.singleChild(childIndices)), nil
	case ast.KindExpressionStatement:
		return d.factory.NewExpressionStatement(d.singleChild(childIndices)), nil
	case ast.KindBreakStatement:
		return d.factory.NewBreakStatement(d.singleChild(childIndices)), nil
	case ast.KindContinueStatement:
		return d.factory.NewContinueStatement(d.singleChild(childIndices)), nil
	case ast.KindParenthesizedExpression:
		return d.factory.NewParenthesizedExpression(d.singleChild(childIndices)), nil
	case ast.KindComputedPropertyName:
		return d.factory.NewComputedPropertyName(d.singleChild(childIndices)), nil
	case ast.KindDecorator:
		return d.factory.NewDecorator(d.singleChild(childIndices)), nil
	case ast.KindSpreadElement:
		return d.factory.NewSpreadElement(d.singleChild(childIndices)), nil
	case ast.KindSpreadAssignment:
		return d.factory.NewSpreadAssignment(d.singleChild(childIndices)), nil
	case ast.KindDeleteExpression:
		return d.factory.NewDeleteExpression(d.singleChild(childIndices)), nil
	case ast.KindTypeOfExpression:
		return d.factory.NewTypeOfExpression(d.singleChild(childIndices)), nil
	case ast.KindVoidExpression:
		return d.factory.NewVoidExpression(d.singleChild(childIndices)), nil
	case ast.KindAwaitExpression:
		return d.factory.NewAwaitExpression(d.singleChild(childIndices)), nil
	case ast.KindNonNullExpression:
		return d.factory.NewNonNullExpression(d.singleChild(childIndices), 0), nil
	case ast.KindExternalModuleReference:
		return d.factory.NewExternalModuleReference(d.singleChild(childIndices)), nil
	case ast.KindNamespaceImport:
		return d.factory.NewNamespaceImport(d.singleChild(childIndices)), nil
	case ast.KindNamespaceExport:
		return d.factory.NewNamespaceExport(d.singleChild(childIndices)), nil
	case ast.KindJsxClosingElement:
		return d.factory.NewJsxClosingElement(d.singleChild(childIndices)), nil
	case ast.KindArrayType:
		return d.factory.NewArrayTypeNode(d.singleChild(childIndices)), nil
	case ast.KindLiteralType:
		return d.factory.NewLiteralTypeNode(d.singleChild(childIndices)), nil
	case ast.KindInferType:
		return d.factory.NewInferTypeNode(d.singleChild(childIndices)), nil
	case ast.KindOptionalType:
		return d.factory.NewOptionalTypeNode(d.singleChild(childIndices)), nil
	case ast.KindRestType:
		return d.factory.NewRestTypeNode(d.singleChild(childIndices)), nil
	case ast.KindParenthesizedType:
		return d.factory.NewParenthesizedTypeNode(d.singleChild(childIndices)), nil
	case ast.KindJSDocTypeExpression:
		return d.factory.NewJSDocTypeExpression(d.singleChild(childIndices)), nil
	case ast.KindJSDocNonNullableType:
		return d.factory.NewJSDocNonNullableType(d.singleChild(childIndices)), nil
	case ast.KindJSDocNullableType:
		return d.factory.NewJSDocNullableType(d.singleChild(childIndices)), nil
	case ast.KindJSDocVariadicType:
		return d.factory.NewJSDocVariadicType(d.singleChild(childIndices)), nil
	case ast.KindJSDocOptionalType:
		return d.factory.NewJSDocOptionalType(d.singleChild(childIndices)), nil

	// Single NodeList child nodes (mask=0)
	case ast.KindArrayLiteralExpression:
		multiLine := definedBits&1 != 0
		var elements *ast.NodeList
		if len(childIndices) > 0 {
			elements = d.nodeListAt(childIndices[0])
		}
		return d.factory.NewArrayLiteralExpression(elements, multiLine), nil

	case ast.KindObjectLiteralExpression:
		multiLine := definedBits&1 != 0
		var props *ast.NodeList
		if len(childIndices) > 0 {
			props = d.nodeListAt(childIndices[0])
		}
		return d.factory.NewObjectLiteralExpression(props, multiLine), nil

	case ast.KindUnionType:
		return d.factory.NewUnionTypeNode(d.singleNodeListChild(childIndices)), nil
	case ast.KindIntersectionType:
		return d.factory.NewIntersectionTypeNode(d.singleNodeListChild(childIndices)), nil
	case ast.KindTupleType:
		return d.factory.NewTupleTypeNode(d.singleNodeListChild(childIndices)), nil
	case ast.KindNamedImports:
		return d.factory.NewNamedImports(d.singleNodeListChild(childIndices)), nil
	case ast.KindNamedExports:
		return d.factory.NewNamedExports(d.singleNodeListChild(childIndices)), nil
	case ast.KindModuleBlock:
		return d.factory.NewModuleBlock(d.singleNodeListChild(childIndices)), nil
	case ast.KindCaseBlock:
		return d.factory.NewCaseBlock(d.singleNodeListChild(childIndices)), nil
	case ast.KindTypeLiteral:
		return d.factory.NewTypeLiteralNode(d.singleNodeListChild(childIndices)), nil
	case ast.KindJsxAttributes:
		return d.factory.NewJsxAttributes(d.singleNodeListChild(childIndices)), nil

	case ast.KindArrayBindingPattern, ast.KindObjectBindingPattern:
		return d.factory.NewBindingPattern(kind, d.singleNodeListChild(childIndices)), nil

	case ast.KindHeritageClause:
		// Token (KindExtendsKeyword or KindImplementsKeyword) is not encoded; default to 0.
		return d.factory.NewHeritageClause(0, d.singleNodeListChild(childIndices)), nil

	case ast.KindJSDocTypeLiteral:
		isArrayType := definedBits&1 != 0
		var tags []*ast.Node
		if len(childIndices) > 0 {
			if nl := d.nodeListAt(childIndices[0]); nl != nil {
				tags = nl.Nodes
			}
		}
		node := d.factory.NewJSDocTypeLiteral(tags, isArrayType)
		return node, nil

	// Nodes with special non-child fields that are not encoded
	case ast.KindPrefixUnaryExpression:
		return d.factory.NewPrefixUnaryExpression(0, d.singleChild(childIndices)), nil
	case ast.KindPostfixUnaryExpression:
		return d.factory.NewPostfixUnaryExpression(d.singleChild(childIndices), 0), nil
	case ast.KindMetaProperty:
		return d.factory.NewMetaProperty(0, d.singleChild(childIndices)), nil
	case ast.KindTypeOperator:
		return d.factory.NewTypeOperatorNode(0, d.singleChild(childIndices)), nil

	// Nodes that only have a ModifierList child
	case ast.KindMissingDeclaration:
		var mods *ast.ModifierList
		if len(childIndices) > 0 {
			mods = d.modifierListAt(childIndices[0])
		}
		return d.factory.NewMissingDeclaration(mods), nil

	// Keyword type nodes (must be KeywordTypeNode, not Token, for the printer)
	case ast.KindAnyKeyword,
		ast.KindUnknownKeyword,
		ast.KindNumberKeyword,
		ast.KindBigIntKeyword,
		ast.KindObjectKeyword,
		ast.KindBooleanKeyword,
		ast.KindStringKeyword,
		ast.KindSymbolKeyword,
		ast.KindVoidKeyword,
		ast.KindUndefinedKeyword,
		ast.KindNeverKeyword,
		ast.KindIntrinsicKeyword:
		return d.factory.NewKeywordTypeNode(kind), nil

	// Token/keyword nodes with no children
	default:
		if len(childIndices) == 0 {
			return d.factory.NewToken(kind), nil
		}
		return nil, fmt.Errorf("unhandled node kind %v with %d children", kind, len(childIndices))
	}
}

func (d *astDecoder) singleChild(childIndices []int) *ast.Node {
	if len(childIndices) == 0 {
		return nil
	}
	return d.nodes[childIndices[0]]
}

func (d *astDecoder) singleNodeListChild(childIndices []int) *ast.NodeList {
	if len(childIndices) == 0 {
		return nil
	}
	return d.nodeLists[childIndices[0]]
}

func readLE32(data []byte, offset int) uint32 {
	if offset < 0 || offset+4 > len(data) {
		return 0
	}
	return binary.LittleEndian.Uint32(data[offset : offset+4])
}
