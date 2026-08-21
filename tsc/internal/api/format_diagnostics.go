package api

import (
	"context"
	"fmt"
	"strings"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/compiler"
	"github.com/microsoft/TypeScript/tsc/internal/diagnostics"
	"github.com/microsoft/TypeScript/tsc/internal/diagnosticwriter"
	"github.com/microsoft/TypeScript/tsc/internal/locale"
	"github.com/microsoft/TypeScript/tsc/internal/tsoptions"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

// handleFormatDiagnostics formats diagnostics using source text from their snapshot.
func (s *Session) handleFormatDiagnostics(ctx context.Context, params *FormatDiagnosticsParams, colorAndContext bool) (*FormatDiagnosticsResponse, error) {
	sd, err := s.getSnapshotData(params.Snapshot)
	if err != nil {
		return nil, err
	}

	program, err := sd.getProgram(params.Project)
	if err != nil {
		return nil, err
	}

	resolver := newFormatFileResolver(sd, program)
	diags := make([]diagnosticwriter.Diagnostic, len(params.Diagnostics))
	for i, d := range params.Diagnostics {
		diag, err := newWireDiagnostic(d, resolver)
		if err != nil {
			return nil, err
		}
		diags[i] = diag
	}

	formatOpts := &diagnosticwriter.FormattingOptions{
		NewLine: params.NewLine,
		ComparePathsOptions: tspath.ComparePathsOptions{
			CurrentDirectory:          s.projectSession.GetCurrentDirectory(),
			UseCaseSensitiveFileNames: s.projectSession.FS().UseCaseSensitiveFileNames(),
		},
	}

	var sb strings.Builder
	if colorAndContext {
		diagnosticwriter.FormatDiagnosticsWithColorAndContextForAPI(&sb, diags, formatOpts)
	} else {
		diagnosticwriter.WriteFormatDiagnostics(&sb, diags, formatOpts)
	}

	return &FormatDiagnosticsResponse{Output: sb.String()}, nil
}

// formatFileResolver resolves source and config files from a snapshot.
type formatFileResolver struct {
	sd      *snapshotData
	program *compiler.Program
	cache   map[string]*ast.SourceFile
}

func newFormatFileResolver(sd *snapshotData, program *compiler.Program) *formatFileResolver {
	return &formatFileResolver{
		sd:      sd,
		program: program,
		cache:   make(map[string]*ast.SourceFile),
	}
}

func (r *formatFileResolver) resolve(fileName string) *ast.SourceFile {
	if fileName == "" {
		return nil
	}
	if file, ok := r.cache[fileName]; ok {
		return file
	}
	file := r.resolveUncached(fileName)
	r.cache[fileName] = file
	return file
}

func (r *formatFileResolver) resolveUncached(fileName string) *ast.SourceFile {
	if file := r.program.GetSourceFile(fileName); file != nil {
		return file
	}

	// Config files are not program source files.
	commandLine := r.program.CommandLine()
	if commandLine == nil || commandLine.ConfigFile == nil || commandLine.ConfigFile.SourceFile == nil {
		return nil
	}

	requestedPath := tspath.ToPath(fileName, r.program.GetCurrentDirectory(), r.program.UseCaseSensitiveFileNames())
	if rootConfig := commandLine.ConfigFile.SourceFile; rootConfig.Path() == requestedPath {
		return rootConfig
	}

	for _, configFileName := range commandLine.ExtendedSourceFiles() {
		if tspath.ToPath(configFileName, r.program.GetCurrentDirectory(), r.program.UseCaseSensitiveFileNames()) != requestedPath {
			continue
		}
		configFileContent, ok := r.sd.snapshot.ReadFile(configFileName)
		if !ok {
			return nil
		}
		return tsoptions.NewTsconfigSourceFileFromFilePath(configFileName, requestedPath, configFileContent).SourceFile
	}

	return nil
}

// wireDiagnostic adapts a DiagnosticResponse to diagnosticwriter.Diagnostic.
type wireDiagnostic struct {
	resp    *DiagnosticResponse
	file    diagnosticwriter.FileLike
	pos     int // UTF-8 byte offset
	end     int // UTF-8 byte offset
	chain   []diagnosticwriter.Diagnostic
	related []diagnosticwriter.Diagnostic
}

func newWireDiagnostic(
	resp *DiagnosticResponse,
	resolver *formatFileResolver,
) (*wireDiagnostic, error) {
	sourceFile := resolver.resolve(resp.FileName)
	if resp.FileName != "" && sourceFile == nil {
		return nil, fmt.Errorf("%w: diagnostic source file not found: %s", ErrClientError, resp.FileName)
	}
	if sourceFile != nil && resp.SourceFileHash != "" && sourceFileHash(sourceFile) != resp.SourceFileHash {
		return nil, fmt.Errorf("%w: diagnostic source file content has changed: %s", ErrClientError, resp.FileName)
	}

	pos, end := resp.Pos, resp.End
	var file diagnosticwriter.FileLike
	if sourceFile != nil {
		positionMap := sourceFile.GetPositionMap()
		pos = positionMap.UTF16ToUTF8(resp.Pos)
		end = positionMap.UTF16ToUTF8(resp.End)
		textLength := len(sourceFile.Text())
		pos = max(0, min(pos, textLength))
		end = max(pos, min(end, textLength))
		file = sourceFile
		if resp.DisplayFileName != "" {
			file = &diagnosticDisplayFile{
				SourceFile: sourceFile,
				fileName:   resp.DisplayFileName,
			}
		}
	}

	wd := &wireDiagnostic{resp: resp, file: file, pos: pos, end: end}

	if len(resp.MessageChain) > 0 {
		wd.chain = make([]diagnosticwriter.Diagnostic, len(resp.MessageChain))
		for i, c := range resp.MessageChain {
			diag, err := newWireDiagnostic(c, resolver)
			if err != nil {
				return nil, err
			}
			wd.chain[i] = diag
		}
	}
	if len(resp.RelatedInformation) > 0 {
		wd.related = make([]diagnosticwriter.Diagnostic, len(resp.RelatedInformation))
		for i, ri := range resp.RelatedInformation {
			diag, err := newWireDiagnostic(ri, resolver)
			if err != nil {
				return nil, err
			}
			wd.related[i] = diag
		}
	}

	return wd, nil
}

type diagnosticDisplayFile struct {
	*ast.SourceFile
	fileName string
}

func (f *diagnosticDisplayFile) FileName() string {
	return f.fileName
}

func (f *diagnosticDisplayFile) FileNameIsFormatted() bool {
	return true
}

func (d *wireDiagnostic) File() diagnosticwriter.FileLike {
	return d.file
}

func (d *wireDiagnostic) Pos() int                        { return d.pos }
func (d *wireDiagnostic) End() int                        { return d.end }
func (d *wireDiagnostic) Len() int                        { return d.end - d.pos }
func (d *wireDiagnostic) Code() int32                     { return d.resp.Code }
func (d *wireDiagnostic) Category() diagnostics.Category  { return d.resp.Category }
func (d *wireDiagnostic) Source() string                  { return d.resp.Source }
func (d *wireDiagnostic) Localize(_ locale.Locale) string { return d.resp.Text }

func (d *wireDiagnostic) MessageChain() []diagnosticwriter.Diagnostic       { return d.chain }
func (d *wireDiagnostic) RelatedInformation() []diagnosticwriter.Diagnostic { return d.related }
