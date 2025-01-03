package core

type ProjectReference struct {
	path         string
	originalPath string
	circular     bool
}
