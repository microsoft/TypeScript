package compiler

import (
	"context"
	"math"
	"slices"
	"sort"
	"sync"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/checker"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/tracing"
)

// CheckerPool is implemented by the project system to provide checkers with
// request-scoped lifetime and reclamation. It returns a checker and a release
// function that must be called when the caller is done with the checker.
// The returned checker must not be accessed concurrently; each acquisition is exclusive.
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

  - A vertex is a source file.
  - An undirected edge connects two files for each resolved, in-program import
    entry between them. Multiple entries may connect the same pair and therefore
    strengthen their affinity. Self-imports and unresolved or external targets do
    not create edges.
  - A partition is a checker with its own symbol, type, and instantiation caches.

Putting related files on the same checker reduces duplicated cache construction,
but concentrating too many roots on one checker increases the parallel critical
path. We use weighted FENNEL to trade off those objectives:

  affinity(partition) - alpha * incrementalLoadPenalty(partition)

See Tsourakakis et al., "FENNEL: Streaming Graph Partitioning for Massive Scale
Graphs", WSDM 2014: https://doi.org/10.1145/2556195.2556213.

FENNEL is sensitive to stream order. This is both established in the partitioning
literature (for example, Awadelkarim and Ugander, "Prioritized Restreaming
Algorithms for Balanced Graph Partitioning", KDD 2020:
https://arxiv.org/abs/2007.03131) and pronounced in checker workloads because
semantic work is demand-driven. During calibration with four checkers,
degree-first streams produced nearly equal estimated loads but highly unequal
per-checker completion times:

  - MUI docs: approximately 0.6s, 2.8s, 15.3s, and 19.0s.
  - XState: approximately 0.04s, 0.35s, 0.67s, and 1.18s.

Seeded random-order testing also found repeatable slow orders with identical
diagnostics, including about +37% MUI docs and +59% XState compiler Check time
relative to normal order, again with four checkers. Therefore stream order is part
of the policy below, rather than an incidental implementation detail.
*/

/*
The constants below are empirical safety factors for a work proxy that cannot
observe future semantic cache construction. They were swept across representative
projects including VS Code, TypeScript, MUI docs, XState, and Bluesky, with 2, 4,
and 8 checkers:

  - 100-byte text weight divisor: among 25, 50, 75, 80, 90, 100, 110, 125, 150,
    200, and 400, this kept large literals, comments, and generated files from
    appearing artificially cheap without allowing raw byte length to dominate.
    Nearby values occasionally improved one project, but 100 was the most robust
    setting, particularly on VS Code and MUI docs.
  - 4x source-file weight: among 2x, 3x, 4x, 5x, and 8x, this best balanced
    declaration-heavy projects without losing the locality benefit.
  - 16x FENNEL penalty: 1x, 2x, 4x, 8x, 12x, 16x, 20x, 24x, 32x, and 64x were
    sampled across the experiments; 16x was the most robust balance/locality
    compromise for declaration-heavy projects.
  - 12x prioritized-source penalty: 8x, 12x, 16x, 20x, and 24x were compared;
    source-first ordering already spreads expensive roots, and 12x retained more
    locality than the stronger settings.
  - 4-checker cutoff: at 2-3 checkers the tight load cap provides enough balance;
    extra source weighting and penalty pressure regressed some projects.

These are project-independent operating points, not formulas derived by FENNEL.
Rebenchmark the vscode, self-compiler, mui-docs, and xstate-main scenarios in the
TypeScript-benchmarking repository at 2, 4, and 8 checkers before changing them.
*/
const (
	checkerAssociationTextWeightDivisor            = 100
	checkerAssociationSourceFileWeightMultiplier   = 4
	checkerAssociationBalancePenaltyMultiplier     = 16
	checkerAssociationPrioritizedSourcePenalty     = 12
	checkerAssociationStrongBalanceMinCheckerCount = 4
)

type checkerAssociationPolicy struct {
	prioritizeSourceFiles      bool
	sourceFileWeightMultiplier int
	balancePenaltyMultiplier   int
}

/*
getCheckerAssociationPolicy selects one of three calibrated regimes:

 1. Source-dominated, any checker count:
    source files first by descending weight; unmodified source-file weight;
    checkerAssociationPrioritizedSourcePenalty.
 2. Declaration-heavy, at least checkerAssociationStrongBalanceMinCheckerCount:
    program order; checkerAssociationSourceFileWeightMultiplier;
    checkerAssociationBalancePenaltyMultiplier.
 3. Declaration-heavy, fewer checkers:
    program order; unmodified source-file weight; unscaled adapted FENNEL
    penalty.

The source-dominated test is evaluated first intentionally: projects with very
little declaration work benefit from balancing source-file roots directly even
with a small checker pool.
*/
func getCheckerAssociationPolicy(totalWeight int, declarationWeight int, checkerCount int) checkerAssociationPolicy {
	if shouldPrioritizeSourceFiles(totalWeight, declarationWeight, checkerCount) {
		return checkerAssociationPolicy{
			prioritizeSourceFiles:      true,
			sourceFileWeightMultiplier: 1,
			balancePenaltyMultiplier:   checkerAssociationPrioritizedSourcePenalty,
		}
	}
	if checkerCount >= checkerAssociationStrongBalanceMinCheckerCount {
		return checkerAssociationPolicy{
			sourceFileWeightMultiplier: checkerAssociationSourceFileWeightMultiplier,
			balancePenaltyMultiplier:   checkerAssociationBalancePenaltyMultiplier,
		}
	}
	return checkerAssociationPolicy{
		sourceFileWeightMultiplier: 1,
		balancePenaltyMultiplier:   1,
	}
}

// getCheckerAssociationsInOrder partitions the import graph using a weighted adaptation
// of FENNEL's streaming graph-partitioning objective with gamma = 3/2. Each file
// is placed where it has the most already-placed neighbors, minus the incremental
// convex load penalty. The published alpha = m*sqrt(k)/n^(3/2) becomes
// m*sqrt(k)/W^(3/2), where W is total estimated checker work. penaltyMultiplier
// applies the empirical safety factor selected by getCheckerAssociationPolicy.
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
			penalty := alpha * (newWeight*math.Sqrt(newWeight) - oldWeight*math.Sqrt(oldWeight))
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

// getCheckerAssociationOrder places source files before declarations and
// orders each group by descending estimated work. This exposes expensive semantic
// roots early, when all checker loads are still available. Returning nil preserves
// program order without allocating an index array. Program order is itself a
// locality choice: it preserves deterministic groups produced during program
// construction and was consistently safer for declaration-heavy projects.
func getCheckerAssociationOrder(fileWeights []int, isDeclarationFile []bool, prioritizeSourceFiles bool) []int {
	if !prioritizeSourceFiles {
		return nil
	}
	fileOrder := make([]int, len(fileWeights))
	for i := range fileOrder {
		fileOrder[i] = i
	}
	sort.Slice(fileOrder, func(i, j int) bool {
		left := fileOrder[i]
		right := fileOrder[j]
		if isDeclarationFile[left] != isDeclarationFile[right] {
			return !isDeclarationFile[left]
		}
		if fileWeights[left] != fileWeights[right] {
			return fileWeights[left] > fileWeights[right]
		}
		return left < right
	})
	return fileOrder
}

func getCheckerAssociationBaseWeight(nodeCount int, textLength int) int {
	return max(nodeCount+textLength/checkerAssociationTextWeightDivisor, 1)
}

// shouldPrioritizeSourceFiles reports whether all declaration-file base work is at
// most half of one average checker load:
//
//	declarationWeight <= totalWeight / (2 * checkerCount)
//
// This threshold separated source-dominated projects such as VS Code from projects
// where declaration locality remained important, such as MUI docs, TypeScript, and
// XState. Delaying at most half a checker-load of declarations was the stable
// boundary in the cross-project sweeps.
func shouldPrioritizeSourceFiles(totalWeight int, declarationWeight int, checkerCount int) bool {
	return declarationWeight*checkerCount*2 <= totalWeight
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

		associations := make([]int, len(p.program.files))
		if checkerCount > 1 {
			baseWeights := make([]int, len(p.program.files))
			importCounts := make([]int, len(p.program.files))
			isDeclarationFile := make([]bool, len(p.program.files))
			totalBaseWeight := 0
			declarationBaseWeight := 0
			for i, file := range p.program.files {
				baseWeight := getCheckerAssociationBaseWeight(file.NodeCount, len(file.Text()))
				totalBaseWeight += baseWeight
				if file.IsDeclarationFile {
					declarationBaseWeight += baseWeight
				}
				baseWeights[i] = baseWeight
				importCounts[i] = len(file.Imports())
				isDeclarationFile[i] = file.IsDeclarationFile
			}
			policy := getCheckerAssociationPolicy(totalBaseWeight, declarationBaseWeight, checkerCount)
			if policy.sourceFileWeightMultiplier != 1 {
				// Apply this before import normalization. The policy intentionally
				// increases both source-file work and the normalized import unit.
				for i, declaration := range isDeclarationFile {
					if !declaration {
						baseWeights[i] *= policy.sourceFileWeightMultiplier
					}
				}
			}
			fileWeights := getCheckerAssociationWeights(baseWeights, importCounts)
			adjacentFiles := p.getImportAdjacency()
			fileOrder := getCheckerAssociationOrder(fileWeights, isDeclarationFile, policy.prioritizeSourceFiles)
			associations = getCheckerAssociationsInOrder(fileWeights, adjacentFiles, fileOrder, checkerCount, policy.balancePenaltyMultiplier)
		}
		p.fileAssociations = make(map[*ast.SourceFile]*checker.Checker, len(p.program.files))
		for i, file := range p.program.files {
			p.fileAssociations[file] = p.checkers[associations[i]]
		}
	})
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
		resolvedModules := p.program.resolvedModules[file.Path()]
		for _, resolved := range resolvedModules {
			if resolved == nil || !resolved.IsResolved() {
				continue
			}
			importedFile := p.program.GetSourceFileForResolvedModule(resolved.ResolvedFileName)
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
