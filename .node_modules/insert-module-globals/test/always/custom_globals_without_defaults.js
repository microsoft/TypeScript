t.equal(eval('process'), 'sandbox process');
t.equal(eval('typeof global'), 'undefined');
t.equal(eval('self.xyz'), 555);
t.equal(eval('Buffer'), 'sandbox Buffer');
t.equal(eval('__filename'), 'sandbox __filename');
t.equal(eval('__dirname'), 'sandbox __dirname');
t.equal(eval('custom'), 'inserted custom');
