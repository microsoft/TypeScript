package core

type TypeAcquisition struct {
	Enable                              Tristate `json:"enable,omitzero"`
	Include                             []string `json:"include,omitzero"`
	Exclude                             []string `json:"exclude,omitzero"`
	DisableFilenameBasedTypeAcquisition Tristate `json:"disableFilenameBasedTypeAcquisition,omitzero"`
}
