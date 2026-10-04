package declarations

import (
	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

// SupplementalReferencesTransformer adds triple-slash path references from a content mapper's
// canonical declaration output to the declaration files emitted for its supplemental files.
// This ensures that consumers loading the canonical declaration also include the supplemental types.
type SupplementalReferencesTransformer struct {
	host                  DeclarationEmitHost
	supplementalFiles     []*ast.SourceFile
	declarationFilePath   tspath.RootedFilePath
	forceDeclarationPaths bool
}

func NewSupplementalReferencesTransformer(host DeclarationEmitHost, sourceFile *ast.SourceFile, declarationFilePath tspath.RootedFilePath, forceDeclarationPaths bool) *SupplementalReferencesTransformer {
	return &SupplementalReferencesTransformer{
		host:                  host,
		supplementalFiles:     sourceFile.SupplementalSourceFiles(),
		declarationFilePath:   declarationFilePath,
		forceDeclarationPaths: forceDeclarationPaths,
	}
}

func (t *SupplementalReferencesTransformer) TransformSourceFile(sourceFile *ast.SourceFile) *ast.SourceFile {
	for _, supplemental := range t.supplementalFiles {
		if !t.host.SourceFileMayBeEmitted(supplemental, t.forceDeclarationPaths) {
			continue
		}
		declarationPath := t.host.GetOutputPathsFor(supplemental, t.forceDeclarationPaths).DeclarationFilePath()
		if declarationPath == "" {
			continue
		}
		relativePath, ok := t.host.CaseSensitivity().RelativePathFromFile(t.declarationFilePath, declarationPath)
		if !ok {
			panic("supplemental declaration output must share a root with the primary declaration")
		}
		sourceFile.ReferencedFiles = append(sourceFile.ReferencedFiles, &ast.FileReference{
			TextRange: core.NewTextRange(-1, -1),
			FileName:  relativePath.AsModuleSpecifier().AsString(),
		})
	}
	return sourceFile
}

func (t *SupplementalReferencesTransformer) GetDiagnostics() []*ast.Diagnostic {
	return nil
}
