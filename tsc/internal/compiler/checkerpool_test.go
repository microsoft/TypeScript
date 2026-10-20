package compiler

import (
	"slices"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/module"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

func TestGetSourceFileForResolvedModuleUsesResolvedPath(t *testing.T) {
	t.Parallel()
	path := tspath.PathKey("/resolved.ts")
	file := &ast.SourceFile{}
	program := &Program{
		filesByPath: map[tspath.PathKey]*ast.SourceFile{
			path: file,
		},
	}

	resolved := &module.ResolvedModule{
		ResolvedFileName: tspath.RootedFilePath("/different.ts"),
		ResolvedPath:     path,
	}
	if got := program.GetSourceFileForResolvedModule(resolved); got != file {
		t.Fatalf("GetSourceFileForResolvedModule() = %p, want %p", got, file)
	}
}

func TestGetCheckerAssociationBaseWeight(t *testing.T) {
	t.Parallel()
	if got := getCheckerAssociationBaseWeight(100, 2500); got != 125 {
		t.Fatalf("getCheckerAssociationBaseWeight() = %d, want 125", got)
	}
}

func TestGetDirectoryGroups(t *testing.T) {
	t.Parallel()
	paths := []string{
		"/p/a/x.ts",
		"/p/a/y.ts",
		"/p/b/c/z.ts",
		"/p/b/w.ts",
		"/p/lib.d.ts",
		"/p/big.ts",
	}
	weights := []int{10, 10, 10, 10, 0, 280}
	// The declaration file is not type checked, so it is not in order.
	order := []int{0, 1, 2, 3, 5}
	// Groups of at most 10 units split /p/a and /p/b, and /p/b/c becomes a group.
	groupOf, groupWeights := getDirectoryGroups(paths, weights, order, 10)
	if want := []int{0, 1, 2, 3, -1, 4}; !slices.Equal(groupOf, want) {
		t.Fatalf("groupOf = %v, want %v", groupOf, want)
	}
	if want := []int{10, 10, 10, 10, 280}; !slices.Equal(groupWeights, want) {
		t.Fatalf("groupWeights = %v, want %v", groupWeights, want)
	}
	// /p/a and /p/b fit in groups of 20.
	groupOf, groupWeights = getDirectoryGroups(paths, weights, order, 20)
	if want := []int{0, 0, 1, 1, -1, 2}; !slices.Equal(groupOf, want) {
		t.Fatalf("groupOf = %v, want %v", groupOf, want)
	}
	if want := []int{20, 20, 280}; !slices.Equal(groupWeights, want) {
		t.Fatalf("groupWeights = %v, want %v", groupWeights, want)
	}
}

func TestGetCheckerAssociationWeights(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name         string
		baseWeights  []int
		importCounts []int
		want         []int
	}{
		{
			name:         "normalizes import work to syntax work",
			baseWeights:  []int{100, 50, 25},
			importCounts: []int{0, 1, 3},
			want:         []int{100, 93, 154},
		},
		{
			name:         "caps import work at twice the average file",
			baseWeights:  []int{100, 100, 0, 100, 100},
			importCounts: []int{1, 0, 0, 0, 0},
			want:         []int{300, 100, 0, 100, 100},
		},
		{
			name:         "no imports preserves base weights",
			baseWeights:  []int{100, 50, 25},
			importCounts: []int{0, 0, 0},
			want:         []int{100, 50, 25},
		},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()
			got := getCheckerAssociationWeights(test.baseWeights, test.importCounts)
			if !slices.Equal(got, test.want) {
				t.Fatalf("getCheckerAssociationWeights(%v, %v) = %v, want %v", test.baseWeights, test.importCounts, got, test.want)
			}
		})
	}
}

func TestGetCheckerAssociations(t *testing.T) {
	t.Parallel()

	t.Run("empty", func(t *testing.T) {
		t.Parallel()
		if got := getCheckerAssociationsInOrder(&checkerAssociationGraph{}, nil, 4, nil); got != nil {
			t.Fatalf("getCheckerAssociationsInOrder() = %v, want nil", got)
		}
	})

	t.Run("balances disconnected files", func(t *testing.T) {
		t.Parallel()
		got := getCheckerAssociationsInOrder(
			&checkerAssociationGraph{weights: []int{1, 1, 1, 1, 1, 1}, adjacency: make([][]int, 6)},
			nil,
			3,
			nil,
		)
		want := []int{0, 1, 2, 0, 1, 2}
		if !slices.Equal(got, want) {
			t.Fatalf("getCheckerAssociationsInOrder() = %v, want %v", got, want)
		}
	})

	t.Run("uses program order", func(t *testing.T) {
		t.Parallel()
		got := getCheckerAssociationsInOrder(
			&checkerAssociationGraph{weights: []int{1, 3, 2}, adjacency: make([][]int, 3)},
			nil,
			2,
			nil,
		)
		want := []int{0, 1, 0}
		if !slices.Equal(got, want) {
			t.Fatalf("getCheckerAssociationsInOrder() = %v, want %v", got, want)
		}
	})

	t.Run("keeps dense components together", func(t *testing.T) {
		t.Parallel()
		got := getCheckerAssociationsInOrder(
			&checkerAssociationGraph{weights: []int{1, 1, 1, 1, 1, 1}, adjacency: [][]int{
				{1, 2},
				{0, 2},
				{0, 1},
				{4, 5},
				{3, 5},
				{3, 4},
			}},
			nil,
			2,
			nil,
		)
		want := []int{0, 0, 0, 1, 1, 1}
		if !slices.Equal(got, want) {
			t.Fatalf("getCheckerAssociationsInOrder() = %v, want %v", got, want)
		}
	})

	t.Run("respects weighted balance cap", func(t *testing.T) {
		t.Parallel()
		weights := []int{8, 7, 6, 5, 4, 3, 2, 1}
		got := getCheckerAssociationsInOrder(&checkerAssociationGraph{weights: weights, adjacency: make([][]int, len(weights))}, nil, 3, nil)
		loads := make([]int, 3)
		for i, checkerIndex := range got {
			loads[checkerIndex] += weights[i]
		}
		for checkerIndex, load := range loads {
			if load > 13 {
				t.Fatalf("checker %d load = %d, want at most 13; associations = %v", checkerIndex, load, got)
			}
		}
	})
	t.Run("spreads concentrated areas", func(t *testing.T) {
		t.Parallel()
		graph := &checkerAssociationGraph{
			weights:   []int{100, 100, 100, 100},
			adjacency: [][]int{{1}, {0}, {3}, {2}},
		}
		if got, want := getCheckerAssociationsInOrder(graph, nil, 2, nil), []int{0, 0, 1, 1}; !slices.Equal(got, want) {
			t.Fatalf("without areas, getCheckerAssociationsInOrder() = %v, want %v", got, want)
		}
		graph.areas = [][]checkerAssociationAreaWeight{{{0, 100}}, {{0, 100}}, {{1, 100}}, {{1, 100}}}
		graph.areaTotals = []int{200, 200}
		if got, want := getCheckerAssociationsInOrder(graph, nil, 2, nil), []int{0, 1, 0, 1}; !slices.Equal(got, want) {
			t.Fatalf("with areas, getCheckerAssociationsInOrder() = %v, want %v", got, want)
		}
	})
}

func TestMergeCheckerAssociationGroups(t *testing.T) {
	t.Parallel()
	// 0 joins 1; 4 is also adjacent to 0 but would exceed the maximum weight.
	got := mergeCheckerAssociationGroups(
		[]int{1, 1, 1, 1, 1},
		[][]int{{1, 4}, {0}, {3}, {2}, {0}},
		2,
	)
	if want := []int{1, 1, 3, 3, 4}; !slices.Equal(got, want) {
		t.Fatalf("mergeCheckerAssociationGroups() = %v, want %v", got, want)
	}
}
