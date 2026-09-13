package lsproto

import (
	"bytes"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/json"
)

type bufferedWorkDoneProgressUnion struct {
	begin  *WorkDoneProgressBegin
	report *WorkDoneProgressReport
	end    *WorkDoneProgressEnd
}

func (o *bufferedWorkDoneProgressUnion) UnmarshalJSONFrom(dec *json.Decoder) error {
	data, err := dec.ReadValue()
	if err != nil {
		return err
	}
	switch string(benchmarkRawField(data, "kind")) {
	case `"begin"`:
		o.begin = new(WorkDoneProgressBegin)
		return json.Unmarshal(data, o.begin)
	case `"report"`:
		o.report = new(WorkDoneProgressReport)
		return json.Unmarshal(data, o.report)
	case `"end"`:
		o.end = new(WorkDoneProgressEnd)
		return json.Unmarshal(data, o.end)
	default:
		return errInvalidValue("bufferedWorkDoneProgressUnion", data)
	}
}

func benchmarkRawField(data []byte, field string) json.Value {
	dec := json.NewDecoder(bytes.NewReader(data))
	if _, err := dec.ReadToken(); err != nil {
		return nil
	}
	for dec.PeekKind() != '}' {
		name, err := dec.ReadValue()
		if err != nil {
			return nil
		}
		if jsonKeyCheck(name, field) {
			value, err := dec.ReadValue()
			if err != nil {
				return nil
			}
			return value
		}
		if err := dec.SkipValue(); err != nil {
			return nil
		}
	}
	return nil
}

func BenchmarkUnmarshalDiscriminatedUnion(b *testing.B) {
	inputs := map[string][]byte{
		"discriminator-first": []byte(`{"kind":"begin","title":"Indexing","cancellable":true,"message":"Scanning files","percentage":25}`),
		"discriminator-last":  []byte(`{"title":"Indexing","cancellable":true,"message":"Scanning files","percentage":25,"kind":"begin"}`),
	}
	for order, input := range inputs {
		b.Run(order, func(b *testing.B) {
			b.Run("buffered", func(b *testing.B) {
				b.ReportAllocs()
				for b.Loop() {
					var value bufferedWorkDoneProgressUnion
					if err := json.Unmarshal(input, &value); err != nil {
						b.Fatal(err)
					}
				}
			})
			b.Run("streaming", func(b *testing.B) {
				b.ReportAllocs()
				for b.Loop() {
					var value WorkDoneProgressBeginOrReportOrEnd
					if err := json.Unmarshal(input, &value); err != nil {
						b.Fatal(err)
					}
				}
			})
		})
	}
}
