package otherpkg

// ExportedType is an exported type
type ExportedType struct {
	Value int
}

// unexportedType is unexported
type unexportedType struct {
	value int
}

// TypeWithUnexported has an unexported field type
type TypeWithUnexported struct {
	Field *unexportedType
}
