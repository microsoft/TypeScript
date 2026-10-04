package lsproto

import (
	"cmp"
	"fmt"
	"strconv"
)

// Implements a cmp.Compare like function for two Position
// ComparePositions(pos, other) == cmp.Compare(pos, other)
func ComparePositions(pos, other Position) int {
	if lineComp := cmp.Compare(pos.Line, other.Line); lineComp != 0 {
		return lineComp
	}
	return cmp.Compare(pos.Character, other.Character)
}

// Implements a cmp.Compare like function for two Range
// CompareRanges(lsRange, other) == cmp.Compare(lsRange, other)
//
//	Range.Start is compared before Range.End
func CompareRanges(lsRange, other Range) int {
	if startComp := ComparePositions(lsRange.Start, other.Start); startComp != 0 {
		return startComp
	}
	return ComparePositions(lsRange.End, other.End)
}

// AsString returns the plain text of a StringOrMarkupContent, reading the
// MarkupContent value when the message is not a plain string.
func (m StringOrMarkupContent) AsString() string {
	if m.String != nil {
		return *m.String
	}
	if m.MarkupContent != nil {
		return m.MarkupContent.Value
	}
	return ""
}

func (m IntegerOrString) AsString() string {
	codeStr := ""
	if m.String != nil {
		codeStr = *m.String
	} else if m.Integer != nil {
		codeStr = strconv.Itoa(int(*m.Integer))
	} else {
		codeStr = "-1"
	}
	return codeStr
}

func diagnosticExistsInSlice(elem *Diagnostic, diags []*Diagnostic) bool {
	for _, diag := range diags {
		if diagnosticsEqual(elem, diag) {
			return true
		}
	}
	return false
}

func diagnosticsEqual(diag1 *Diagnostic, diag2 *Diagnostic) bool {
	if diagnosticCodesEqual(diag1.Code, diag2.Code) && diagnosticMessagesEqual(diag1.Message, diag2.Message) && CompareRanges(diag1.Range, diag2.Range) == 0 {
		return true
	}
	return false
}

func diagnosticCodesEqual(code1 *IntegerOrString, code2 *IntegerOrString) bool {
	if code1.String != nil && code2.String != nil {
		return *code1.String == *code2.String
	}
	if code1.Integer != nil && code2.Integer != nil {
		return *code1.Integer == *code2.Integer
	}
	return false
}

func diagnosticMessagesEqual(message1 StringOrMarkupContent, message2 StringOrMarkupContent) bool {
	if message1.String != nil && message2.String != nil {
		return *message1.String == *message2.String
	}
	if message1.MarkupContent != nil && message2.MarkupContent != nil {
		return message1.MarkupContent.Kind == message2.MarkupContent.Kind && message1.MarkupContent.Value == message2.MarkupContent.Value
	}
	return false
}

func CompareDiagnostics(list1 []*Diagnostic, list2 []*Diagnostic) ([]*Diagnostic, []*Diagnostic) {
	missingFromList1 := []*Diagnostic{}
	missingFromList2 := []*Diagnostic{}
	for _, elem := range list1 {
		if !diagnosticExistsInSlice(elem, list2) {
			missingFromList2 = append(missingFromList2, elem)
		}
	}
	for _, elem := range list2 {
		if !diagnosticExistsInSlice(elem, list1) {
			missingFromList1 = append(missingFromList1, elem)
		}
	}
	return missingFromList1, missingFromList2
}

func (elem *Diagnostic) AsString() string {
	return fmt.Sprintf("%v (%v:%v-%v:%v): %v", elem.Code.AsString(), elem.Range.Start.Line, elem.Range.Start.Character, elem.Range.End.Line, elem.Range.End.Character, elem.Message.AsString())
}

func (elem *Diagnostic) CodeAsString() string {
	return fmt.Sprintf("Code(%v)", elem.Code.AsString())
}
