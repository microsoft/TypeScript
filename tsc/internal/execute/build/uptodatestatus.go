package build

import "time"

type upToDateStatusType uint16

const (
	// Errors:

	// config file was not found
	upToDateStatusTypeConfigFileNotFound upToDateStatusType = iota
	// found errors during build
	upToDateStatusTypeBuildErrors
	// did not build because upstream project has errors - and we have option to stop build on upstream errors
	upToDateStatusTypeUpstreamErrors

	// Its all good, no work to do
	upToDateStatusTypeUpToDate

	// Pseudo-builds - touch timestamps, no actual build:

	// The project appears out of date because its upstream inputs are newer than its outputs,
	// but all of its outputs are actually newer than the previous identical outputs of its (.d.ts) inputs.
	// This means we can Pseudo-build (just touch timestamps), as if we had actually built this project.
	upToDateStatusTypeUpToDateWithUpstreamTypes
	// The project appears up to date and even though input file changed, its text didnt so just need to update timestamps
	upToDateStatusTypeUpToDateWithInputFileText

	// Needs build:

	// input file is missing
	upToDateStatusTypeInputFileMissing
	// output file is missing
	upToDateStatusTypeOutputMissing
	// input file is newer than output file
	upToDateStatusTypeInputFileNewer
	// build info is out of date as we need to emit some files
	upToDateStatusTypeOutOfDateBuildInfoWithPendingEmit
	// build info indicates that project has errors and they need to be reported
	upToDateStatusTypeOutOfDateBuildInfoWithErrors
	// build info options indicate there is work to do based on changes in options
	upToDateStatusTypeOutOfDateOptions
	// file was root when built but not any more
	upToDateStatusTypeOutOfDateRoots
	// buildInfo.version mismatch with current ts version
	upToDateStatusTypeTsVersionOutputOfDate
	// build because --force was specified
	upToDateStatusTypeForceBuild

	// solution file
	upToDateStatusTypeSolution
)

type inputOutputName struct {
	input  string
	output string
}

type fileAndTime struct {
	file string
	time time.Time
}

type inputOutputFileAndTime struct {
	input     fileAndTime
	output    fileAndTime
	buildInfo string
}

type upstreamErrors struct {
	ref                  string
	refHasUpstreamErrors bool
}

type upToDateStatus struct {
	kind upToDateStatusType
	data any
}

func (s *upToDateStatus) isError() bool {
	switch s.kind {
	case upToDateStatusTypeConfigFileNotFound,
		upToDateStatusTypeBuildErrors,
		upToDateStatusTypeUpstreamErrors:
		return true
	default:
		return false
	}
}

func (s *upToDateStatus) isPseudoBuild() bool {
	switch s.kind {
	case upToDateStatusTypeUpToDateWithUpstreamTypes,
		upToDateStatusTypeUpToDateWithInputFileText:
		return true
	default:
		return false
	}
}

func (s *upToDateStatus) inputOutputFileAndTime() *inputOutputFileAndTime {
	data, ok := s.data.(*inputOutputFileAndTime)
	if !ok {
		return nil
	}
	return data
}

func (s *upToDateStatus) inputOutputName() *inputOutputName {
	data, ok := s.data.(*inputOutputName)
	if !ok {
		return nil
	}
	return data
}

func (s *upToDateStatus) oldestOutputFileName() string {
	if !s.isPseudoBuild() && s.kind != upToDateStatusTypeUpToDate {
		panic("only valid for up to date status of pseudo-build or up to date")
	}

	if inputOutputFileAndTime := s.inputOutputFileAndTime(); inputOutputFileAndTime != nil {
		return inputOutputFileAndTime.output.file
	}
	if inputOutputName := s.inputOutputName(); inputOutputName != nil {
		return inputOutputName.output
	}
	return s.data.(string)
}

func (s *upToDateStatus) upstreamErrors() *upstreamErrors {
	return s.data.(*upstreamErrors)
}
