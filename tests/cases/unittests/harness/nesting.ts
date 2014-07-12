///<reference path='..\..\..\..\src\harness\harness.ts'/>

describe('nesting.ts', function ()
{
    describe('It has sub-scenarios', function ()
    {
        describe('This is a sub-scenario #1', function ()
        {
            it('Has a child testcase #1', function () { assert.equal(0, 0); });
            it('Has a child testcase #2', function () { assert.equal(0, 0); });

            describe('This is a sub-sub-scenario #1', function ()
            {
                it('Has a grandchild testcase #1', function () { assert.equal(0, 0); });
                it('Has a grandchild testcase #2', function () { assert.equal(1, 0); });
            });
        });

        describe('This is a sub-scenario #2', function ()
        {
            it('Has a child testcase #1', function () { assert.equal(0, 0); });
            it('Has a child testcase #2', function () { assert.equal(0, 0); });
        });
    });
});