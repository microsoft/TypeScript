package harnessutil

import (
	"context"
	"fmt"
	"hash/fnv"
	"math/rand/v2"
	"os"
	"strconv"
	"strings"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/compiler"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/scanner"
	"github.com/microsoft/TypeScript/tsc/internal/tsoptions"
)

// Setting TS_CHECK_ORDER_FUZZ=n checks each test that has no checkOrder
// option n more times, each time in a fresh program that first answers a
// random selection of queries in a random order: the type or symbol of a
// node, or the diagnostics of a file. A test fails if its diagnostics, or
// the type or symbol of any node, then differ from checking in program
// order, and reports the smallest list of queries that still makes them
// differ. TS_CHECK_ORDER_FUZZ_SEED=s runs only seed s.

type fuzzQuery struct {
	file  *ast.SourceFile
	node  *ast.Node // nil to get the diagnostics of file
	index int       // of node in fuzzNodes(file)
	kind  fuzzQueryKind
}

type fuzzQueryKind int

const (
	fuzzQueryType fuzzQueryKind = iota
	fuzzQuerySymbol
	fuzzQueryDiagnostics
)

func (q fuzzQuery) String() string {
	if q.kind == fuzzQueryDiagnostics {
		return fmt.Sprintf("diagnostics of %s", q.file.FileName())
	}
	kind := "type"
	if q.kind == fuzzQuerySymbol {
		kind = "symbol"
	}
	if ast.PositionIsSynthesized(q.node.Pos()) {
		return fmt.Sprintf("%s of synthesized %s %d in %s", kind, q.node.Kind, q.index, q.file.FileName())
	}
	pos := scanner.GetTokenPosOfNode(q.node, q.file, false)
	line, character := scanner.GetECMALineAndUTF16CharacterOfPosition(q.file, pos)
	return fmt.Sprintf("%s of %s at %s(%d,%d)", kind, scanner.GetTextOfNode(q.node), q.file.FileName(), line+1, int(character)+1)
}

// fuzzResult is what a check order must not change: diagnostics and the
// type and symbol of every queryable node.
type fuzzResult []string

func fuzzCheckOrder(t *testing.T, host compiler.CompilerHost, config *tsoptions.ParsedCommandLine, harnessOptions *HarnessOptions) {
	n, _ := strconv.Atoi(os.Getenv("TS_CHECK_ORDER_FUZZ"))
	if t == nil || n <= 0 || harnessOptions.CheckOrder != "" && harnessOptions.CheckOrder != "default" {
		return
	}
	options := config.CompilerOptions().Clone()
	options.TraceResolution = core.TSFalse
	fuzzConfig := tsoptions.NewParsedCommandLine(options, config.FileNames(), config.ProjectReferences(), config.BaseDirectory(), config.CaseSensitivity())
	fuzzConfig.ParsedConfig.ContentMappers = config.ContentMappers()
	fuzzConfig.ConfigFile = config.ConfigFile
	fuzzConfig.Errors = config.Errors

	ctx := context.Background()
	expected := fuzzRun(ctx, host, fuzzConfig, nil)
	seeds := make([]uint64, n)
	for i := range seeds {
		seeds[i] = uint64(i)
	}
	if s := os.Getenv("TS_CHECK_ORDER_FUZZ_SEED"); s != "" {
		seed, err := strconv.ParseUint(s, 10, 64)
		if err != nil {
			t.Fatalf("invalid TS_CHECK_ORDER_FUZZ_SEED: %v", err)
		}
		seeds = []uint64{seed}
	}
	h := fnv.New64a()
	h.Write([]byte(t.Name()))
	stream := h.Sum64()
	for _, seed := range seeds {
		queries := fuzzQueries(createProgram(host, fuzzConfig), rand.New(rand.NewPCG(seed, stream)))
		diverges := func(queries []fuzzQuery) bool {
			return fuzzDiff(expected, fuzzRun(ctx, host, fuzzConfig, queries)) != ""
		}
		if !diverges(queries) {
			continue
		}
		queries = fuzzMinimize(queries, diverges)
		var b strings.Builder
		fmt.Fprintf(&b, "check order fuzzing with TS_CHECK_ORDER_FUZZ_SEED=%d changed results after querying:\n", seed)
		for _, q := range queries {
			fmt.Fprintf(&b, "    %s\n", q)
		}
		b.WriteString("results in program order (-) and after the queries (+):\n")
		b.WriteString(fuzzDiff(expected, fuzzRun(ctx, host, fuzzConfig, queries)))
		t.Error(b.String())
	}
}

// fuzzQueries returns the queries for one seed: a random selection of every
// possible query, often only a few so that the first query matters.
func fuzzQueries(program compiler.ProgramLike, rng *rand.Rand) []fuzzQuery {
	var queries []fuzzQuery
	for _, file := range fuzzCheckedFiles(program) {
		queries = append(queries, fuzzQuery{file: file, kind: fuzzQueryDiagnostics})
		for i, node := range fuzzNodes(file) {
			if fuzzHasType(node) {
				queries = append(queries, fuzzQuery{file, node, i, fuzzQueryType})
			}
			queries = append(queries, fuzzQuery{file, node, i, fuzzQuerySymbol})
		}
	}
	rng.Shuffle(len(queries), func(i, j int) { queries[i], queries[j] = queries[j], queries[i] })
	if len(queries) == 0 {
		return nil
	}
	switch rng.IntN(3) {
	case 0:
		return queries[:1+rng.IntN(min(len(queries), 4))]
	case 1:
		return queries[:rng.IntN(len(queries)+1)]
	default:
		return queries
	}
}

// fuzzMinimize returns a 1-minimal sublist of queries for which diverges
// still holds (Zeller's ddmin).
func fuzzMinimize(queries []fuzzQuery, diverges func([]fuzzQuery) bool) []fuzzQuery {
	n := 2
	for len(queries) >= 2 {
		chunk := (len(queries) + n - 1) / n
		reduced := false
		for start := 0; start < len(queries); start += chunk {
			complement := append(queries[:start:start], queries[min(start+chunk, len(queries)):]...)
			if diverges(complement) {
				queries = complement
				n = max(n-1, 2)
				reduced = true
				break
			}
		}
		if !reduced {
			if n >= len(queries) {
				break
			}
			n = min(n*2, len(queries))
		}
	}
	return queries
}

func fuzzCheckedFiles(program compiler.ProgramLike) []*ast.SourceFile {
	var files []*ast.SourceFile
	for _, file := range program.GetSourceFiles() {
		if !program.Program().SkipTypeChecking(file, false) {
			files = append(files, file)
		}
	}
	return files
}

// fuzzNodes returns the nodes of file that queryTypesAndSymbols queries.
func fuzzNodes(file *ast.SourceFile) []*ast.Node {
	var nodes []*ast.Node
	var visit func(n *ast.Node) bool
	visit = func(n *ast.Node) bool {
		if n.Flags&ast.NodeFlagsReparsed == 0 && (ast.IsExpressionNode(n) || n.Kind == ast.KindIdentifier || ast.IsDeclarationName(n)) {
			nodes = append(nodes, n)
		}
		n.ForEachChild(visit)
		return false
	}
	file.AsNode().ForEachChild(visit)
	return nodes
}

func fuzzHasType(node *ast.Node) bool {
	return !ast.IsPartOfTypeNode(node) && !ast.IsOmittedExpression(node)
}

// fuzzRun answers queries, given in the files of the program that
// fuzzQueries was given, in a fresh program, then returns its results.
func fuzzRun(ctx context.Context, host compiler.CompilerHost, config *tsoptions.ParsedCommandLine, queries []fuzzQuery) fuzzResult {
	program := createProgram(host, config)
	files := fuzzCheckedFiles(program)
	// Queries name nodes of another program over the same files, so find
	// the same nodes here by their index.
	nodesByFile := make(map[string][]*ast.Node)
	for _, file := range files {
		nodesByFile[string(file.FileName())] = fuzzNodes(file)
	}
	for _, q := range queries {
		file := program.GetSourceFile(q.file.FileName())
		if q.kind == fuzzQueryDiagnostics {
			program.GetSemanticDiagnostics(ctx, file)
			continue
		}
		node := nodesByFile[string(file.FileName())][q.index]
		c, done := program.Program().GetTypeCheckerForFile(ctx, file)
		if q.kind == fuzzQueryType {
			c.GetTypeAtLocation(node)
		} else {
			c.GetSymbolAtLocation(node)
		}
		done()
	}

	var diags []*ast.Diagnostic
	diags = append(diags, program.GetSyntacticDiagnostics(ctx, nil)...)
	diags = append(diags, program.GetSemanticDiagnostics(ctx, nil)...)
	diags = append(diags, program.GetGlobalDiagnostics(ctx)...)
	if program.Options().GetEmitDeclarations() {
		diags = append(diags, program.GetDeclarationDiagnostics(ctx, nil)...)
	}
	var result fuzzResult
	for _, d := range compiler.SortAndDeduplicateDiagnostics(diags) {
		var b strings.Builder
		fuzzFormatDiagnostic(&b, d, "")
		result = append(result, b.String())
	}
	for _, file := range files {
		c, done := program.Program().GetTypeCheckerForFile(ctx, file)
		for i, node := range nodesByFile[string(file.FileName())] {
			q := fuzzQuery{file, node, i, fuzzQuerySymbol}
			if fuzzHasType(node) {
				result = append(result, fmt.Sprintf("type of %s: %s", strings.TrimPrefix(q.String(), "symbol of "), c.TypeToString(c.GetTypeAtLocation(node))))
			}
			if symbol := c.GetSymbolAtLocation(node); symbol != nil {
				result = append(result, fmt.Sprintf("%s: %s", q, c.SymbolToString(symbol)))
			}
		}
		done()
	}
	return result
}

func fuzzFormatDiagnostic(b *strings.Builder, d *ast.Diagnostic, indent string) {
	b.WriteString(indent)
	if d.File() != nil {
		line, character := scanner.GetECMALineAndUTF16CharacterOfPosition(d.File(), d.Pos())
		fmt.Fprintf(b, "%s(%d,%d): ", d.File().FileName(), line+1, int(character)+1)
	}
	fmt.Fprintf(b, "TS%d: %s", d.Code(), d.String())
	for _, chained := range d.MessageChain() {
		b.WriteString("\n")
		fuzzFormatDiagnostic(b, chained, indent+"    ")
	}
	for _, related := range d.RelatedInformation() {
		b.WriteString("\n")
		fuzzFormatDiagnostic(b, related, indent+"    related ")
	}
}

// fuzzDiff describes how actual differs from expected, or returns "".
func fuzzDiff(expected, actual fuzzResult) string {
	count := make(map[string]int)
	for _, line := range expected {
		count[line]++
	}
	for _, line := range actual {
		count[line]--
	}
	var b strings.Builder
	for _, line := range expected {
		if count[line] > 0 {
			count[line]--
			fmt.Fprintf(&b, "- %s\n", line)
		}
	}
	for _, line := range actual {
		if count[line] < 0 {
			count[line]++
			fmt.Fprintf(&b, "+ %s\n", line)
		}
	}
	return b.String()
}
