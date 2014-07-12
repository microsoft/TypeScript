///<reference path='..\..\..\..\src\harness\harness.ts'/>
///<reference path='..\..\..\..\src\compiler\io.ts'/>

describe('synchronous.ts', function ()
{
    describe('Synchronous test #1', function ()
    {
        it('(PASS) adds one plus one to make two', function ()
        {
            assert.equal(2, 1 + 1);
        });

        it('(FAIL) adds two plus two to make four', function ()
        {
            assert.equal(5, 2 + 2);
        });
    });

    describe('Synchronous test #2', function ()
    {
        describe('A sub-scenario for you', function ()
        {
            it('(PASS) True is true', function ()
            {
                assert.equal(true, true);
            });

            it('(FAIL) False is true', function ()
            {
                assert.equal(false, true);
            });
        });
    });
});