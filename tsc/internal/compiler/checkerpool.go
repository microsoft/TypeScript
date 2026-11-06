package compiler

import (
	"context"
	"math"
	"runtime"
	"slices"
	"sort"
	"sync"
	"sync/atomic"

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
	fileIndices        map[*ast.SourceFile]int
	fileCheckers       []atomic.Int32 // Index in checkers of the checker of each file, by file index
	associations       []int          // from ProgramFactories.AssignCheckers, if set
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

/*
defaultCheckerCount picks the number of checkers when none is given. Which
checker checks a file does not change the results, and checkers take files
from each other once out of their own, so the count only trades time for
memory. Each checker builds much the same library and shared types, so
every checker adds work and memory of its own, and checking is fastest with
about one checker per CPU, up to the point where that duplicated work
dominates:

  - With 4 or 8 CPUs, measured with the process restricted to them, one
    checker per logical CPU was fastest for nearly every project, and
    hyperthreads were nearly as good as cores.
  - With 20 CPUs (10 cores), 8 checkers were fastest for most projects;
    only very large programs (VS Code) gained up to 12-16.
  - Programs with few checked files gain nothing from more checkers than a
    few files each, but even those with a few dozen files gain from the 4
    checkers that were the default before.

Work is estimated from the files that are checked: those whose checking is
skipped, such as declaration files under skipLibCheck, count for nothing.
*/
func defaultCheckerCount(program *Program) int {
	procs := program.opts.CheckerProcs
	if procs <= 0 {
		procs = runtime.GOMAXPROCS(0)
	}
	files, weight := 0, 0
	for _, file := range program.files {
		if !program.SkipTypeChecking(file, true /*ignoreNoCheck*/) {
			files++
			weight += getCheckerAssociationBaseWeight(file.NodeCount, len(file.Text()))
		}
	}
	limit := min(max(int(defaultCheckerLimit*math.Sqrt(float64(weight)/defaultCheckerLimitWeight)), defaultCheckerLimit), maxDefaultCheckerLimit)
	return max(min(procs, limit, (files+filesPerChecker-1)/filesPerChecker), min(procs, minDefaultCheckers))
}

const (
	// defaultCheckerLimit is the checker count past which more checkers stop
	// paying for their duplicated work, for programs up to
	// defaultCheckerLimitWeight of checked work. Larger programs get more, up
	// to maxDefaultCheckerLimit, with the square root of their size.
	defaultCheckerLimit       = 8
	defaultCheckerLimitWeight = 8_000_000
	maxDefaultCheckerLimit    = 16
	// filesPerChecker is the number of checked files below which another
	// checker does not pay for itself, above minDefaultCheckers.
	filesPerChecker    = 32
	minDefaultCheckers = 4
)

func newCheckerPool(program *Program) *checkerPool {
	return newCheckerPoolWithTracing(program, nil)
}

func newCheckerPoolWithTracing(program *Program, tr *tracing.Tracing) *checkerPool {
	return newCheckerPoolWithAssignment(program, tr, nil)
}

// newCheckerPoolWithAssignment is newCheckerPoolWithTracing with the checker
// of each file given by assign, if set; see ProgramFactories.AssignCheckers.
func newCheckerPoolWithAssignment(program *Program, tr *tracing.Tracing, assign func([]*ast.SourceFile) []int) *checkerPool {
	var associations []int
	var checkerCount int
	if assign != nil {
		associations = assign(program.files)
		checkerCount = 1
		if len(associations) > 0 {
			checkerCount = slices.Max(associations) + 1
		}
	} else {
		if program.SingleThreaded() {
			checkerCount = 1
		} else if c := program.Options().Checkers; c != nil {
			checkerCount = *c
		} else {
			checkerCount = defaultCheckerCount(program)
		}
		checkerCount = max(min(checkerCount, len(program.files), 256), 1)
	}

	pool := &checkerPool{
		program:      program,
		checkers:     make([]*checker.Checker, checkerCount),
		locks:        make([]*sync.Mutex, checkerCount),
		tracing:      tr,
		associations: associations,
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
	return p.checkers[p.checkerIndexOf(file)], noop
}

// checkerIndexOf returns the index in checkers of the checker the file is
// associated with: the one that checked it, or that will.
func (p *checkerPool) checkerIndexOf(file *ast.SourceFile) int {
	return int(p.fileCheckers[p.fileIndices[file]].Load())
}

func (p *checkerPool) getCheckerForFileExclusive(ctx context.Context, file *ast.SourceFile) (*checker.Checker, func()) {
	p.createCheckers()
	idx := p.checkerIndexOf(file)
	c := p.checkers[idx]
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
		wg := core.NewWorkGroup(core.WorkGroupConcurrency(p.program.SingleThreaded()))
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

		associations := p.associations
		if associations == nil {
			associations = make([]int, len(p.program.files))
		}
		if checkerCount > 1 && p.associations == nil {
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
		p.fileIndices = make(map[*ast.SourceFile]int, len(p.program.files))
		p.fileCheckers = make([]atomic.Int32, len(p.program.files))
		for i, file := range p.program.files {
			p.fileIndices[file] = i
			p.fileCheckers[i].Store(int32(associations[i]))
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
	wg := core.NewWorkGroup(core.WorkGroupConcurrency(p.program.SingleThreaded()))
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

// forEachCheckerGroupDo runs one task per checker in parallel, each checking
// first the files associated with it, in their original order. A task that
// runs out of files takes the last file not yet started from the checker with
// the most left, and the file is associated with its checker from then on.
// Which checker checks a file and what it checked before do not change the
// results, only how much each checker can reuse.
func (p *checkerPool) forEachCheckerGroupDo(ctx context.Context, files []*ast.SourceFile, singleThreaded bool, cb func(c *checker.Checker, fileIndex int, file *ast.SourceFile)) {
	if ctx.Err() != nil {
		return
	}
	p.program.bindSourceFiles(ctx)
	if ctx.Err() != nil {
		return
	}
	groups := p.groupFilesByChecker(files)
	if singleThreaded || len(p.checkers) == 1 {
		// Tasks run one after another, so the first would take every file.
		for checkerIdx, group := range groups {
			c := p.checkers[checkerIdx]
			p.locks[checkerIdx].Lock()
			for _, i := range group {
				if ctx.Err() != nil {
					break
				}
				cb(c, i, files[i])
			}
			p.locks[checkerIdx].Unlock()
		}
		return
	}
	queues := make([]fileQueue, len(groups))
	for i, group := range groups {
		queues[i].files = group
	}
	wg := core.NewWorkGroup(core.WorkGroupConcurrency(false))
	for checkerIdx := range groups {
		wg.Queue(func() {
			c := p.checkers[checkerIdx]
			p.locks[checkerIdx].Lock()
			defer p.locks[checkerIdx].Unlock()
			for ctx.Err() == nil {
				i, ok := queues[checkerIdx].popFront()
				if !ok {
					i, ok = stealFile(queues)
					if !ok {
						return
					}
					p.fileCheckers[p.fileIndices[files[i]]].Store(int32(checkerIdx))
				}
				cb(c, i, files[i])
			}
		})
	}
	wg.RunAndWait()
}

// A fileQueue holds the indices of the files a checker has yet to start.
type fileQueue struct {
	mu    sync.Mutex
	files []int
}

func (q *fileQueue) popFront() (int, bool) {
	q.mu.Lock()
	defer q.mu.Unlock()
	if len(q.files) == 0 {
		return 0, false
	}
	i := q.files[0]
	q.files = q.files[1:]
	return i, true
}

func (q *fileQueue) popBack() (int, bool) {
	q.mu.Lock()
	defer q.mu.Unlock()
	if len(q.files) == 0 {
		return 0, false
	}
	i := q.files[len(q.files)-1]
	q.files = q.files[:len(q.files)-1]
	return i, true
}

func (q *fileQueue) len() int {
	q.mu.Lock()
	defer q.mu.Unlock()
	return len(q.files)
}

// stealFile takes the last file of the queue with the most files left, the
// one its checker would reach last.
func stealFile(queues []fileQueue) (int, bool) {
	for {
		victim, most := -1, 0
		for i := range queues {
			if n := queues[i].len(); n > most {
				victim, most = i, n
			}
		}
		if victim < 0 {
			return 0, false
		}
		if i, ok := queues[victim].popBack(); ok {
			return i, true
		}
	}
}

// groupFilesByChecker returns the indices of files grouped by the checker each file is associated with. Files keep
// their order within each group.
func (p *checkerPool) groupFilesByChecker(files []*ast.SourceFile) [][]int {
	p.createCheckers()
	groups := make([][]int, len(p.checkers))
	for i, file := range files {
		if j, ok := p.fileIndices[file]; ok {
			idx := int(p.fileCheckers[j].Load())
			groups[idx] = append(groups[idx], i)
		}
	}
	return groups
}

func noop() {}
