package ast

// Symbol

type Symbol struct {
	Flags                        SymbolFlags
	CheckFlags                   CheckFlags // Non-zero only in transient symbols created by Checker
	ConstEnumOnlyModule          bool       // True if module contains only const enums or other modules with only const enums
	IsReplaceableByMethod        bool
	Name                         string
	Declarations                 []*Node
	ValueDeclaration             *Node
	Members                      SymbolTable
	Exports                      SymbolTable
	Id                           SymbolId
	MergeId                      MergeId // Assigned once symbol is merged somewhere
	Parent                       *Symbol
	ExportSymbol                 *Symbol
	AssignmentDeclarationMembers map[NodeId]*Node // Set of detected assignment declarations
	GlobalExports                SymbolTable      // Conditional global UMD exports
}

// SymbolTable

type SymbolTable map[string]*Symbol
