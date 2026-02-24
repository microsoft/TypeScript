package encoder

import (
	"encoding/binary"
	"fmt"
	"slices"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/zeebo/xxh3"
)

const (
	NodeOffsetKind = iota * 4
	NodeOffsetPos
	NodeOffsetEnd
	NodeOffsetNext
	NodeOffsetParent
	NodeOffsetData
	// NodeSize is the number of bytes that represents a single node in the encoded format.
	NodeSize
)

const (
	NodeDataTypeChildren uint32 = iota << 30
	NodeDataTypeString
	NodeDataTypeExtendedData
)

const (
	NodeDataTypeMask        uint32 = 0xc0_00_00_00
	NodeDataChildMask       uint32 = 0x00_00_00_ff
	NodeDataStringIndexMask uint32 = 0x00_ff_ff_ff
)

const (
	SyntaxKindNodeList uint32 = 1<<32 - 1
)

const (
	HeaderOffsetMetadata = iota * 4
	HeaderOffsetHashLo0
	HeaderOffsetHashLo1
	HeaderOffsetHashHi0
	HeaderOffsetHashHi1
	HeaderOffsetParseOptions
	HeaderOffsetStringOffsets
	HeaderOffsetStringData
	HeaderOffsetExtendedData
	HeaderOffsetNodes
	HeaderSize
)

const (
	ProtocolVersion uint8 = 3
)

// Source File Binary Format
// =========================
//
// The following defines a protocol for serializing TypeScript SourceFile objects to a compact binary format. All integer
// values are little-endian.
//
// Overview
// --------
//
// The format comprises six sections:
//
// | Section            | Length             | Description                                                                                     |
// | ------------------ | ------------------ | ----------------------------------------------------------------------------------------------- |
// | Header             | 40 bytes           | Contains the content hash, parse options, flags, and byte offsets to the start of each section. |
// | String offsets     | 8 bytes per string | Pairs of starting byte offsets and ending byte offsets into the **string data** section.        |
// | String data        | variable           | UTF-8 encoded string data.                                                                      |
// | Extended node data | variable           | Extra data for some kinds of nodes.                                                             |
// | Nodes              | 24 bytes per node  | Defines the AST structure of the file, with references to strings and extended data.            |
//
// Header (40 bytes)
// -----------------
//
// The header contains the following fields:
//
// | Byte offset | Type      | Field                                             |
// | ----------- | --------- | ------------------------------------------------- |
// | 0           | uint8     | Protocol version                                  |
// | 1-3         |           | Reserved                                          |
// | 4-19        | uint128   | Source file content hash (xxh3, LE)               |
// | 20-23       | uint32    | Parse options (bitmask; bit 0: JSX, bit 1: Force) |
// | 24-27       | uint32    | Byte offset to string offsets section             |
// | 28-31       | uint32    | Byte offset to string data section                |
// | 32-35       | uint32    | Byte offset to extended node data section         |
// | 36-39       | uint32    | Byte offset to nodes section                      |
//
// String offsets (8 bytes per string)
// -----------------------------------
//
// Each string offset entry consists of two 4-byte unsigned integers, representing the start and end byte offsets into the
// **string data** section.
//
// String data (variable)
// ----------------------
//
// The string data section contains UTF-8 encoded string data. In typical cases, the entirety of the string data is the
// source file text, and individual nodes with string properties reference their positional slice of the file text. In
// cases where a node's string property is not equal to the slice of file text at its position, the unique string is
// appended to the string data section after the file text.
//
// Extended node data (variable)
// -----------------------------
//
// The extended node data section contains additional data for specific node types. The length and meaning of each entry
// is defined by the node type.
//
// Currently, the only node types that use this section are `TemplateHead`, `TemplateMiddle`, `TemplateTail`, and
// `SourceFile`. The extended data format for the first three is:
//
// | Byte offset | Type   | Field                                            |
// | ----------- | ------ | ------------------------------------------------ |
// | 0-4         | uint32 | Index of `text` in the string offsets section    |
// | 4-8         | uint32 | Index of `rawText` in the string offsets section |
// | 8-12        | uint32 | Value of `templateFlags`                         |
//
// and for `SourceFile` is:
//
// | Byte offset | Type   | Field                                             |
// | ----------- | ------ | ------------------------------------------------- |
// | 0-4         | uint32 | Index of `text` in the string offsets section     |
// | 4-8         | uint32 | Index of `fileName` in the string offsets section |
// | 8-12        | uint32 | Index of `path` in the string offsets section     |
// | 12-16       | uint32 | Index of `id` in the string offsets section       |
//
// Nodes (24 bytes per node)
// -------------------------
//
// The nodes section contains the AST structure of the file. Nodes are represented in a flat array in source order,
// heavily inspired by https://marvinh.dev/blog/speeding-up-javascript-ecosystem-part-11/. Each node has the following
// structure:
//
// | Byte offset | Type   | Field                      |
// | ----------- | ------ | -------------------------- |
// | 0-4         | uint32 | Kind                       |
// | 4-8         | uint32 | Pos                        |
// | 8-12        | uint32 | End                        |
// | 12-16       | uint32 | Node index of next sibling |
// | 16-20       | uint32 | Node index of parent       |
// | 20-24       |        | Node data                  |
//
// The first 24 bytes of the nodes section are zeros representing a nil node, such that nodes without a parent or next
// sibling can unambiuously use `0` for those indices.
//
// NodeLists are represented as normal nodes with the special `kind` value `0xff_ff_ff_ff`. They are considered the parent
// of their contents in the encoded format. A client reconstructing an AST similar to TypeScript's internal representation
// should instead set the `parent` pointers of a NodeList's children to the NodeList's parent. A NodeList's `data` field
// is the uint32 length of the list, and does not use one of the data types described below.
//
// For node types other than NodeList, the node data field encodes one of the following, determined by the first 2 bits of
// the field:
//
// | Value | Data type | Description                                                                          |
// | ----- | --------- | ------------------------------------------------------------------------------------ |
// | 0b00  | Children  | Disambiguates which named properties of the node its children should be assigned to. |
// | 0b01  | String    | The index of the node's string property in the **string offsets** section.           |
// | 0b10  | Extended  | The byte offset of the node's extended data into the **extended node data** section. |
// | 0b11  | Reserved  | Reserved for future use.                                                             |
//
// In all node data types, the remaining 6 bits of the first byte are used to encode booleans specific to the node type:
//
// | Node type                 | Bits 2-5 | Bit 1         | Bit 0                           |
// | ------------------------- | -------- | ------------- | ------------------------------- |
// | `ImportSpecifier`         |          |               | `isTypeOnly`                    |
// | `ImportClause`            |          |               | `isTypeOnly`                    |
// | `ExportSpecifier`         |          |               | `isTypeOnly`                    |
// | `ImportEqualsDeclaration` |          |               | `isTypeOnly`                    |
// | `ExportDeclaration`       |          |               | `isTypeOnly`                    |
// | `ImportTypeNode`          |          |               | `isTypeOf`                      |
// | `ExportAssignment`        |          |               | `isExportEquals`                |
// | `Block`                   |          |               | `multiline`                     |
// | `ArrayLiteralExpression`  |          |               | `multiline`                     |
// | `ObjectLiteralExpression` |          |               | `multiline`                     |
// | `JsxText`                 |          |               | `containsOnlyTriviaWhiteSpaces` |
// | `JSDocTypeLiteral`        |          |               | `isArrayType`                   |
// | `JsDocPropertyTag`        |          | `isNameFirst` | `isBracketed`                   |
// | `JsDocParameterTag`       |          | `isNameFirst` | `isBracketed`                   |
// | `VariableDeclarationList` |          | is `const`    | is `let`                        |
// | `ImportAttributes`        |          | is `assert`   | `multiline`                     |
//
// The remaining 3 bytes of the node data field vary by data type:
//
// ### Children (0b00)
//
// If a node has fewer children than its type allows, additional data is needed to determine which properties the children
// correspond to. The last byte of the 4-byte data field is a bitmask representing the child properties of the node type,
// in visitor order, where `1` indicates that the child at that property is present and `0` indicates that the property is
// nil. For example, a `MethodDeclaration` has the following child properties:
//
// | Property name  | Bit position |
// | -------------- | ------------ |
// | modifiers      | 0            |
// | asteriskToken  | 1            |
// | name           | 2            |
// | postfixToken   | 3            |
// | typeParameters | 4            |
// | parameters     | 5            |
// | returnType     | 6            |
// | body           | 7            |
//
// A bitmask with value `0b01100101` would indicate that the next four direct descendants (i.e., node records that have a
// `parent` set to the node index of the `MethodDeclaration`) of the node are its `modifiers`, `name`, `parameters`, and
// `body` properties, in that order. The remaining properties are nil. (To reconstruct the node with named properties, the
// client must consult a static table of each node type's child property names.)
//
// The bitmask may be zero for node types that can only have a single child, since no disambiguation is needed.
// Additionally, the children data type may be used for nodes that can never have children, but do not require other
// data types.
//
// ### String (0b01)
//
// The string data type is used for nodes with a single string property. (Currently, the name of that property is always
// `text`.) The last three bytes of the 4-byte data field form a single 24-bit unsigned integer (i.e.,
// `uint32(0x00_ff_ff_ff & node.data)`) _N_ that is an index into the **string offsets** section. The *N*th 32-bit
// unsigned integer in the **string offsets** section is the byte offset of the start of the string in the **string data**
// section, and the *N+1*th 32-bit unsigned integer is the byte offset of the end of the string in the
// **string data** section.
//
// ### Extended (0b10)
//
// The extended data type is used for nodes with properties that don't fit into either the children or string data types.
// The last three bytes of the 4-byte data field form a single 24-bit unsigned integer (i.e.,
// `uint32(0x00_ff_ff_ff & node.data)`) _N_ that is a byte offset into the **extended node data** section. The length and
// meaning of the data at that offset is defined by the node type. See the **Extended node data** section for details on
// the format of the extended data for specific node types.
//
// Encoding Arbitrary Nodes
// ------------------------
//
// The same binary format can be used to encode an arbitrary subtree of a SourceFile, not just a whole SourceFile. When
// encoding a non-SourceFile node, the format is identical with the following differences:
//
// - The content hash fields in the header (bytes 4-19) are zero.
// - The parse options field in the header (bytes 20-23) is zero.
// - The root node in the nodes section uses its actual node kind and data encoding (via getNodeData) rather than the
//   SourceFile-specific extended data format.
//
// The string data section contains only the strings referenced by nodes in the subtree, rather than the full source
// file text. The EncodeNode function provides this entrypoint.

// SourceFileHash returns the 128-bit content hash for a source file as a hex string.
func SourceFileHash(sourceFile *ast.SourceFile) string {
	h := sourceFile.Hash
	return fmt.Sprintf("%016x%016x", h.Hi, h.Lo)
}

// encodeParseOptions encodes the per-file ExternalModuleIndicatorOptions as a uint32 bitmask.
func encodeParseOptions(opts ast.ExternalModuleIndicatorOptions) uint32 {
	var bits uint32
	if opts.JSX {
		bits |= 1
	}
	if opts.Force {
		bits |= 2
	}
	return bits
}

// EncodeSourceFile encodes an entire source file AST into the binary format.
func EncodeSourceFile(sourceFile *ast.SourceFile) ([]byte, error) {
	return encodeTree(sourceFile.AsNode(), sourceFile)
}

// EncodeNode encodes an arbitrary AST node and its descendants into the binary format.
// The sourceFile is needed to provide the source text for efficient string encoding.
// When encoding a non-SourceFile node, the header hash and parse options fields will be zero.
func EncodeNode(node *ast.Node, sourceFile *ast.SourceFile) ([]byte, error) {
	return encodeTree(node, sourceFile)
}

func encodeTree(rootNode *ast.Node, sourceFile *ast.SourceFile) ([]byte, error) {
	var parentIndex, nodeCount, prevIndex uint32
	var extendedData []byte
	var strs *stringTable
	if rootNode.Kind == ast.KindSourceFile {
		strs = newStringTable(sourceFile.Text(), sourceFile.TextCount)
	} else {
		strs = newStringTable("", 0)
	}
	var initialNodeCount int
	if sourceFile != nil {
		initialNodeCount = sourceFile.NodeCount
	}
	nodes := make([]byte, 0, (initialNodeCount+1)*NodeSize)

	visitor := &ast.NodeVisitor{
		Hooks: ast.NodeVisitorHooks{
			VisitNodes: func(nodeList *ast.NodeList, visitor *ast.NodeVisitor) *ast.NodeList {
				if nodeList == nil || len(nodeList.Nodes) == 0 {
					return nodeList
				}

				nodeCount++
				if prevIndex != 0 {
					// this is the next sibling of `prevNode`
					b0, b1, b2, b3 := uint8(nodeCount), uint8(nodeCount>>8), uint8(nodeCount>>16), uint8(nodeCount>>24)
					nodes[prevIndex*NodeSize+NodeOffsetNext+0] = b0
					nodes[prevIndex*NodeSize+NodeOffsetNext+1] = b1
					nodes[prevIndex*NodeSize+NodeOffsetNext+2] = b2
					nodes[prevIndex*NodeSize+NodeOffsetNext+3] = b3
				}

				nodes = appendUint32s(nodes, SyntaxKindNodeList, uint32(nodeList.Pos()), uint32(nodeList.End()), 0, parentIndex, uint32(len(nodeList.Nodes)))

				saveParentIndex := parentIndex

				currentIndex := nodeCount
				prevIndex = 0
				parentIndex = currentIndex
				visitor.VisitSlice(nodeList.Nodes)
				prevIndex = currentIndex
				parentIndex = saveParentIndex

				return nodeList
			},
			VisitModifiers: func(modifiers *ast.ModifierList, visitor *ast.NodeVisitor) *ast.ModifierList {
				if modifiers != nil && len(modifiers.Nodes) > 0 {
					visitor.Hooks.VisitNodes(&modifiers.NodeList, visitor)
				}
				return modifiers
			},
		},
	}
	visitor.Visit = func(node *ast.Node) *ast.Node {
		nodeCount++
		if prevIndex != 0 {
			// this is the next sibling of `prevNode`
			b0, b1, b2, b3 := uint8(nodeCount), uint8(nodeCount>>8), uint8(nodeCount>>16), uint8(nodeCount>>24)
			nodes[prevIndex*NodeSize+NodeOffsetNext+0] = b0
			nodes[prevIndex*NodeSize+NodeOffsetNext+1] = b1
			nodes[prevIndex*NodeSize+NodeOffsetNext+2] = b2
			nodes[prevIndex*NodeSize+NodeOffsetNext+3] = b3
		}

		nodes = appendUint32s(nodes, uint32(node.Kind), uint32(node.Pos()), uint32(node.End()), 0, parentIndex, getNodeData(node, strs, &extendedData))

		saveParentIndex := parentIndex

		currentIndex := nodeCount
		prevIndex = 0
		parentIndex = currentIndex
		visitor.VisitEachChild(node)
		prevIndex = currentIndex
		parentIndex = saveParentIndex
		return node
	}

	nodes = appendUint32s(nodes, 0, 0, 0, 0, 0, 0)

	nodeCount++
	parentIndex++

	nodes = appendUint32s(nodes, uint32(rootNode.Kind), uint32(rootNode.Pos()), uint32(rootNode.End()), 0, 0, getNodeData(rootNode, strs, &extendedData))

	visitor.VisitEachChild(rootNode)

	var hash xxh3.Uint128
	var parseOpts uint32
	if rootNode.Kind == ast.KindSourceFile {
		hash = sourceFile.Hash
		parseOpts = encodeParseOptions(sourceFile.ParseOptions().ExternalModuleIndicatorOptions)
	}

	metadata := uint32(ProtocolVersion) << 24
	offsetStringTableOffsets := HeaderSize
	offsetStringTableData := HeaderSize + len(strs.offsets)*4
	offsetExtendedData := offsetStringTableData + strs.stringLength()
	offsetNodes := offsetExtendedData + len(extendedData)

	header := []uint32{
		metadata,
		uint32(hash.Lo), uint32(hash.Lo >> 32),
		uint32(hash.Hi), uint32(hash.Hi >> 32),
		parseOpts,
		uint32(offsetStringTableOffsets),
		uint32(offsetStringTableData),
		uint32(offsetExtendedData),
		uint32(offsetNodes),
	}

	var headerBytes, strsBytes []byte
	headerBytes = appendUint32s(nil, header...)
	strsBytes = strs.encode()

	return slices.Concat(
		headerBytes,
		strsBytes,
		extendedData,
		nodes,
	), nil
}

func appendUint32s(buf []byte, values ...uint32) []byte {
	for _, value := range values {
		buf = binary.LittleEndian.AppendUint32(buf, value)
	}
	return buf
}

func getNodeData(node *ast.Node, strs *stringTable, extendedData *[]byte) uint32 {
	t := getNodeDataType(node)
	switch t {
	case NodeDataTypeChildren:
		return t | getNodeDefinedData(node) | uint32(getChildrenPropertyMask(node))
	case NodeDataTypeString:
		return t | getNodeDefinedData(node) | recordNodeStrings(node, strs)
	case NodeDataTypeExtendedData:
		return t | getNodeDefinedData(node) | recordExtendedData(node, strs, extendedData)
	default:
		panic("unreachable")
	}
}

func getNodeDataType(node *ast.Node) uint32 {
	switch node.Kind {
	case ast.KindJsxText,
		ast.KindIdentifier,
		ast.KindPrivateIdentifier,
		ast.KindStringLiteral,
		ast.KindNumericLiteral,
		ast.KindBigIntLiteral,
		ast.KindRegularExpressionLiteral,
		ast.KindNoSubstitutionTemplateLiteral,
		ast.KindJSDocText:
		return NodeDataTypeString
	case ast.KindTemplateHead,
		ast.KindTemplateMiddle,
		ast.KindTemplateTail,
		ast.KindSourceFile:
		return NodeDataTypeExtendedData
	default:
		return NodeDataTypeChildren
	}
}

// getChildrenPropertyMask returns a mask of which children properties are present in the node.
// It is defined for node kinds that have more than one property that is a pointer to a child node.
// Example: QualifiedName has two children properties: Left and Right, which are visited in that order.
// result&1 is non-zero if Left is present, and result&2 is non-zero if Right is present. If the client
// knows that QualifiedName has properties ["Left", "Right"] and sees an encoded node with only one
// child, it can use the mask to determine which property is present.
func getChildrenPropertyMask(node *ast.Node) uint8 {
	switch node.Kind {
	case ast.KindQualifiedName:
		n := node.AsQualifiedName()
		return (boolToByte(n.Left != nil) << 0) | (boolToByte(n.Right != nil) << 1)
	case ast.KindTypeParameter:
		n := node.AsTypeParameter()
		return (boolToByte(n.Modifiers() != nil) << 0) | (boolToByte(n.Name() != nil) << 1) | (boolToByte(n.Constraint != nil) << 2) | (boolToByte(n.DefaultType != nil) << 3)
	case ast.KindIfStatement:
		n := node.AsIfStatement()
		return (boolToByte(n.Expression != nil) << 0) | (boolToByte(n.ThenStatement != nil) << 1) | (boolToByte(n.ElseStatement != nil) << 2)
	case ast.KindDoStatement:
		n := node.AsDoStatement()
		return (boolToByte(n.Statement != nil) << 0) | (boolToByte(n.Expression != nil) << 1)
	case ast.KindWhileStatement:
		n := node.AsWhileStatement()
		return (boolToByte(n.Expression != nil) << 0) | (boolToByte(n.Statement != nil) << 1)
	case ast.KindForStatement:
		n := node.AsForStatement()
		return (boolToByte(n.Initializer != nil) << 0) | (boolToByte(n.Condition != nil) << 1) | (boolToByte(n.Incrementor != nil) << 2) | (boolToByte(n.Statement != nil) << 3)
	case ast.KindForInStatement, ast.KindForOfStatement:
		n := node.AsForInOrOfStatement()
		return (boolToByte(n.AwaitModifier != nil) << 0) | (boolToByte(n.Initializer != nil) << 1) | (boolToByte(n.Expression != nil) << 2) | (boolToByte(n.Statement != nil) << 3)
	case ast.KindWithStatement:
		n := node.AsWithStatement()
		return (boolToByte(n.Expression != nil) << 0) | (boolToByte(n.Statement != nil) << 1)
	case ast.KindSwitchStatement:
		n := node.AsSwitchStatement()
		return (boolToByte(n.Expression != nil) << 0) | (boolToByte(n.CaseBlock != nil) << 1)
	case ast.KindCaseClause, ast.KindDefaultClause:
		n := node.AsCaseOrDefaultClause()
		return (boolToByte(n.Expression != nil) << 0) | (boolToByte(n.Statements != nil) << 1)
	case ast.KindTryStatement:
		n := node.AsTryStatement()
		return (boolToByte(n.TryBlock != nil) << 0) | (boolToByte(n.CatchClause != nil) << 1) | (boolToByte(n.FinallyBlock != nil) << 2)
	case ast.KindCatchClause:
		n := node.AsCatchClause()
		return (boolToByte(n.VariableDeclaration != nil) << 0) | (boolToByte(n.Block != nil) << 1)
	case ast.KindLabeledStatement:
		n := node.AsLabeledStatement()
		return (boolToByte(n.Label != nil) << 0) | (boolToByte(n.Statement != nil) << 1)
	case ast.KindVariableStatement:
		n := node.AsVariableStatement()
		return (boolToByte(n.Modifiers() != nil) << 0) | (boolToByte(n.DeclarationList != nil) << 1)
	case ast.KindVariableDeclaration:
		n := node.AsVariableDeclaration()
		return (boolToByte(n.Name() != nil) << 0) | (boolToByte(n.ExclamationToken != nil) << 1) | (boolToByte(n.Type != nil) << 2) | (boolToByte(n.Initializer != nil) << 3)
	case ast.KindParameter:
		n := node.AsParameterDeclaration()
		return (boolToByte(n.Modifiers() != nil) << 0) | (boolToByte(n.DotDotDotToken != nil) << 1) | (boolToByte(n.Name() != nil) << 2) | (boolToByte(n.QuestionToken != nil) << 3) | (boolToByte(n.Type != nil) << 4) | (boolToByte(n.Initializer != nil) << 5)
	case ast.KindBindingElement:
		n := node.AsBindingElement()
		return (boolToByte(n.DotDotDotToken != nil) << 0) | (boolToByte(n.PropertyName != nil) << 1) | (boolToByte(n.Name() != nil) << 2) | (boolToByte(n.Initializer != nil) << 3)
	case ast.KindFunctionDeclaration:
		n := node.AsFunctionDeclaration()
		return (boolToByte(n.Modifiers() != nil) << 0) | (boolToByte(n.AsteriskToken != nil) << 1) | (boolToByte(n.Name() != nil) << 2) | (boolToByte(n.TypeParameters != nil) << 3) | (boolToByte(n.Parameters != nil) << 4) | (boolToByte(n.Type != nil) << 5) | (boolToByte(n.Body != nil) << 6)
	case ast.KindInterfaceDeclaration:
		n := node.AsInterfaceDeclaration()
		return (boolToByte(n.Modifiers() != nil) << 0) | (boolToByte(n.Name() != nil) << 1) | (boolToByte(n.TypeParameters != nil) << 2) | (boolToByte(n.HeritageClauses != nil) << 3) | (boolToByte(n.Members != nil) << 4)
	case ast.KindTypeAliasDeclaration:
		n := node.AsTypeAliasDeclaration()
		return (boolToByte(n.Modifiers() != nil) << 0) | (boolToByte(n.Name() != nil) << 1) | (boolToByte(n.TypeParameters != nil) << 2) | (boolToByte(n.Type != nil) << 3)
	case ast.KindEnumMember:
		n := node.AsEnumMember()
		return (boolToByte(n.Name() != nil) << 0) | (boolToByte(n.Initializer != nil) << 1)
	case ast.KindEnumDeclaration:
		n := node.AsEnumDeclaration()
		return (boolToByte(n.Modifiers() != nil) << 0) | (boolToByte(n.Name() != nil) << 1) | (boolToByte(n.Members != nil) << 2)
	case ast.KindModuleDeclaration:
		n := node.AsModuleDeclaration()
		return (boolToByte(n.Modifiers() != nil) << 0) | (boolToByte(n.Name() != nil) << 1) | (boolToByte(n.Body != nil) << 2)
	case ast.KindImportEqualsDeclaration:
		n := node.AsImportEqualsDeclaration()
		return (boolToByte(n.Modifiers() != nil) << 0) | (boolToByte(n.Name() != nil) << 1) | (boolToByte(n.ModuleReference != nil) << 2)
	case ast.KindImportDeclaration, ast.KindJSImportDeclaration:
		n := node.AsImportDeclaration()
		return (boolToByte(n.Modifiers() != nil) << 0) | (boolToByte(n.ImportClause != nil) << 1) | (boolToByte(n.ModuleSpecifier != nil) << 2) | (boolToByte(n.Attributes != nil) << 3)
	case ast.KindImportSpecifier:
		n := node.AsImportSpecifier()
		return (boolToByte(n.PropertyName != nil) << 0) | (boolToByte(n.Name() != nil) << 1)
	case ast.KindImportClause:
		n := node.AsImportClause()
		return (boolToByte(n.Name() != nil) << 0) | (boolToByte(n.NamedBindings != nil) << 1)
	case ast.KindExportAssignment, ast.KindJSExportAssignment:
		n := node.AsExportAssignment()
		return (boolToByte(n.Modifiers() != nil) << 0) | (boolToByte(n.Expression != nil) << 1)
	case ast.KindNamespaceExportDeclaration:
		n := node.AsNamespaceExportDeclaration()
		return (boolToByte(n.Modifiers() != nil) << 0) | (boolToByte(n.Name() != nil) << 1)
	case ast.KindExportDeclaration:
		n := node.AsExportDeclaration()
		return (boolToByte(n.Modifiers() != nil) << 0) | (boolToByte(n.ExportClause != nil) << 1) | (boolToByte(n.ModuleSpecifier != nil) << 2) | (boolToByte(n.Attributes != nil) << 3)
	case ast.KindExportSpecifier:
		n := node.AsExportSpecifier()
		return (boolToByte(n.PropertyName != nil) << 0) | (boolToByte(n.Name() != nil) << 1)
	case ast.KindCallSignature:
		n := node.AsCallSignatureDeclaration()
		return (boolToByte(n.TypeParameters != nil) << 0) | (boolToByte(n.Parameters != nil) << 1) | (boolToByte(n.Type != nil) << 2)
	case ast.KindConstructSignature:
		n := node.AsConstructSignatureDeclaration()
		return (boolToByte(n.TypeParameters != nil) << 0) | (boolToByte(n.Parameters != nil) << 1) | (boolToByte(n.Type != nil) << 2)
	case ast.KindConstructor:
		n := node.AsConstructorDeclaration()
		return (boolToByte(n.Modifiers() != nil) << 0) | (boolToByte(n.TypeParameters != nil) << 1) | (boolToByte(n.Parameters != nil) << 2) | (boolToByte(n.Type != nil) << 3) | (boolToByte(n.Body != nil) << 4)
	case ast.KindGetAccessor:
		n := node.AsGetAccessorDeclaration()
		return (boolToByte(n.Modifiers() != nil) << 0) | (boolToByte(n.Name() != nil) << 1) | (boolToByte(n.TypeParameters != nil) << 2) | (boolToByte(n.Parameters != nil) << 3) | (boolToByte(n.Type != nil) << 4) | (boolToByte(n.Body != nil) << 5)
	case ast.KindSetAccessor:
		n := node.AsSetAccessorDeclaration()
		return (boolToByte(n.Modifiers() != nil) << 0) | (boolToByte(n.Name() != nil) << 1) | (boolToByte(n.TypeParameters != nil) << 2) | (boolToByte(n.Parameters != nil) << 3) | (boolToByte(n.Type != nil) << 4) | (boolToByte(n.Body != nil) << 5)
	case ast.KindIndexSignature:
		n := node.AsIndexSignatureDeclaration()
		return (boolToByte(n.Modifiers() != nil) << 0) | (boolToByte(n.Parameters != nil) << 1) | (boolToByte(n.Type != nil) << 2)
	case ast.KindMethodSignature:
		n := node.AsMethodSignatureDeclaration()
		return (boolToByte(n.Modifiers() != nil) << 0) | (boolToByte(n.Name() != nil) << 1) | (boolToByte(n.PostfixToken != nil) << 2) | (boolToByte(n.TypeParameters != nil) << 3) | (boolToByte(n.Parameters != nil) << 4) | (boolToByte(n.Type != nil) << 5)
	case ast.KindMethodDeclaration:
		n := node.AsMethodDeclaration()
		return (boolToByte(n.Modifiers() != nil) << 0) | (boolToByte(n.AsteriskToken != nil) << 1) | (boolToByte(n.Name() != nil) << 2) | (boolToByte(n.PostfixToken != nil) << 3) | (boolToByte(n.TypeParameters != nil) << 4) | (boolToByte(n.Parameters != nil) << 5) | (boolToByte(n.Type != nil) << 6) | (boolToByte(n.Body != nil) << 7)
	case ast.KindPropertySignature:
		n := node.AsPropertySignatureDeclaration()
		return (boolToByte(n.Modifiers() != nil) << 0) | (boolToByte(n.Name() != nil) << 1) | (boolToByte(n.PostfixToken != nil) << 2) | (boolToByte(n.Type != nil) << 3) | (boolToByte(n.Initializer != nil) << 4)
	case ast.KindPropertyDeclaration:
		n := node.AsPropertyDeclaration()
		return (boolToByte(n.Modifiers() != nil) << 0) | (boolToByte(n.Name() != nil) << 1) | (boolToByte(n.PostfixToken != nil) << 2) | (boolToByte(n.Type != nil) << 3) | (boolToByte(n.Initializer != nil) << 4)
	case ast.KindBinaryExpression:
		n := node.AsBinaryExpression()
		return (boolToByte(n.Left != nil) << 0) | (boolToByte(n.OperatorToken != nil) << 1) | (boolToByte(n.Right != nil) << 2)
	case ast.KindYieldExpression:
		n := node.AsYieldExpression()
		return (boolToByte(n.AsteriskToken != nil) << 0) | (boolToByte(n.Expression != nil) << 1)
	case ast.KindArrowFunction:
		n := node.AsArrowFunction()
		return (boolToByte(n.Modifiers() != nil) << 0) | (boolToByte(n.TypeParameters != nil) << 1) | (boolToByte(n.Parameters != nil) << 2) | (boolToByte(n.Type != nil) << 3) | (boolToByte(n.EqualsGreaterThanToken != nil) << 4) | (boolToByte(n.Body != nil) << 5)
	case ast.KindFunctionExpression:
		n := node.AsFunctionExpression()
		return (boolToByte(n.Modifiers() != nil) << 0) | (boolToByte(n.AsteriskToken != nil) << 1) | (boolToByte(n.Name() != nil) << 2) | (boolToByte(n.TypeParameters != nil) << 3) | (boolToByte(n.Parameters != nil) << 4) | (boolToByte(n.Type != nil) << 5) | (boolToByte(n.Body != nil) << 6)
	case ast.KindAsExpression:
		n := node.AsAsExpression()
		return (boolToByte(n.Expression != nil) << 0) | (boolToByte(n.Type != nil) << 1)
	case ast.KindSatisfiesExpression:
		n := node.AsSatisfiesExpression()
		return (boolToByte(n.Expression != nil) << 0) | (boolToByte(n.Type != nil) << 1)
	case ast.KindConditionalExpression:
		n := node.AsConditionalExpression()
		return (boolToByte(n.Condition != nil) << 0) | (boolToByte(n.QuestionToken != nil) << 1) | (boolToByte(n.WhenTrue != nil) << 2) | (boolToByte(n.ColonToken != nil) << 3) | (boolToByte(n.WhenFalse != nil) << 4)
	case ast.KindPropertyAccessExpression:
		n := node.AsPropertyAccessExpression()
		return (boolToByte(n.Expression != nil) << 0) | (boolToByte(n.QuestionDotToken != nil) << 1) | (boolToByte(n.Name() != nil) << 2)
	case ast.KindElementAccessExpression:
		n := node.AsElementAccessExpression()
		return (boolToByte(n.Expression != nil) << 0) | (boolToByte(n.QuestionDotToken != nil) << 1) | (boolToByte(n.ArgumentExpression != nil) << 2)
	case ast.KindCallExpression:
		n := node.AsCallExpression()
		return (boolToByte(n.Expression != nil) << 0) | (boolToByte(n.QuestionDotToken != nil) << 1) | (boolToByte(n.TypeArguments != nil) << 2) | (boolToByte(n.Arguments != nil) << 3)
	case ast.KindNewExpression:
		n := node.AsNewExpression()
		return (boolToByte(n.Expression != nil) << 0) | (boolToByte(n.TypeArguments != nil) << 1) | (boolToByte(n.Arguments != nil) << 2)
	case ast.KindTemplateExpression:
		n := node.AsTemplateExpression()
		return (boolToByte(n.Head != nil) << 0) | (boolToByte(n.TemplateSpans != nil) << 1)
	case ast.KindTemplateSpan:
		n := node.AsTemplateSpan()
		return (boolToByte(n.Expression != nil) << 0) | (boolToByte(n.Literal != nil) << 1)
	case ast.KindTaggedTemplateExpression:
		n := node.AsTaggedTemplateExpression()
		return (boolToByte(n.Tag != nil) << 0) | (boolToByte(n.QuestionDotToken != nil) << 1) | (boolToByte(n.TypeArguments != nil) << 2) | (boolToByte(n.Template != nil) << 3)
	case ast.KindPropertyAssignment:
		n := node.AsPropertyAssignment()
		return (boolToByte(n.Modifiers() != nil) << 0) | (boolToByte(n.Name() != nil) << 1) | (boolToByte(n.PostfixToken != nil) << 2) | (boolToByte(n.Initializer != nil) << 3)
	case ast.KindShorthandPropertyAssignment:
		n := node.AsShorthandPropertyAssignment()
		return (boolToByte(n.Modifiers() != nil) << 0) | (boolToByte(n.Name() != nil) << 1) | (boolToByte(n.PostfixToken != nil) << 2) | (boolToByte(n.EqualsToken != nil) << 3) | (boolToByte(n.ObjectAssignmentInitializer != nil) << 4)
	case ast.KindTypeAssertionExpression:
		n := node.AsTypeAssertion()
		return (boolToByte(n.Type != nil) << 0) | (boolToByte(n.Expression != nil) << 1)
	case ast.KindConditionalType:
		n := node.AsConditionalTypeNode()
		return (boolToByte(n.CheckType != nil) << 0) | (boolToByte(n.ExtendsType != nil) << 1) | (boolToByte(n.TrueType != nil) << 2) | (boolToByte(n.FalseType != nil) << 3)
	case ast.KindIndexedAccessType:
		n := node.AsIndexedAccessTypeNode()
		return (boolToByte(n.ObjectType != nil) << 0) | (boolToByte(n.IndexType != nil) << 1)
	case ast.KindTypeReference:
		n := node.AsTypeReferenceNode()
		return (boolToByte(n.TypeName != nil) << 0) | (boolToByte(n.TypeArguments != nil) << 1)
	case ast.KindExpressionWithTypeArguments:
		n := node.AsExpressionWithTypeArguments()
		return (boolToByte(n.Expression != nil) << 0) | (boolToByte(n.TypeArguments != nil) << 1)
	case ast.KindTypePredicate:
		n := node.AsTypePredicateNode()
		return (boolToByte(n.AssertsModifier != nil) << 0) | (boolToByte(n.ParameterName != nil) << 1) | (boolToByte(n.Type != nil) << 2)
	case ast.KindImportType:
		n := node.AsImportTypeNode()
		return (boolToByte(n.Argument != nil) << 0) | (boolToByte(n.Attributes != nil) << 1) | (boolToByte(n.Qualifier != nil) << 2) | (boolToByte(n.TypeArguments != nil) << 3)
	case ast.KindImportAttribute:
		n := node.AsImportAttribute()
		return (boolToByte(n.Name() != nil) << 0) | (boolToByte(n.Value != nil) << 1)
	case ast.KindTypeQuery:
		n := node.AsTypeQueryNode()
		return (boolToByte(n.ExprName != nil) << 0) | (boolToByte(n.TypeArguments != nil) << 1)
	case ast.KindMappedType:
		n := node.AsMappedTypeNode()
		return (boolToByte(n.ReadonlyToken != nil) << 0) | (boolToByte(n.TypeParameter != nil) << 1) | (boolToByte(n.NameType != nil) << 2) | (boolToByte(n.QuestionToken != nil) << 3) | (boolToByte(n.Type != nil) << 4) | (boolToByte(n.Members != nil) << 5)
	case ast.KindNamedTupleMember:
		n := node.AsNamedTupleMember()
		return (boolToByte(n.DotDotDotToken != nil) << 0) | (boolToByte(n.Name() != nil) << 1) | (boolToByte(n.QuestionToken != nil) << 2) | (boolToByte(n.Type != nil) << 3)
	case ast.KindFunctionType:
		n := node.AsFunctionTypeNode()
		return (boolToByte(n.TypeParameters != nil) << 0) | (boolToByte(n.Parameters != nil) << 1) | (boolToByte(n.Type != nil) << 2)
	case ast.KindConstructorType:
		n := node.AsConstructorTypeNode()
		return (boolToByte(n.Modifiers() != nil) << 0) | (boolToByte(n.TypeParameters != nil) << 1) | (boolToByte(n.Parameters != nil) << 2) | (boolToByte(n.Type != nil) << 3)
	case ast.KindTemplateLiteralType:
		n := node.AsTemplateLiteralTypeNode()
		return (boolToByte(n.Head != nil) << 0) | (boolToByte(n.TemplateSpans != nil) << 1)
	case ast.KindTemplateLiteralTypeSpan:
		n := node.AsTemplateLiteralTypeSpan()
		return (boolToByte(n.Type != nil) << 0) | (boolToByte(n.Literal != nil) << 1)
	case ast.KindJsxElement:
		n := node.AsJsxElement()
		return (boolToByte(n.OpeningElement != nil) << 0) | (boolToByte(n.Children != nil) << 1) | (boolToByte(n.ClosingElement != nil) << 2)
	case ast.KindJsxNamespacedName:
		n := node.AsJsxNamespacedName()
		return (boolToByte(n.Name() != nil) << 0) | (boolToByte(n.Namespace != nil) << 1)
	case ast.KindJsxOpeningElement:
		n := node.AsJsxOpeningElement()
		return (boolToByte(n.TagName != nil) << 0) | (boolToByte(n.TypeArguments != nil) << 1) | (boolToByte(n.Attributes != nil) << 2)
	case ast.KindJsxSelfClosingElement:
		n := node.AsJsxSelfClosingElement()
		return (boolToByte(n.TagName != nil) << 0) | (boolToByte(n.TypeArguments != nil) << 1) | (boolToByte(n.Attributes != nil) << 2)
	case ast.KindJsxFragment:
		n := node.AsJsxFragment()
		return (boolToByte(n.OpeningFragment != nil) << 0) | (boolToByte(n.Children != nil) << 1) | (boolToByte(n.ClosingFragment != nil) << 2)
	case ast.KindJsxAttribute:
		n := node.AsJsxAttribute()
		return (boolToByte(n.Name() != nil) << 0) | (boolToByte(n.Initializer != nil) << 1)
	case ast.KindJsxExpression:
		n := node.AsJsxExpression()
		return (boolToByte(n.DotDotDotToken != nil) << 0) | (boolToByte(n.Expression != nil) << 1)
	case ast.KindJSDoc:
		n := node.AsJSDoc()
		return (boolToByte(n.Comment != nil) << 0) | (boolToByte(n.Tags != nil) << 1)
	case ast.KindJSDocTypeTag:
		n := node.AsJSDocTypeTag()
		return (boolToByte(n.TagName != nil) << 0) | (boolToByte(n.TypeExpression != nil) << 1) | (boolToByte(n.Comment != nil) << 2)
	case ast.KindJSDocTag:
		n := node.AsJSDocUnknownTag()
		return (boolToByte(n.TagName != nil) << 0) | (boolToByte(n.Comment != nil) << 1)
	case ast.KindJSDocTemplateTag:
		n := node.AsJSDocTemplateTag()
		return (boolToByte(n.TagName != nil) << 0) | (boolToByte(n.Constraint != nil) << 1) | (boolToByte(n.TypeParameters != nil) << 2) | (boolToByte(n.Comment != nil) << 3)
	case ast.KindJSDocReturnTag:
		n := node.AsJSDocReturnTag()
		return (boolToByte(n.TagName != nil) << 0) | (boolToByte(n.TypeExpression != nil) << 1) | (boolToByte(n.Comment != nil) << 2)
	case ast.KindJSDocPublicTag:
		n := node.AsJSDocPublicTag()
		return (boolToByte(n.TagName != nil) << 0) | (boolToByte(n.Comment != nil) << 1)
	case ast.KindJSDocPrivateTag:
		n := node.AsJSDocPrivateTag()
		return (boolToByte(n.TagName != nil) << 0) | (boolToByte(n.Comment != nil) << 1)
	case ast.KindJSDocProtectedTag:
		n := node.AsJSDocProtectedTag()
		return (boolToByte(n.TagName != nil) << 0) | (boolToByte(n.Comment != nil) << 1)
	case ast.KindJSDocReadonlyTag:
		n := node.AsJSDocReadonlyTag()
		return (boolToByte(n.TagName != nil) << 0) | (boolToByte(n.Comment != nil) << 1)
	case ast.KindJSDocOverrideTag:
		n := node.AsJSDocOverrideTag()
		return (boolToByte(n.TagName != nil) << 0) | (boolToByte(n.Comment != nil) << 1)
	case ast.KindJSDocDeprecatedTag:
		n := node.AsJSDocDeprecatedTag()
		return (boolToByte(n.TagName != nil) << 0) | (boolToByte(n.Comment != nil) << 1)
	case ast.KindJSDocSeeTag:
		n := node.AsJSDocSeeTag()
		return (boolToByte(n.TagName != nil) << 0) | (boolToByte(n.NameExpression != nil) << 1) | (boolToByte(n.Comment != nil) << 2)
	case ast.KindJSDocImplementsTag:
		n := node.AsJSDocImplementsTag()
		return (boolToByte(n.TagName != nil) << 0) | (boolToByte(n.ClassName != nil) << 1) | (boolToByte(n.Comment != nil) << 2)
	case ast.KindJSDocAugmentsTag:
		n := node.AsJSDocAugmentsTag()
		return (boolToByte(n.TagName != nil) << 0) | (boolToByte(n.ClassName != nil) << 1) | (boolToByte(n.Comment != nil) << 2)
	case ast.KindJSDocSatisfiesTag:
		n := node.AsJSDocSatisfiesTag()
		return (boolToByte(n.TagName != nil) << 0) | (boolToByte(n.TypeExpression != nil) << 1) | (boolToByte(n.Comment != nil) << 2)
	case ast.KindJSDocThisTag:
		n := node.AsJSDocThisTag()
		return (boolToByte(n.TagName != nil) << 0) | (boolToByte(n.TypeExpression != nil) << 1) | (boolToByte(n.Comment != nil) << 2)
	case ast.KindJSDocImportTag:
		n := node.AsJSDocImportTag()
		return (boolToByte(n.TagName != nil) << 0) | (boolToByte(n.ImportClause != nil) << 1) | (boolToByte(n.ModuleSpecifier != nil) << 2) | (boolToByte(n.Attributes != nil) << 3) | (boolToByte(n.Comment != nil) << 4)
	case ast.KindJSDocCallbackTag:
		n := node.AsJSDocCallbackTag()
		return (boolToByte(n.TagName != nil) << 0) | (boolToByte(n.TypeExpression != nil) << 1) | (boolToByte(n.FullName != nil) << 2) | (boolToByte(n.Comment != nil) << 3)
	case ast.KindJSDocOverloadTag:
		n := node.AsJSDocOverloadTag()
		return (boolToByte(n.TagName != nil) << 0) | (boolToByte(n.TypeExpression != nil) << 1) | (boolToByte(n.Comment != nil) << 2)
	case ast.KindJSDocTypedefTag:
		n := node.AsJSDocTypedefTag()
		return (boolToByte(n.TagName != nil) << 0) | (boolToByte(n.TypeExpression != nil) << 1) | (boolToByte(n.Name() != nil) << 2) | (boolToByte(n.Comment != nil) << 3)
	case ast.KindJSDocSignature:
		n := node.AsJSDocSignature()
		return (boolToByte(n.TypeParameters != nil) << 0) | (boolToByte(n.Parameters != nil) << 1) | (boolToByte(n.Type != nil) << 2)
	case ast.KindClassStaticBlockDeclaration:
		n := node.AsClassStaticBlockDeclaration()
		return (boolToByte(n.Modifiers() != nil) << 0) | (boolToByte(n.Body != nil) << 1)
	case ast.KindClassDeclaration:
		n := node.AsClassDeclaration()
		return (boolToByte(n.Modifiers() != nil) << 0) | (boolToByte(n.Name() != nil) << 1) | (boolToByte(n.TypeParameters != nil) << 2) | (boolToByte(n.HeritageClauses != nil) << 3) | (boolToByte(n.Members != nil) << 4)
	case ast.KindJSDocParameterTag, ast.KindJSDocPropertyTag:
		n := node.AsJSDocParameterOrPropertyTag()
		if n.IsNameFirst {
			return (boolToByte(n.TagName != nil) << 0) | (boolToByte(n.Name() != nil) << 1) | (boolToByte(n.TypeExpression != nil) << 2) | (boolToByte(n.Comment != nil) << 3)
		}
		return (boolToByte(n.TagName != nil) << 0) | (boolToByte(n.TypeExpression != nil) << 1) | (boolToByte(n.Name() != nil) << 2) | (boolToByte(n.Comment != nil) << 3)
	default:
		return 0
	}
}

func getNodeDefinedData(node *ast.Node) uint32 {
	switch node.Kind {
	case ast.KindJSDocTypeLiteral:
		n := node.AsJSDocTypeLiteral()
		return uint32(boolToByte(n.IsArrayType)) << 24
	case ast.KindImportSpecifier:
		n := node.AsImportSpecifier()
		return uint32(boolToByte(n.IsTypeOnly)) << 24
	case ast.KindImportClause:
		n := node.AsImportClause()
		return uint32(boolToByte(n.PhaseModifier == ast.KindTypeKeyword))<<24 | uint32(boolToByte(n.PhaseModifier == ast.KindDeferKeyword))<<25
	case ast.KindExportSpecifier:
		n := node.AsExportSpecifier()
		return uint32(boolToByte(n.IsTypeOnly)) << 24
	case ast.KindImportType:
		n := node.AsImportTypeNode()
		return uint32(boolToByte(n.IsTypeOf)) << 24
	case ast.KindImportEqualsDeclaration:
		n := node.AsImportEqualsDeclaration()
		return uint32(boolToByte(n.IsTypeOnly)) << 24
	case ast.KindExportAssignment:
		n := node.AsExportAssignment()
		return uint32(boolToByte(n.IsExportEquals)) << 24
	case ast.KindExportDeclaration:
		n := node.AsExportDeclaration()
		return uint32(boolToByte(n.IsTypeOnly)) << 24
	case ast.KindBlock:
		n := node.AsBlock()
		return uint32(boolToByte(n.Multiline)) << 24
	case ast.KindArrayLiteralExpression:
		n := node.AsArrayLiteralExpression()
		return uint32(boolToByte(n.MultiLine)) << 24
	case ast.KindObjectLiteralExpression:
		n := node.AsObjectLiteralExpression()
		return uint32(boolToByte(n.MultiLine)) << 24
	case ast.KindJSDocParameterTag, ast.KindJSDocPropertyTag:
		n := node.AsJSDocParameterOrPropertyTag()
		return uint32(boolToByte(n.IsBracketed))<<24 | uint32(boolToByte(n.IsNameFirst))<<25
	case ast.KindJsxText:
		n := node.AsJsxText()
		return uint32(boolToByte(n.ContainsOnlyTriviaWhiteSpaces)) << 24
	case ast.KindVariableDeclarationList:
		n := node.AsVariableDeclarationList()
		return uint32(n.Flags & (ast.NodeFlagsLet | ast.NodeFlagsConst) << 24)
	case ast.KindImportAttributes:
		n := node.AsImportAttributes()
		return uint32(boolToByte(n.MultiLine))<<24 | uint32(boolToByte(n.Token == ast.KindAssertKeyword))<<25
	}
	return 0
}

func recordNodeStrings(node *ast.Node, strs *stringTable) uint32 {
	switch node.Kind {
	case ast.KindJsxText:
		return strs.add(node.AsJsxText().Text, node.Kind, node.Pos(), node.End())
	case ast.KindIdentifier:
		return strs.add(node.AsIdentifier().Text, node.Kind, node.Pos(), node.End())
	case ast.KindPrivateIdentifier:
		return strs.add(node.AsPrivateIdentifier().Text, node.Kind, node.Pos(), node.End())
	case ast.KindStringLiteral:
		return strs.add(node.AsStringLiteral().Text, node.Kind, node.Pos(), node.End())
	case ast.KindNumericLiteral:
		return strs.add(node.AsNumericLiteral().Text, node.Kind, node.Pos(), node.End())
	case ast.KindBigIntLiteral:
		return strs.add(node.AsBigIntLiteral().Text, node.Kind, node.Pos(), node.End())
	case ast.KindRegularExpressionLiteral:
		return strs.add(node.AsRegularExpressionLiteral().Text, node.Kind, node.Pos(), node.End())
	case ast.KindNoSubstitutionTemplateLiteral:
		return strs.add(node.AsNoSubstitutionTemplateLiteral().Text, node.Kind, node.Pos(), node.End())
	case ast.KindJSDocText:
		return strs.add(node.AsJSDocText().Text(), node.Kind, node.Pos(), node.End())
	default:
		panic(fmt.Sprintf("Unexpected node kind %v", node.Kind))
	}
}

func recordExtendedData(node *ast.Node, strs *stringTable, extendedData *[]byte) uint32 {
	offset := uint32(len(*extendedData))
	switch node.Kind {
	case ast.KindSourceFile:
		sf := node.AsSourceFile()
		textIndex := strs.add(sf.Text(), sf.Kind, sf.Pos(), sf.End())
		fileNameIndex := strs.add(sf.FileName(), 0, 0, 0)
		pathIndex := strs.add(string(sf.Path()), 0, 0, 0)
		*extendedData = appendUint32s(*extendedData, textIndex, fileNameIndex, pathIndex)
	default:
		var text, rawText string
		var templateFlags uint32
		switch node.Kind {
		case ast.KindTemplateTail:
			n := node.AsTemplateTail()
			text = n.Text
			rawText = n.RawText
			templateFlags = uint32(n.TemplateFlags)
		case ast.KindTemplateMiddle:
			n := node.AsTemplateMiddle()
			text = n.Text
			rawText = n.RawText
			templateFlags = uint32(n.TemplateFlags)
		case ast.KindTemplateHead:
			n := node.AsTemplateHead()
			text = n.Text
			rawText = n.RawText
			templateFlags = uint32(n.TemplateFlags)
		}
		textIndex := strs.add(text, node.Kind, node.Pos(), node.End())
		rawTextIndex := strs.add(rawText, node.Kind, node.Pos(), node.End())
		*extendedData = appendUint32s(*extendedData, textIndex, rawTextIndex, templateFlags)
	}
	return offset
}

func boolToByte(b bool) byte {
	if b {
		return 1
	}
	return 0
}
