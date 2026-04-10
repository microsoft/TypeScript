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
		node.Flags = ast.NodeFlags(d.nodeField(i, NodeOffsetFlags))
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
	commonData := uint8((data >> 24) & 0x3f)

	switch dataType {
	case NodeDataTypeString:
		return d.createStringNode(kind, data, commonData)
	case NodeDataTypeExtendedData:
		return d.createExtendedNode(kind, data, childIndices, commonData)
	default:
		return d.createChildrenNode(kind, data, childIndices, commonData)
	}
}

func (d *astDecoder) decodeExtendedData_SourceFile(data uint32, childIndices []int, commonData uint8) (*ast.Node, error) {
	extOff := int(d.extData) + int(data&NodeDataStringIndexMask)

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
}

func (d *astDecoder) decodeExtendedData_TemplateHead(data uint32, childIndices []int, commonData uint8) (*ast.Node, error) {
	extOff := int(d.extData) + int(data&NodeDataStringIndexMask)
	textIdx := readLE32(d.raw, extOff)
	rawTextIdx := readLE32(d.raw, extOff+4)
	flags := readLE32(d.raw, extOff+8)
	return d.factory.NewTemplateHead(d.getString(textIdx), d.getString(rawTextIdx), ast.TokenFlags(flags)), nil
}

func (d *astDecoder) decodeExtendedData_TemplateMiddle(data uint32, childIndices []int, commonData uint8) (*ast.Node, error) {
	extOff := int(d.extData) + int(data&NodeDataStringIndexMask)
	textIdx := readLE32(d.raw, extOff)
	rawTextIdx := readLE32(d.raw, extOff+4)
	flags := readLE32(d.raw, extOff+8)
	return d.factory.NewTemplateMiddle(d.getString(textIdx), d.getString(rawTextIdx), ast.TokenFlags(flags)), nil
}

func (d *astDecoder) decodeExtendedData_TemplateTail(data uint32, childIndices []int, commonData uint8) (*ast.Node, error) {
	extOff := int(d.extData) + int(data&NodeDataStringIndexMask)
	textIdx := readLE32(d.raw, extOff)
	rawTextIdx := readLE32(d.raw, extOff+4)
	flags := readLE32(d.raw, extOff+8)
	return d.factory.NewTemplateTail(d.getString(textIdx), d.getString(rawTextIdx), ast.TokenFlags(flags)), nil
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

// Hand-written commonData decoding functions. Each extracts the original values
// from the 6-bit commonData that were packed by the corresponding
// getNodeCommonData_* function.

func decodeNodeCommonData_SyntheticExpression(_ uint8) (any, bool) {
	panic("SyntheticExpression should never be decoded")
}

// Hand-written extended data decoding functions for literal nodes.

func (d *astDecoder) decodeExtendedData_StringLiteral(data uint32, _ []int, _ uint8) (*ast.Node, error) {
	extOff := int(d.extData) + int(data&NodeDataStringIndexMask)
	textIdx := readLE32(d.raw, extOff)
	flags := readLE32(d.raw, extOff+4)
	return d.factory.NewStringLiteral(d.getString(textIdx), ast.TokenFlags(flags)), nil
}

func (d *astDecoder) decodeExtendedData_NumericLiteral(data uint32, _ []int, _ uint8) (*ast.Node, error) {
	extOff := int(d.extData) + int(data&NodeDataStringIndexMask)
	textIdx := readLE32(d.raw, extOff)
	flags := readLE32(d.raw, extOff+4)
	return d.factory.NewNumericLiteral(d.getString(textIdx), ast.TokenFlags(flags)), nil
}

func (d *astDecoder) decodeExtendedData_BigIntLiteral(data uint32, _ []int, _ uint8) (*ast.Node, error) {
	extOff := int(d.extData) + int(data&NodeDataStringIndexMask)
	textIdx := readLE32(d.raw, extOff)
	flags := readLE32(d.raw, extOff+4)
	return d.factory.NewBigIntLiteral(d.getString(textIdx), ast.TokenFlags(flags)), nil
}

func (d *astDecoder) decodeExtendedData_RegularExpressionLiteral(data uint32, _ []int, _ uint8) (*ast.Node, error) {
	extOff := int(d.extData) + int(data&NodeDataStringIndexMask)
	textIdx := readLE32(d.raw, extOff)
	flags := readLE32(d.raw, extOff+4)
	return d.factory.NewRegularExpressionLiteral(d.getString(textIdx), ast.TokenFlags(flags)), nil
}

func (d *astDecoder) decodeExtendedData_NoSubstitutionTemplateLiteral(data uint32, _ []int, _ uint8) (*ast.Node, error) {
	extOff := int(d.extData) + int(data&NodeDataStringIndexMask)
	textIdx := readLE32(d.raw, extOff)
	flags := readLE32(d.raw, extOff+4)
	return d.factory.NewNoSubstitutionTemplateLiteral(d.getString(textIdx), ast.TokenFlags(flags)), nil
}
