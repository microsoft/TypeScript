package core

import "slices"

type TypeAcquisition struct {
	Enable                              Tristate `json:"enable,omitzero"`
	Include                             []string `json:"include,omitzero"`
	Exclude                             []string `json:"exclude,omitzero"`
	DisableFilenameBasedTypeAcquisition Tristate `json:"disableFilenameBasedTypeAcquisition,omitzero"`
}

func (ta *TypeAcquisition) Equals(other *TypeAcquisition) bool {
	if ta == other {
		return true
	}
	if ta == nil || other == nil {
		return false
	}

	return (ta.Enable == other.Enable &&
		slices.Equal(ta.Include, other.Include) &&
		slices.Equal(ta.Exclude, other.Exclude) &&
		ta.DisableFilenameBasedTypeAcquisition == other.DisableFilenameBasedTypeAcquisition)
}
