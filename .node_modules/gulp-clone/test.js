var expect  = require('chai').expect
var through = require('through2')
var Vinyl = require('vinyl')
clone = require('./')

describe('gulp-clone', function() {
    it('should clone files in the stream', function(done) {
        var sourceStream = clone(),
            cloneStream  = clone(),
            count        = 0;

        sourceStream.pipe(cloneStream);

        sourceStream.on('data', function(data) {
            expect(String(data.contents)).to.be.equal('source stream');
            expect(data.path).to.be.equal('file.js');
            count++;
        });

        cloneStream.pipe(through.obj(function(file, enc, cb) {
            file.contents = new Buffer('cloned stream');
            cb(null, file);
        }))

        cloneStream.on('data', function(data) {
            expect(String(data.contents)).to.be.equal('cloned stream');
            expect(data.path).to.be.equal('file.js');
            count++;
        });

        sourceStream.write(new Vinyl({
            path: 'file.js',
            contents: new Buffer('source stream')
        }));

        sourceStream.on('end', function(data) {
            expect(count).to.be.equal(2);
            done();
        });

        sourceStream.end();
    });
    it('should clone files in the stream, using the old behaviour', function(done) {
        var sink   = clone.sink(),
            buffer = [];

        sink
            .pipe(sink.tap())
            .pipe(through.obj(function(f,e,cb) {
                buffer.push(f);
                cb(null, f);
            }))
            .on('finish', function() {
                expect(buffer).to.have.length(2);
                expect(buffer).to.have.nested.property('[0].path', 'afile.js');
                expect(buffer).to.have.nested.property('[1].path', 'afile.js');
                done();
            });

        sink.write(new Vinyl({
            path: 'afile.js',
            contents: new Buffer("")
        }));

        sink.end();
    });
});
