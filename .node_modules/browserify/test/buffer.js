var browserify = require('../');
var test = require('tap').test;
var vm = require('vm');

if (!ArrayBuffer.isView) ArrayBuffer.isView = function () { return false; };

test('utf8 buffer to base64', function (t) {
    t.plan(1);
    var b = browserify();
    b.require('buffer');
    b.bundle(function (err, src) {
        if (err) return t.fail(err);
        var c = context();
        vm.runInNewContext(src, c);
        t.equal(
            new c.require('buffer').Buffer("Ձאab", "utf8").toString("base64"),
            new Buffer("Ձאab", "utf8").toString("base64")
        );
    });
});

test('utf8 buffer to hex', function (t) {
    t.plan(1);
    var b = browserify();
    b.require('buffer');
    b.bundle(function (err, src) {
        var c = context();
        vm.runInNewContext(src, c);
        t.equal(
            new c.require('buffer').Buffer("Ձאab", "utf8").toString("hex"),
            new Buffer("Ձאab", "utf8").toString("hex")
        );
    });
});

test('ascii buffer to base64', function (t) {
    t.plan(1);
    var b = browserify();
    b.require('buffer');
    
    b.bundle(function (err, src) {
        var c = context();
        vm.runInNewContext(src, c);
        t.equal(
            new c.require('buffer').Buffer("123456!@#$%^", "ascii").toString("base64"),
            new Buffer("123456!@#$%^", "ascii").toString("base64")
        );
    });
});

test('ascii buffer to hex', function (t) {
    t.plan(1);
    var b = browserify();
    b.require('buffer');
    b.bundle(function (err, src) {
        var c = context();
        vm.runInNewContext(src, c);
        t.equal(
            new c.require('buffer').Buffer("123456!@#$%^", "ascii").toString("hex"),
            new Buffer("123456!@#$%^", "ascii").toString("hex")
        );
    });
});

test('base64 buffer to utf8', function (t) {
    t.plan(1);
    var b = browserify();
    b.require('buffer');
    b.bundle(function (err, src) {
        var c = context();
        vm.runInNewContext(src, c);
        t.equal(
            new c.require('buffer').Buffer("1YHXkGFi", "base64").toString("utf8"),
            new Buffer("1YHXkGFi", "base64").toString("utf8")
        );
    });
});

test('hex buffer to utf8', function (t) {
    t.plan(1);
    var b = browserify();
    b.require('buffer');
    b.bundle(function (err, src) {
        var c = context();
        vm.runInNewContext(src, c);
        var B = c.require('buffer');
        t.equal(
            new B.Buffer("d581d7906162", "hex").toString("utf8"),
            new Buffer("d581d7906162", "hex").toString("utf8")
        );
    });
});

test('base64 buffer to ascii', function (t) {
    t.plan(1);
    var b = browserify();
    b.require('buffer');
    b.bundle(function (err, src) {
        var c = context();
        vm.runInNewContext(src, c);
        t.equal(
            new c.require('buffer').Buffer("MTIzNDU2IUAjJCVe", "base64").toString("ascii"),
            new Buffer("MTIzNDU2IUAjJCVe", "base64").toString("ascii")
        );
    });
});

test('hex buffer to ascii', function (t) {
    t.plan(1);
    var b = browserify();
    b.require('buffer');
    b.bundle(function (err, src) {
        var c = context();
        vm.runInNewContext(src, c);
        t.equal(
            new c.require('buffer').Buffer("31323334353621402324255e", "hex").toString("ascii"),
            new Buffer("31323334353621402324255e", "hex").toString("ascii")
        );
    });
});

test('indexing a buffer', function (t) {
    t.plan(5);
    var b = browserify();
    b.require('buffer');
    b.bundle(function (err, src) {
        var c = context();
        vm.runInNewContext(src, c);
        var buf = c.require('buffer').Buffer('abc');
        t.equal(buf[0], 97);
        t.equal(buf[1], 98);
        t.equal(buf[2], 99);
        t.equal(buf[3], undefined);
        t.equal(buf.toString('utf8'), 'abc');
    });
});

function context () {
    return {
        ArrayBuffer: ArrayBuffer,
        Uint8Array: Uint8Array,
        DataView: DataView
    };
}
