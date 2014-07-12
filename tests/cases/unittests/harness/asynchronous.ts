///<reference path='..\..\..\..\src\harness\harness.ts'/>
///<reference path='..\..\..\..\src\compiler\io.ts'/>

describe('asynchronous.ts', function ()
{
    describe('(PASS) Asynchronous test #1 (callback with verification)', function ()
    {
        it('Does a callback to verification', function (done)
        {
            if (typeof process !== 'undefined')
            {
                process.nextTick(function ()
                {
                    assert.equal('async', 'async');
                    done();
                });
            } else
            {
                // WScript don't really have async; nothing happens. Call done directly
                done();
            }
        });
    });

    describe('(PASS) Asynchronous test #2 (callback with no verification)', function ()
    {
        it('Does a callback to no verification', function (done)
        {
            if (typeof process !== 'undefined')
            {
                process.nextTick(function () { done(); });
            } else
            {
                // WScript don't really have async; nothing happens.
                done();
            }
        });
    });


    describe('(FAIL) Asynchronous test #3 (callback with error object)', function ()
    {
        it('(FAIL) Handles a failure during the async callback', function (done)
        {
            if (typeof process !== 'undefined')
            {
                process.nextTick(function ()
                {
                    assert.equal('2+2', '5');
                    done();
                });
            } else
            {
                // WScript don't really have async; nothing happens.
                done();
            }
        });
    });

    describe('(FAIL) Asynchronous test #4 (failure during async setup)', function ()
    {
        it('(FAIL) Handles a failure during the async setup', function (done)
        {
            if (typeof process !== 'undefined')
            {
                assert.equal('2+2', '5');
                process.nextTick(function ()
                {
                    done();
                });
            } else
            {
                // WScript don't really have async; nothing happens.
                assert.equal('2+2', '5');
                done();
            }
        });
    });
});

