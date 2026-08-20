package packagejson

type TypeValidatedField interface {
	IsPresent() bool
	IsValid() bool
	ExpectedJSONType() string
	ActualJSONType() string
}
