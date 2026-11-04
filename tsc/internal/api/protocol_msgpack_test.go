package api

import (
	"bytes"
	"io"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/ipc"
	"gotest.tools/v3/assert"
)

// boundaryBuffer is a reader that records how often the protocol announces the
// start of a message it is about to read from it.
type boundaryBuffer struct {
	bytes.Buffer
	messagesBegun int
}

func (b *boundaryBuffer) BeginMessage() { b.messagesBegun++ }

var _ ipc.MessageBoundaryReader = (*boundaryBuffer)(nil)

func writeTestTuple(t *testing.T, w io.Writer, method string, payload []byte) {
	t.Helper()
	out := NewMessagePackProtocol(struct {
		io.Reader
		io.Writer
	}{nil, w}).t.(*messagePackTransport)
	assert.NilError(t, out.WriteTuple(MessageTypeRequest, method, payload))
}

func TestMessagePackProtocolBeginsAMessagePerTupleReadFromTheReader(t *testing.T) {
	t.Parallel()
	rw := &boundaryBuffer{}
	protocol := NewMessagePackProtocol(rw)

	// Two tuples already waiting: the first read pulls both into the buffer, so
	// only the first is announced; the second is served from buffered bytes.
	writeTestTuple(t, rw, "a", []byte("1"))
	writeTestTuple(t, rw, "b", []byte("2"))
	_, method, _, err := protocol.t.ReadTuple()
	assert.NilError(t, err)
	assert.Equal(t, method, "a")
	assert.Equal(t, rw.messagesBegun, 1)
	_, method, _, err = protocol.t.ReadTuple()
	assert.NilError(t, err)
	assert.Equal(t, method, "b")
	assert.Equal(t, rw.messagesBegun, 1)

	// A tuple larger than the buffer is read in several pieces but announced once.
	writeTestTuple(t, rw, "c", bytes.Repeat([]byte("x"), 3*4096))
	_, method, payload, err := protocol.t.ReadTuple()
	assert.NilError(t, err)
	assert.Equal(t, method, "c")
	assert.Equal(t, len(payload), 3*4096)
	assert.Equal(t, rw.messagesBegun, 2)

	// A reader without the hook is left alone.
	plain := NewMessagePackProtocol(&bytes.Buffer{})
	assert.Assert(t, plain.t.(*messagePackTransport).boundary == nil)
}
