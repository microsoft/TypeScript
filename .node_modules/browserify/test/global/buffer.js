t.equal(Buffer('xyz').toString('base64'), 'eHl6');
t.equal(Buffer('eHl6', 'base64').toString(), 'xyz');
