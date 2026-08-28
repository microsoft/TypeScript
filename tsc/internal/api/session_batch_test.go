package api

import (
	"context"
	"strings"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/json"
	"gotest.tools/v3/assert"
)

func TestHandleBatchRequests(t *testing.T) {
	t.Parallel()

	session := &Session{}
	response, err := session.handleBatchRequests(context.Background(), &BatchRequestsParams{
		Requests: []BatchRequest{
			{Method: "ping", Params: json.Value{}},
			{Method: "unknown", Params: json.Value{}},
		},
	})

	assert.NilError(t, err)
	assert.Equal(t, len(response.Responses), 2)
	assert.Equal(t, response.Responses[0].Method, Method("ping"))
	assert.Equal(t, response.Responses[0].Result, "pong")
	assert.Equal(t, response.Responses[0].Error, "")
	assert.Equal(t, response.Responses[1].Method, Method("unknown"))
	requestErr := response.Responses[1].Error
	assert.Assert(t, strings.Contains(requestErr, "unknown API method"))

	encoded, err := json.Marshal(response)
	assert.NilError(t, err)
	assert.Assert(t, strings.Contains(string(encoded), `"error":"api: invalid request: unknown API method \"unknown\""`))
}

func TestHandleBatchRequestsRecoversPerRequestPanics(t *testing.T) {
	t.Parallel()

	var session *Session
	response, err := session.handleBatchRequests(context.Background(), &BatchRequestsParams{
		Requests: []BatchRequest{
			{Method: "ping", Params: json.Value{}},
			{Method: MethodGetAnyType, Params: json.Value(`{"snapshot":1,"project":"project"}`)},
			{Method: "ping", Params: json.Value{}},
		},
	})

	assert.NilError(t, err)
	assert.Equal(t, response.Responses[0].Result, "pong")
	assert.Assert(t, strings.Contains(response.Responses[1].Error, "panic:"))
	assert.Equal(t, response.Responses[2].Result, "pong")
}

func TestBatchResponseEncodesEmptyResult(t *testing.T) {
	t.Parallel()

	encoded, err := json.Marshal(BatchResponse{Method: MethodGetSignaturesOfType, Result: []any{}})
	assert.NilError(t, err)
	assert.Equal(t, string(encoded), `{"method":"getSignaturesOfType","result":[]}`)
}
