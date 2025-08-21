package core

type BuildOptions struct {
	_ noCopy

	Dry               Tristate `json:"dry,omitzero"`
	Force             Tristate `json:"force,omitzero"`
	Verbose           Tristate `json:"verbose,omitzero"`
	StopBuildOnErrors Tristate `json:"stopBuildOnErrors,omitzero"`

	// CompilerOptions are not parsed here and will be available on ParsedBuildCommandLine

	// Internal fields
	Clean Tristate `json:"clean,omitzero"`
}
