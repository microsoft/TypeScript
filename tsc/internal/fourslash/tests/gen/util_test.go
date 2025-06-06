package fourslash_test

func ptrTo[T any](v T) *T {
	return &v
}

var defaultCommitCharacters = []string{".", ",", ";"}
