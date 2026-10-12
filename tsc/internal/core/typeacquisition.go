package core

import "slices"

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
