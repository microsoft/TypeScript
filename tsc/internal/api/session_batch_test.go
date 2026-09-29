package api

import (
	"context"
	"strings"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/json"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/projecttestutil"
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

func TestHandleBatchRequestsPaginatesResponses(t *testing.T) {
	t.Parallel()
	projectSession, _ := projecttestutil.Setup(map[string]any{})
	defer projectSession.Close()
	session := NewLSPSession(projectSession, nil)
	defer session.Close()

	const maxResponseBytesPerPage = 150
	requests := make([]BatchRequest, 10)
	for i := range requests {
		requests[i] = BatchRequest{Method: "ping", Params: json.Value{}}
	}

	response, err := session.handleBatchRequests(context.Background(), &BatchRequestsParams{
		Requests:                requests,
		MaxResponseBytesPerPage: maxResponseBytesPerPage,
	})
	assert.NilError(t, err)
	var responses []BatchResponse
	for {
		encoded, err := json.Marshal(response)
		assert.NilError(t, err)
		assert.Assert(t, len(encoded) <= maxResponseBytesPerPage)
		var wireResponse BatchRequestsResponse
		assert.NilError(t, json.Unmarshal(encoded, &wireResponse))
		responses = append(responses, wireResponse.Responses...)
		if wireResponse.ContinuationToken == "" {
			break
		}
		response, err = session.handleBatchRequests(context.Background(), &BatchRequestsParams{
			ContinuationToken:       wireResponse.ContinuationToken,
			MaxResponseBytesPerPage: maxResponseBytesPerPage,
		})
		assert.NilError(t, err)
	}

	assert.Equal(t, len(responses), len(requests))
	for _, response := range responses {
		assert.Equal(t, response.Method, Method("ping"))
		assert.Equal(t, response.Result, "pong")
	}
}

func TestHandleBatchRequestsAllowsOversizedSingleResponse(t *testing.T) {
	t.Parallel()

	projectSession, _ := projecttestutil.Setup(map[string]any{})
	defer projectSession.Close()
	session := NewLSPSession(projectSession, nil)
	defer session.Close()

	response, err := session.handleBatchRequests(context.Background(), &BatchRequestsParams{
		Requests:                []BatchRequest{{Method: "ping", Params: json.Value{}}},
		MaxResponseBytesPerPage: 1,
	})
	assert.NilError(t, err)
	assert.Equal(t, len(response.Responses), 1)
	assert.Equal(t, response.ContinuationToken, "")
}

func TestHandleBatchRequestsPageLimitIsRequestScoped(t *testing.T) {
	t.Parallel()

	projectSession, _ := projecttestutil.Setup(map[string]any{})
	defer projectSession.Close()
	session := NewLSPSession(projectSession, nil)
	defer session.Close()

	requests := []BatchRequest{
		{Method: "ping", Params: json.Value{}},
		{Method: "ping", Params: json.Value{}},
	}

	limited, err := session.handleBatchRequests(context.Background(), &BatchRequestsParams{
		Requests:                requests,
		MaxResponseBytesPerPage: 1,
	})
	assert.NilError(t, err)
	assert.Equal(t, len(limited.Responses), 1)
	assert.Assert(t, limited.ContinuationToken != "")

	unlimited, err := session.handleBatchRequests(context.Background(), &BatchRequestsParams{Requests: requests})
	assert.NilError(t, err)
	assert.Equal(t, len(unlimited.Responses), len(requests))
	assert.Equal(t, unlimited.ContinuationToken, "")
}

func TestHandleBatchRequestsRejectsInvalidContinuationToken(t *testing.T) {
	t.Parallel()

	projectSession, _ := projecttestutil.Setup(map[string]any{})
	defer projectSession.Close()
	session := NewLSPSession(projectSession, nil)
	defer session.Close()

	_, err := session.handleBatchRequests(context.Background(), &BatchRequestsParams{ContinuationToken: "invalid"})
	assert.ErrorContains(t, err, "invalid batch continuation token")
}

func TestHandleBatchRequestsRejectsNestedBatch(t *testing.T) {
	t.Parallel()

	projectSession, _ := projecttestutil.Setup(map[string]any{})
	defer projectSession.Close()
	session := NewLSPSession(projectSession, nil)
	defer session.Close()

	response, err := session.handleBatchRequests(context.Background(), &BatchRequestsParams{
		Requests: []BatchRequest{{Method: MethodBatchRequests, Params: json.Value(`{"requests":[]}`)}},
	})
	assert.NilError(t, err)
	assert.Equal(t, len(response.Responses), 1)
	assert.Assert(t, strings.Contains(response.Responses[0].Error, "batchRequests cannot be nested"))
}
