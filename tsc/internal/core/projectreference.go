package core

type ProjectReference struct {
	Path         string
	OriginalPath string
	Circular     bool
}
