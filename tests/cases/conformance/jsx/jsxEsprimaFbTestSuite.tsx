// @jsx: preserve
declare var React: any;
declare var 日本語;
declare var AbC_def;
declare var LeftRight;
declare var x;
declare var a;
declare var props;
declare var value;

<a />;

<n:a n:v />;

<a n:foo="bar"> {value} <b><c /></b></a>;

<a b={" "} c=" " d="&amp;" e="id=1&group=2" f="&#123456789" g="&#123*;" h="&#x;" />;

<a b="&notanentity;" />;
<a
/>;

<日本語></日本語>;

<AbC_def
  test="&#x0026;&#38;">
bar
baz
</AbC_def>;

<a b={x ? <c /> : <d />} />;

<a>{}</a>;

<a>{/* this is a comment */}</a>;

<div>@test content</div>;

<div><br />7x invalid-js-identifier</div>;

<LeftRight left=<a /> right=<b>monkeys /> gorillas</b> />;

<a.b></a.b>;

<a.b.c></a.b.c>;

(<div />) < x;

<div {...props} />;

<div {...props} post="attribute" />;

<div pre="leading" pre2="attribute" {...props}></div>;

<a>    </a>;
