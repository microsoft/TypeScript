package compiler

import (
	"cmp"
	"context"
	"math"
	"slices"
	"strings"
	"sync"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/checker"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/tracing"
)

// CheckerPool is implemented by the project system to provide checkers with
// request-scoped lifetime and reclamation. It returns a checker and a release
// function that must be called when the caller is done with the checker.
// The returned checker must not be accessed concurrently; each acquisition is exclusive.
// Acquisitions are not reentrant, even when they share a request ID. Callers must
// pass an already acquired checker to nested operations instead of acquiring again.
// If file is non-nil, the pool may use it as an affinity hint to return the same
// checker for the same file across calls.
type CheckerPool interface {
	GetChecker(ctx context.Context, file *ast.SourceFile) (*checker.Checker, func())
}

type checkerPool struct {
	program *Program
	tracing *tracing.Tracing

	createCheckersOnce sync.Once
	checkers           []*checker.Checker
	locks              []*sync.Mutex
	fileAssociations   map[*ast.SourceFile]*checker.Checker
}

var _ CheckerPool = (*checkerPool)(nil)

/*
Checker association is a balanced graph-partitioning problem:

  - A vertex is a group of type-checked source files.
  - An undirected edge connects two groups for each resolved, in-program import
    entry between files in them. Multiple entries may connect the same pair and
    therefore strengthen their affinity. Self-imports and unresolved or external
    targets do not create edges.
  - A partition is a checker with its own symbol, type, and instantiation caches.

Putting related files on the same checker reduces duplicated cache construction,
but concentrating too many roots on one checker increases the parallel critical
path. We use weighted FENNEL to trade off those objectives:

	affinity(partition) - alpha * incrementalLoadPenalty(partition)

See Tsourakakis et al., "FENNEL: Streaming Graph Partitioning for Massive Scale
Graphs", WSDM 2014: https://doi.org/10.1145/2556195.2556213.

Import edges alone are a weak locality signal: most of a checker's caches are
built for the types that a file's whole neighborhood shares (a framework's
declarations, a package's own types), and files in one directory tend to share
far more of those than their direct imports show. So FENNEL places directories
rather than single files. Walking down from the root, the first directory small
enough to fit within 1/checkerAssociationGroupFraction of an average checker
load becomes one unit with everything beneath it; a file whose every enclosing
directory is too big is a unit by itself. Units are placed from heaviest to
lightest, so that the big ones are spread while every checker still has room,
and the small ones fill in the remaining capacity next to their neighbors.

Declaration and JSON files whose checking is skipped (skipLibCheck or
skipDefaultLibCheck) are left out of the partition entirely, since no checker
spends time on them up front. Any later on-demand request for one goes to
checker 0.

FENNEL is sensitive to stream order. This is both established in the partitioning
literature (for example, Awadelkarim and Ugander, "Prioritized Restreaming
Algorithms for Balanced Graph Partitioning", KDD 2020:
https://arxiv.org/abs/2007.03131) and pronounced in checker workloads because
semantic work is demand-driven. Directory groups bound how far a bad order can
scatter related files.

The constants below were chosen on bluesky, sentry, t3code (server), MUI docs,
VS Code, XState, and the TypeScript compiler at 2, 4, and 8 checkers:

  - 100-byte text weight divisor: keeps large literals, comments, and generated
    files from appearing artificially cheap without allowing raw byte length to
    dominate.
  - 1/4 checker load per group: large enough to keep a package's files
    together, small enough that groups can still be balanced.
  - 1x FENNEL penalty: groups already carry the locality, so the balance term
    only needs to break ties between checkers with similar affinity.
  - 256 imports per file: a file with more is a barrel or a route table whose
    references are cheap to check (MUI's icon index re-exports 10,750 modules
    and takes 20ms, but uncapped it would carry 14% of the estimated work and
    pull every icon onto its checker with it).
*/
const (
	checkerAssociationTextWeightDivisor = 100
	checkerAssociationGroupFraction     = 4
	checkerAssociationPenaltyMultiplier = 1
	checkerAssociationMaxImports        = 256
)

// getCheckerAssociationsInOrder partitions the import graph using a weighted adaptation
// of FENNEL's streaming graph-partitioning objective with gamma = 3/2. Each file
// is placed where it has the most already-placed neighbors, minus the incremental
// convex load penalty. The published alpha = m*sqrt(k)/n^(3/2) becomes
// m*sqrt(k)/W^(3/2), where W is total estimated checker work, scaled by
// penaltyMultiplier.
//
// A nil order means stable program order. The preferred maximum checker weight is
// the larger of the largest file and roughly 101% of average. If no checker can
// accept a file under that bound, the file is assigned to the least-loaded checker.
// The 1% slack permits discrete files to pack near the average while preventing
// affinity from deliberately creating meaningful estimated imbalance. Ties are
// deterministic.
func getCheckerAssociationsInOrder(fileWeights []int, adjacentFiles [][]int, fileOrder []int, checkerCount int, penaltyMultiplier int) []int {
	if len(fileWeights) == 0 {
		return nil
	}

	totalWeight := 0
	maxFileWeight := 0
	edgeCount := 0
	for i, weight := range fileWeights {
		totalWeight += weight
		maxFileWeight = max(maxFileWeight, weight)
		edgeCount += len(adjacentFiles[i])
	}

	associations := make([]int, len(fileWeights))
	for i := range associations {
		associations[i] = -1
	}
	checkerWeights := make([]int, checkerCount)
	averageCheckerWeight := (totalWeight + checkerCount - 1) / checkerCount
	maxCheckerWeight := max(maxFileWeight, averageCheckerWeight+averageCheckerWeight/100)
	totalWeightFloat := float64(totalWeight)
	alpha := float64(penaltyMultiplier) * float64(edgeCount/2) * math.Sqrt(float64(checkerCount)) / (totalWeightFloat * math.Sqrt(totalWeightFloat))
	neighborCounts := make([]int, checkerCount)

	for position := range fileWeights {
		fileIndex := position
		if fileOrder != nil {
			fileIndex = fileOrder[position]
		}

		clear(neighborCounts)
		for _, adjacentFile := range adjacentFiles[fileIndex] {
			if checkerIndex := associations[adjacentFile]; checkerIndex >= 0 {
				neighborCounts[checkerIndex]++
			}
		}

		bestChecker := -1
		bestScore := math.Inf(-1)
		for checkerIndex, checkerWeight := range checkerWeights {
			if checkerWeight+fileWeights[fileIndex] > maxCheckerWeight {
				continue
			}
			oldWeight := float64(checkerWeight)
			newWeight := float64(checkerWeight + fileWeights[fileIndex])
			newPenalty := float64(newWeight * math.Sqrt(newWeight))
			oldPenalty := float64(oldWeight * math.Sqrt(oldWeight))
			penalty := float64(alpha * (newPenalty - oldPenalty))
			score := float64(neighborCounts[checkerIndex]) - penalty
			if score > bestScore || score == bestScore && (bestChecker < 0 || checkerWeight < checkerWeights[bestChecker]) {
				bestChecker = checkerIndex
				bestScore = score
			}
		}
		if bestChecker < 0 {
			bestChecker = 0
			for checkerIndex, checkerWeight := range checkerWeights[1:] {
				if checkerWeight < checkerWeights[bestChecker] {
					bestChecker = checkerIndex + 1
				}
			}
		}
		associations[fileIndex] = bestChecker
		checkerWeights[bestChecker] += fileWeights[fileIndex]
	}
	return associations
}

func getCheckerAssociationBaseWeight(nodeCount int, textLength int) int {
	return max(nodeCount+textLength/checkerAssociationTextWeightDivisor, 1)
}

// getCheckerAssociationWeights combines local syntax work with syntactic import
// fanout. One import unit is totalBaseWeight / totalImports, so imports collectively
// contribute approximately the same vertex weight as syntax. Syntactic imports are
// deliberately broader than getImportAdjacency's resolved, in-program edges: this
// term estimates the work of processing module references, while adjacency controls
// checker affinity. Normalizing the term avoids a project-specific vertex-weight
// constant.
func getCheckerAssociationWeights(baseWeights []int, importCounts []int) []int {
	totalBaseWeight := 0
	totalImports := 0
	for i, baseWeight := range baseWeights {
		totalBaseWeight += baseWeight
		totalImports += importCounts[i]
	}
	importWeight := 0
	if totalImports > 0 {
		importWeight = max(totalBaseWeight/totalImports, 1)
	}
	fileWeights := make([]int, len(baseWeights))
	for i, baseWeight := range baseWeights {
		fileWeights[i] = baseWeight + importCounts[i]*importWeight
	}
	return fileWeights
}

func newCheckerPool(program *Program) *checkerPool {
	return newCheckerPoolWithTracing(program, nil)
}

func newCheckerPoolWithTracing(program *Program, tr *tracing.Tracing) *checkerPool {
	checkerCount := 4
	if program.SingleThreaded() {
		checkerCount = 1
	} else if c := program.Options().Checkers; c != nil {
		checkerCount = *c
	}

	checkerCount = max(min(checkerCount, len(program.files), 256), 1)

	pool := &checkerPool{
		program:  program,
		checkers: make([]*checker.Checker, checkerCount),
		locks:    make([]*sync.Mutex, checkerCount),
		tracing:  tr,
	}

	return pool
}

// GetChecker implements CheckerPool. When file is non-nil, returns the checker
// associated with that file; otherwise returns the first checker.
func (p *checkerPool) GetChecker(ctx context.Context, file *ast.SourceFile) (*checker.Checker, func()) {
	if file != nil {
		return p.getCheckerForFileExclusive(ctx, file)
	}
	p.createCheckers()
	c := p.checkers[0]
	p.locks[0].Lock()
	return c, sync.OnceFunc(func() {
		p.locks[0].Unlock()
	})
}

// getCheckerForFileNonExclusive returns the checker for the given file without locking.
// This is only safe when the caller guarantees no concurrent access to the same checker,
// e.g. for read-only operations like obtaining an emit resolver.
func (p *checkerPool) getCheckerForFileNonExclusive(file *ast.SourceFile) (*checker.Checker, func()) {
	p.createCheckers()
	return p.fileAssociations[file], noop
}

func (p *checkerPool) getCheckerForFileExclusive(ctx context.Context, file *ast.SourceFile) (*checker.Checker, func()) {
	p.createCheckers()
	c := p.fileAssociations[file]
	idx := slices.Index(p.checkers, c)
	p.locks[idx].Lock()
	return c, sync.OnceFunc(func() {
		p.locks[idx].Unlock()
	})
}

// getCheckerNonExclusive returns the first checker without locking.
func (p *checkerPool) getCheckerNonExclusive() (*checker.Checker, func()) {
	p.createCheckers()
	return p.checkers[0], noop
}

func (p *checkerPool) createCheckers() {
	p.createCheckersOnce.Do(func() {
		checkerCount := len(p.checkers)
		wg := core.NewWorkGroup(p.program.SingleThreaded())
		for i := range checkerCount {
			wg.Queue(func() {
				var tracer *checker.Tracer
				if p.tracing != nil {
					tracer = checker.NewTracer(p.tracing, i)
				}
				p.checkers[i], p.locks[i] = checker.NewChecker(p.program, tracer)
			})
		}

		wg.RunAndWait()

		var associations []int
		if checkerCount > 1 {
			associations = p.getCheckerAssociations(checkerCount)
		} else {
			associations = make([]int, len(p.program.files))
		}
		p.fileAssociations = make(map[*ast.SourceFile]*checker.Checker, len(p.program.files))
		for i, file := range p.program.files {
			p.fileAssociations[file] = p.checkers[associations[i]]
		}
	})
}

// getCheckerAssociations returns the checker index of each program file.
func (p *checkerPool) getCheckerAssociations(checkerCount int) []int {
	files := p.program.files
	baseWeights := make([]int, len(files))
	importCounts := make([]int, len(files))
	var order []int
	for i, file := range files {
		if (file.IsDeclarationFile || ast.IsJsonSourceFile(file)) && p.program.SkipTypeChecking(file, false) {
			continue
		}
		baseWeights[i] = getCheckerAssociationBaseWeight(file.NodeCount, len(file.Text()))
		importCounts[i] = min(len(file.Imports()), checkerAssociationMaxImports)
		order = append(order, i)
	}
	associations := make([]int, len(files))
	if len(order) == 0 {
		return associations
	}
	weights := getCheckerAssociationWeights(baseWeights, importCounts)
	paths := make([]string, len(files))
	for _, i := range order {
		paths[i] = string(files[i].PathKey())
	}
	slices.SortFunc(order, func(a, b int) int {
		return cmp.Or(strings.Compare(paths[a], paths[b]), cmp.Compare(a, b))
	})
	groupOf, groupWeights := getDirectoryGroups(paths, weights, order, checkerCount)

	adjacentFiles := p.getImportAdjacency()
	groupAdjacency := make([][]int, len(groupWeights))
	for _, i := range order {
		for _, j := range adjacentFiles[i] {
			if gi, gj := groupOf[i], groupOf[j]; gj >= 0 && gi != gj {
				groupAdjacency[gi] = append(groupAdjacency[gi], gj)
			}
		}
	}
	groupOrder := make([]int, len(groupWeights))
	for g := range groupOrder {
		groupOrder[g] = g
	}
	slices.SortFunc(groupOrder, func(a, b int) int {
		return cmp.Or(cmp.Compare(groupWeights[b], groupWeights[a]), cmp.Compare(a, b))
	})
	groupAssociations := getCheckerAssociationsInOrder(groupWeights, groupAdjacency, groupOrder, checkerCount, checkerAssociationPenaltyMultiplier)
	for _, i := range order {
		associations[i] = groupAssociations[groupOf[i]]
	}
	return associations
}

// getDirectoryGroups assigns each file in order (sorted by path) to the
// outermost enclosing directory whose files in order weigh no more than
// 1/checkerAssociationGroupFraction of an average checker load; when no
// directory is that light, the file is alone. Groups are numbered by first
// appearance in path order. groupOf is -1 for files not in order.
func getDirectoryGroups(paths []string, weights []int, order []int, checkerCount int) (groupOf []int, groupWeights []int) {
	total := 0
	for _, i := range order {
		total += weights[i]
	}
	threshold := total / (checkerCount * checkerAssociationGroupFraction)
	subtreeWeights := make(map[string]int)
	for _, i := range order {
		path := paths[i]
		for pos := range len(path) {
			if path[pos] == '/' {
				subtreeWeights[path[:pos]] += weights[i]
			}
		}
	}
	groupIDs := make(map[string]int)
	groupOf = make([]int, len(paths))
	for i := range groupOf {
		groupOf[i] = -1
	}
	for _, i := range order {
		path := paths[i]
		key := path
		for pos := range len(path) {
			if path[pos] == '/' && subtreeWeights[path[:pos]] <= threshold {
				key = path[:pos]
				break
			}
		}
		g, ok := groupIDs[key]
		if !ok {
			g = len(groupWeights)
			groupIDs[key] = g
			groupWeights = append(groupWeights, 0)
		}
		groupOf[i] = g
		groupWeights[g] += weights[i]
	}
	return groupOf, groupWeights
}

// getImportAdjacency returns an undirected import graph represented by file
// index. A directed import from A to B makes both files adjacent because either
// file can benefit from sharing checker caches with the other.
func (p *checkerPool) getImportAdjacency() [][]int {
	fileIndices := make(map[*ast.SourceFile]int, len(p.program.files))
	for i, file := range p.program.files {
		fileIndices[file] = i
	}
	adjacentFiles := make([][]int, len(p.program.files))
	for fileIndex, file := range p.program.files {
		resolvedModules := p.program.resolvedModules[file.PathKey()]
		for _, resolved := range resolvedModules {
			if resolved == nil || !resolved.IsResolved() {
				continue
			}
			importedFile := p.program.GetSourceFileForResolvedModule(resolved)
			importedIndex, ok := fileIndices[importedFile]
			if !ok || importedIndex == fileIndex {
				continue
			}
			adjacentFiles[fileIndex] = append(adjacentFiles[fileIndex], importedIndex)
			adjacentFiles[importedIndex] = append(adjacentFiles[importedIndex], fileIndex)
		}
	}
	return adjacentFiles
}

// Runs `cb` for each checker in the pool concurrently, locking and unlocking checker mutexes as it goes,
// making it safe to call `forEachCheckerParallel` from many threads simultaneously.
func (p *checkerPool) forEachCheckerParallel(cb func(idx int, c *checker.Checker)) {
	p.createCheckers()
	wg := core.NewWorkGroup(p.program.SingleThreaded())
	for idx, checker := range p.checkers {
		wg.Queue(func() {
			p.locks[idx].Lock()
			defer p.locks[idx].Unlock()
			cb(idx, checker)
		})
	}
	wg.RunAndWait()
}

func (p *checkerPool) GetGlobalDiagnostics() []*ast.Diagnostic {
	p.createCheckers()
	globalDiagnostics := make([][]*ast.Diagnostic, len(p.checkers))
	p.forEachCheckerParallel(func(idx int, checker *checker.Checker) {
		globalDiagnostics[idx] = checker.GetGlobalDiagnostics()
	})
	return SortAndDeduplicateDiagnostics(slices.Concat(globalDiagnostics...))
}

// forEachCheckerGroupDo runs one task per checker in parallel. Each task iterates
// the provided files, processing only those assigned to its checker. Within each
// checker's set, files are visited in their original order.
func (p *checkerPool) forEachCheckerGroupDo(ctx context.Context, files []*ast.SourceFile, singleThreaded bool, cb func(c *checker.Checker, fileIndex int, file *ast.SourceFile)) {
	p.createCheckers()

	checkerCount := len(p.checkers)
	wg := core.NewWorkGroup(singleThreaded)
	for checkerIdx := range checkerCount {
		wg.Queue(func() {
			p.locks[checkerIdx].Lock()
			defer p.locks[checkerIdx].Unlock()
			for i, file := range files {
				if checker := p.checkers[checkerIdx]; checker == p.fileAssociations[file] {
					cb(checker, i, file)
				}
			}
		})
	}
	wg.RunAndWait()
}

func noop() {}
