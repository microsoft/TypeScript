package api

import (
	"bufio"
	"encoding/binary"
	"fmt"
	"io"

	"github.com/microsoft/typescript-go/internal/json"
	"github.com/microsoft/typescript-go/internal/jsonrpc"
)

// MessageType represents the type of message in the msgpack protocol.
type MessageType uint8

const (
	MessageTypeUnknown MessageType = iota
	MessageTypeRequest
	MessageTypeCallResponse
	MessageTypeCallError
	MessageTypeResponse
	MessageTypeError
	MessageTypeCall
)

func (m MessageType) IsValid() bool {
	return m >= MessageTypeRequest && m <= MessageTypeCall
}

// MessagePack format constants
const (
	msgpackFixedArray3 byte = 0x93
	msgpackBin8        byte = 0xC4
	msgpackBin16       byte = 0xC5
	msgpackBin32       byte = 0xC6
	msgpackU8          byte = 0xCC
)

// MessagePackProtocol implements the Protocol interface using a custom
// msgpack-based tuple format: [MessageType, method, payload].
type MessagePackProtocol struct {
	r *bufio.Reader
	w *bufio.Writer
}

var _ Protocol = (*MessagePackProtocol)(nil)

// NewMessagePackProtocol creates a new msgpack protocol handler.
func NewMessagePackProtocol(rw io.ReadWriter) *MessagePackProtocol {
	return &MessagePackProtocol{
		r: bufio.NewReader(rw),
		w: bufio.NewWriter(rw),
	}
}

// ReadMessage implements Protocol.
func (p *MessagePackProtocol) ReadMessage() (*Message, error) {
	msgType, method, payload, err := p.readTuple()
	if err != nil {
		return nil, err
	}

	// Convert msgpack message type to JSON-RPC message
	msg := &Message{}

	switch msgType {
	case MessageTypeRequest:
		// Client request - needs an ID for response
		// We use the method as a pseudo-ID since this protocol doesn't have explicit IDs
		id := jsonrpc.NewIDString(method)
		msg.ID = id
		msg.Method = method
		msg.Params = payload
	case MessageTypeCallResponse:
		// Response to our Call - use method as ID
		// Note: Method must be empty for IsResponse() to return true
		id := jsonrpc.NewIDString(method)
		msg.ID = id
		msg.Result = payload
	case MessageTypeCallError:
		// Error response to our Call
		// Note: Method must be empty for IsResponse() to return true
		id := jsonrpc.NewIDString(method)
		msg.ID = id
		msg.Error = &jsonrpc.ResponseError{
			Code:    jsonrpc.CodeInternalError,
			Message: string(payload),
		}
	default:
		return nil, fmt.Errorf("unexpected message type: %d", msgType)
	}

	return msg, nil
}

func (p *MessagePackProtocol) readTuple() (MessageType, string, []byte, error) {
	// Read fixed array marker (0x93 = 3-element array)
	t, err := p.r.ReadByte()
	if err != nil {
		return 0, "", nil, err
	}
	if t != msgpackFixedArray3 {
		return 0, "", nil, fmt.Errorf("%w: expected fixed 3-element array (0x93), received: 0x%02x", ErrInvalidRequest, t)
	}

	// Read message type - can be positive fixint (0x00-0x7F) or uint8 (0xCC + value)
	t, err = p.r.ReadByte()
	if err != nil {
		return 0, "", nil, err
	}
	var rawType byte
	if t <= 0x7F {
		// Positive fixint - the byte IS the value
		rawType = t
	} else if t == msgpackU8 {
		// uint8 marker - next byte is the value
		rawType, err = p.r.ReadByte()
		if err != nil {
			return 0, "", nil, err
		}
	} else {
		return 0, "", nil, fmt.Errorf("%w: expected positive fixint or uint8 marker, received: 0x%02x", ErrInvalidRequest, t)
	}
	msgType := MessageType(rawType)
	if !msgType.IsValid() {
		return 0, "", nil, fmt.Errorf("%w: unknown message type: %d", ErrInvalidRequest, msgType)
	}

	// Read method (binary)
	methodBytes, err := p.readBin()
	if err != nil {
		return 0, "", nil, err
	}
	method := string(methodBytes)

	// Read payload (binary)
	payload, err := p.readBin()
	if err != nil {
		return 0, "", nil, err
	}

	return msgType, method, payload, nil
}

func (p *MessagePackProtocol) readBin() ([]byte, error) {
	t, err := p.r.ReadByte()
	if err != nil {
		return nil, err
	}

	var size uint
	switch t {
	case msgpackBin8:
		var size8 uint8
		if err = binary.Read(p.r, binary.BigEndian, &size8); err != nil {
			return nil, err
		}
		size = uint(size8)
	case msgpackBin16:
		var size16 uint16
		if err = binary.Read(p.r, binary.BigEndian, &size16); err != nil {
			return nil, err
		}
		size = uint(size16)
	case msgpackBin32:
		var size32 uint32
		if err = binary.Read(p.r, binary.BigEndian, &size32); err != nil {
			return nil, err
		}
		size = uint(size32)
	default:
		return nil, fmt.Errorf("%w: expected binary data (0xc4-0xc6), received: 0x%02x", ErrInvalidRequest, t)
	}

	payload := make([]byte, size)
	if _, err := io.ReadFull(p.r, payload); err != nil {
		return nil, err
	}
	return payload, nil
}

// WriteRequest implements Protocol.
func (p *MessagePackProtocol) WriteRequest(id *jsonrpc.ID, method string, params any) error {
	// For msgpack protocol, requests from server are "Call" type
	payload, err := json.Marshal(params)
	if err != nil {
		return err
	}
	return p.writeTuple(MessageTypeCall, method, payload)
}

// WriteNotification implements Protocol.
func (p *MessagePackProtocol) WriteNotification(method string, params any) error {
	// Msgpack protocol doesn't distinguish notifications from calls
	return p.WriteRequest(nil, method, params)
}

// WriteResponse implements Protocol.
func (p *MessagePackProtocol) WriteResponse(id *jsonrpc.ID, result any) error {
	method := ""
	if id != nil {
		method = id.String()
	}

	var payload []byte
	var err error

	// Check if result is raw binary (for efficient binary transport)
	if raw, ok := result.(RawBinary); ok {
		payload = []byte(raw)
	} else {
		payload, err = json.Marshal(result)
		if err != nil {
			return err
		}
	}

	return p.writeTuple(MessageTypeResponse, method, payload)
}

// WriteError implements Protocol.
func (p *MessagePackProtocol) WriteError(id *jsonrpc.ID, respErr *jsonrpc.ResponseError) error {
	method := ""
	if id != nil {
		method = id.String()
	}
	return p.writeTuple(MessageTypeError, method, []byte(respErr.Message))
}

func (p *MessagePackProtocol) writeTuple(msgType MessageType, method string, payload []byte) error {
	// Write fixed array marker
	if err := p.w.WriteByte(msgpackFixedArray3); err != nil {
		return err
	}
	// Write message type as positive fixint (values 0-127 are written directly)
	if err := p.w.WriteByte(byte(msgType)); err != nil {
		return err
	}
	// Write method
	if err := p.writeBin([]byte(method)); err != nil {
		return err
	}
	// Write payload
	if err := p.writeBin(payload); err != nil {
		return err
	}
	return p.w.Flush()
}

func (p *MessagePackProtocol) writeBin(data []byte) error {
	length := len(data)
	if length < 256 {
		if err := p.w.WriteByte(msgpackBin8); err != nil {
			return err
		}
		if err := p.w.WriteByte(byte(length)); err != nil {
			return err
		}
	} else if length < 1<<16 {
		if err := p.w.WriteByte(msgpackBin16); err != nil {
			return err
		}
		if err := binary.Write(p.w, binary.BigEndian, uint16(length)); err != nil {
			return err
		}
	} else {
		if err := p.w.WriteByte(msgpackBin32); err != nil {
			return err
		}
		if err := binary.Write(p.w, binary.BigEndian, uint32(length)); err != nil {
			return err
		}
	}
	_, err := p.w.Write(data)
	return err
}

// RawBinary is a marker type for binary data that should be written
// directly by MessagePackProtocol instead of being JSON-encoded.
type RawBinary []byte
