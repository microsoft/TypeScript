package main

import (
	"errors"
	"strconv"

	"github.com/microsoft/typescript-go/internal/core"
)

var errParse = errors.New("parse error")

type tristateFlag core.Tristate

func (f *tristateFlag) Set(s string) error {
	v, err := strconv.ParseBool(s)
	if err != nil {
		return errParse
	}
	if v {
		*f = (tristateFlag)(core.TSTrue)
	} else {
		*f = (tristateFlag)(core.TSFalse)
	}
	return nil
}

func (f *tristateFlag) String() string {
	switch core.Tristate(*f) {
	case core.TSTrue:
		return "true"
	case core.TSFalse:
		return "false"
	default:
		return "unset"
	}
}

func (f *tristateFlag) Get() any {
	return core.Tristate(*f)
}

func (f *tristateFlag) IsBoolFlag() bool {
	return true
}
