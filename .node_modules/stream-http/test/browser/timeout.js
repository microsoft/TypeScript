var Buffer = require('buffer').Buffer
var fs = require('fs')
var test = require('tape')

var http = require('../..')

test('timeout', function (t) {
	var req = http.get({
		path: '/browserify.png?copies=5',
		requestTimeout: 10 // ms
	}, function (res) {
		res.on('data', function (data) {
		})
		res.on('end', function () {
			t.fail('request completed (should have timed out)')
		})
	})
	req.on('requestTimeout', function () {
		t.pass('got timeout')
		t.end()
	})
})
