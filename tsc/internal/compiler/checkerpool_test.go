package compiler

import (
	"slices"
	"testing"
)

func TestGetCheckerAssociationBaseWeight(t *testing.T) {
	t.Parallel()
	if got := getCheckerAssociationBaseWeight(100, 2500); got != 125 {
		t.Fatalf("getCheckerAssociationBaseWeight() = %d, want 125", got)
	}
}

func TestShouldPrioritizeSourceFiles(t *testing.T) {
	t.Parallel()
	if !shouldPrioritizeSourceFiles(1000, 100, 4) {
		t.Fatal("shouldPrioritizeSourceFiles() = false, want true")
	}
	if !shouldPrioritizeSourceFiles(1000, 125, 4) {
		t.Fatal("shouldPrioritizeSourceFiles() = false at boundary, want true")
	}
	if shouldPrioritizeSourceFiles(1000, 126, 4) {
		t.Fatal("shouldPrioritizeSourceFiles() = true, want false")
	}
}

func TestGetCheckerAssociationPolicy(t *testing.T) {
	t.Parallel()
	tests := []struct {
		name              string
		totalWeight       int
		declarationWeight int
		checkerCount      int
		want              checkerAssociationPolicy
	}{
		{
			name:              "source dominated at any checker count",
			totalWeight:       1000,
			declarationWeight: 100,
			checkerCount:      2,
			want: checkerAssociationPolicy{
				prioritizeSourceFiles:      true,
				sourceFileWeightMultiplier: 1,
				balancePenaltyMultiplier:   checkerAssociationPrioritizedSourcePenalty,
			},
		},
		{
			name:              "declaration heavy with few checkers",
			totalWeight:       1000,
			declarationWeight: 400,
			checkerCount:      2,
			want: checkerAssociationPolicy{
				sourceFileWeightMultiplier: 1,
				balancePenaltyMultiplier:   1,
			},
		},
		{
			name:              "source dominated with many checkers",
			totalWeight:       1000,
			declarationWeight: 50,
			checkerCount:      8,
			want: checkerAssociationPolicy{
				prioritizeSourceFiles:      true,
				sourceFileWeightMultiplier: 1,
				balancePenaltyMultiplier:   checkerAssociationPrioritizedSourcePenalty,
			},
		},
		{
			name:              "declaration heavy with many checkers",
			totalWeight:       1000,
			declarationWeight: 400,
			checkerCount:      4,
			want: checkerAssociationPolicy{
				sourceFileWeightMultiplier: checkerAssociationSourceFileWeightMultiplier,
				balancePenaltyMultiplier:   checkerAssociationBalancePenaltyMultiplier,
			},
		},
	}
	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()
			if got := getCheckerAssociationPolicy(test.totalWeight, test.declarationWeight, test.checkerCount); got != test.want {
				t.Fatalf("getCheckerAssociationPolicy() = %+v, want %+v", got, test.want)
			}
		})
	}
}

func TestGetCheckerAssociationOrder(t *testing.T) {
	t.Parallel()
	if got := getCheckerAssociationOrder([]int{5, 10, 7, 2}, []bool{true, false, false, true}, true); !slices.Equal(got, []int{1, 2, 0, 3}) {
		t.Fatalf("getCheckerAssociationOrder() = %v, want [1 2 0 3]", got)
	}
	if got := getCheckerAssociationOrder([]int{5}, []bool{false}, false); got != nil {
		t.Fatalf("getCheckerAssociationOrder() = %v, want nil", got)
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
		if got := getCheckerAssociationsInOrder(nil, nil, nil, 4, checkerAssociationBalancePenaltyMultiplier); got != nil {
			t.Fatalf("getCheckerAssociationsInOrder() = %v, want nil", got)
		}
	})

	t.Run("balances disconnected files", func(t *testing.T) {
		t.Parallel()
		got := getCheckerAssociationsInOrder(
			[]int{1, 1, 1, 1, 1, 1},
			make([][]int, 6),
			nil,
			3,
			1,
		)
		want := []int{0, 1, 2, 0, 1, 2}
		if !slices.Equal(got, want) {
			t.Fatalf("getCheckerAssociationsInOrder() = %v, want %v", got, want)
		}
	})

	t.Run("uses program order", func(t *testing.T) {
		t.Parallel()
		got := getCheckerAssociationsInOrder(
			[]int{1, 3, 2},
			make([][]int, 3),
			nil,
			2,
			1,
		)
		want := []int{0, 1, 0}
		if !slices.Equal(got, want) {
			t.Fatalf("getCheckerAssociationsInOrder() = %v, want %v", got, want)
		}
	})

	t.Run("keeps dense components together", func(t *testing.T) {
		t.Parallel()
		got := getCheckerAssociationsInOrder(
			[]int{1, 1, 1, 1, 1, 1},
			[][]int{
				{1, 2},
				{0, 2},
				{0, 1},
				{4, 5},
				{3, 5},
				{3, 4},
			},
			nil,
			2,
			1,
		)
		want := []int{0, 0, 0, 1, 1, 1}
		if !slices.Equal(got, want) {
			t.Fatalf("getCheckerAssociationsInOrder() = %v, want %v", got, want)
		}
	})

	t.Run("respects weighted balance cap", func(t *testing.T) {
		t.Parallel()
		weights := []int{8, 7, 6, 5, 4, 3, 2, 1}
		got := getCheckerAssociationsInOrder(weights, make([][]int, len(weights)), nil, 3, 1)
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
}
