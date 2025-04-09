package sourcemap

import (
	"errors"
	"iter"

	"github.com/microsoft/typescript-go/internal/core"
)

type Mapping struct {
	GeneratedLine      int
	GeneratedCharacter int
	SourceIndex        SourceIndex
	SourceLine         int
	SourceCharacter    int
	NameIndex          NameIndex
}

func (m *Mapping) Equals(other *Mapping) bool {
	return m == other || m.GeneratedLine == other.GeneratedLine &&
		m.GeneratedCharacter == other.GeneratedCharacter &&
		m.SourceIndex == other.SourceIndex &&
		m.SourceLine == other.SourceLine &&
		m.SourceCharacter == other.SourceCharacter &&
		m.NameIndex == other.NameIndex
}

func (m *Mapping) IsSourceMapping() bool {
	return m.SourceIndex != MissingSource &&
		m.SourceLine != MissingLineOrColumn &&
		m.SourceCharacter != MissingLineOrColumn
}

const (
	MissingSource       SourceIndex = -1
	MissingName         NameIndex   = -1
	MissingLineOrColumn int         = -1
)

type MappingsDecoder struct {
	mappings           string
	done               bool
	pos                int
	generatedLine      int
	generatedCharacter int
	sourceIndex        SourceIndex
	sourceLine         int
	sourceCharacter    int
	nameIndex          NameIndex
	error              error
	mappingPool        core.Pool[Mapping]
}

func DecodeMappings(mappings string) *MappingsDecoder {
	return &MappingsDecoder{mappings: mappings}
}

func (d *MappingsDecoder) MappingsString() string {
	return d.mappings
}

func (d *MappingsDecoder) Pos() int {
	return d.pos
}

func (d *MappingsDecoder) Error() error {
	return d.error
}

func (d *MappingsDecoder) State() *Mapping {
	return d.captureMapping(true /*hasSource*/, true /*hasName*/)
}

func (d *MappingsDecoder) Values() iter.Seq[*Mapping] {
	return func(yield func(*Mapping) bool) {
		for value, done := d.Next(); !done; value, done = d.Next() {
			if !yield(value) {
				break
			}
		}
	}
}

func (d *MappingsDecoder) Next() (value *Mapping, done bool) {
	for !d.done && d.pos < len(d.mappings) {
		ch := d.mappings[d.pos]
		if ch == ';' {
			// new line
			d.generatedLine++
			d.generatedCharacter = 0
			d.pos++
			continue
		}

		if ch == ',' {
			// Next entry is on same line - no action needed
			d.pos++
			continue
		}

		hasSource := false
		hasName := false
		d.generatedCharacter += d.base64VLQFormatDecode()
		if d.hasReportedError() {
			return d.stopIterating()
		}
		if d.generatedCharacter < 0 {
			return d.setErrorAndStopIterating("Invalid generatedCharacter found")
		}

		if !d.isSourceMappingSegmentEnd() {
			hasSource = true

			d.sourceIndex += SourceIndex(d.base64VLQFormatDecode())
			if d.hasReportedError() {
				return d.stopIterating()
			}
			if d.sourceIndex < 0 {
				return d.setErrorAndStopIterating("Invalid sourceIndex found")
			}
			if d.isSourceMappingSegmentEnd() {
				return d.setErrorAndStopIterating("Unsupported Format: No entries after sourceIndex")
			}

			d.sourceLine += d.base64VLQFormatDecode()
			if d.hasReportedError() {
				return d.stopIterating()
			}
			if d.sourceLine < 0 {
				return d.setErrorAndStopIterating("Invalid sourceLine found")
			}
			if d.isSourceMappingSegmentEnd() {
				return d.setErrorAndStopIterating("Unsupported Format: No entries after sourceLine")
			}

			d.sourceCharacter += d.base64VLQFormatDecode()
			if d.hasReportedError() {
				return d.stopIterating()
			}
			if d.sourceCharacter < 0 {
				return d.setErrorAndStopIterating("Invalid sourceCharacter found")
			}

			if !d.isSourceMappingSegmentEnd() {
				hasName = true
				d.nameIndex += NameIndex(d.base64VLQFormatDecode())
				if d.hasReportedError() {
					return d.stopIterating()
				}
				if d.nameIndex < 0 {
					return d.setErrorAndStopIterating("Invalid nameIndex found")
				}

				if !d.isSourceMappingSegmentEnd() {
					return d.setErrorAndStopIterating("Unsupported Error Format: Entries after nameIndex")
				}
			}
		}

		return d.captureMapping(hasSource, hasName), false
	}

	return d.stopIterating()
}

func (d *MappingsDecoder) captureMapping(hasSource bool, hasName bool) *Mapping {
	mapping := d.mappingPool.New()
	mapping.GeneratedLine = d.generatedLine
	mapping.GeneratedCharacter = d.generatedCharacter
	mapping.SourceIndex = core.IfElse(hasSource, d.sourceIndex, MissingSource)
	mapping.SourceLine = core.IfElse(hasSource, d.sourceLine, MissingLineOrColumn)
	mapping.SourceCharacter = core.IfElse(hasSource, d.sourceCharacter, MissingLineOrColumn)
	mapping.NameIndex = core.IfElse(hasName, d.nameIndex, MissingName)
	return mapping
}

func (d *MappingsDecoder) stopIterating() (*Mapping, bool) {
	d.done = true
	return nil, true
}

func (d *MappingsDecoder) setError(err string) {
	d.error = errors.New(err)
}

func (d *MappingsDecoder) setErrorAndStopIterating(err string) (*Mapping, bool) {
	d.setError(err)
	return d.stopIterating()
}

func (d *MappingsDecoder) hasReportedError() bool {
	return d.error != nil
}

func (d *MappingsDecoder) isSourceMappingSegmentEnd() bool {
	return d.pos == len(d.mappings) || d.mappings[d.pos] == ',' || d.mappings[d.pos] == ';'
}

func (d *MappingsDecoder) base64VLQFormatDecode() int {
	moreDigits := true
	shiftCount := 0
	value := 0
	for ; moreDigits; d.pos++ {
		if d.pos >= len(d.mappings) {
			d.setError("Error in decoding base64VLQFormatDecode, past the mapping string")
			return -1
		}

		// 6 digit number
		currentByte := base64FormatDecode(d.mappings[d.pos])
		if currentByte == -1 {
			d.setError("Invalid character in VLQ")
			return -1
		}

		// If msb is set, we still have more bits to continue
		moreDigits = (currentByte & 32) != 0

		// least significant 5 bits are the next msbs in the final value.
		value = value | ((currentByte & 31) << shiftCount)
		shiftCount += 5
	}

	// Least significant bit if 1 represents negative and rest of the msb is actual absolute value
	if (value & 1) == 0 {
		// + number
		value = value >> 1
	} else {
		// - number
		value = value >> 1
		value = -value
	}

	return value
}

func base64FormatDecode(ch byte) int {
	switch {
	case ch >= 'A' && ch <= 'Z':
		return int(ch - 'A')
	case ch >= 'a' && ch <= 'z':
		return int(ch - 'a' + 26)
	case ch >= '0' && ch <= '9':
		return int(ch - '0' + 52)
	case ch == '+':
		return 62
	case ch == '/':
		return 63
	default:
		return -1
	}
}
