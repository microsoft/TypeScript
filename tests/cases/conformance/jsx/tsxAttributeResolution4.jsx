// OK
<test1 {...{ x: function (n) { return 0; } }}/>;
// Error, no member 'len' on 'string'
<test1 {...{ x: function (n) { return n.len; } }}/>;
