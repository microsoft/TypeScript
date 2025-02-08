package ls

import "github.com/microsoft/typescript-go/internal/ast"

func (l *LanguageService) ProvideDefinitions(fileName string, position int) []Location {
	program, file := l.getProgramAndFile(fileName)
	node := getTouchingPropertyName(file, position)
	if node.Kind == ast.KindSourceFile {
		return nil
	}

	checker := program.GetTypeChecker()
	if symbol := checker.GetSymbolAtLocation(node); symbol != nil {
		locations := make([]Location, 0, len(symbol.Declarations))
		for _, decl := range symbol.Declarations {
			locations = append(locations, Location{
				FileName: ast.GetSourceFileOfNode(decl).FileName(),
				Range:    decl.Loc,
			})
		}
		return locations
	}
	return nil
}
