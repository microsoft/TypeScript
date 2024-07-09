interface I {
}

enum E {
    Red, Green, Blue
}

function f() {
    var a: any;
    var n=3;
    var s="";
    var b=false;
    var i:I;
    var e:E;

    n&&a;
    n&&s;
    n&&b;
    n&&i;
    n&&n;
    n&&e;

    s&&a;
    s&&n;
    s&&b;
    s&&i;
    s&&s;
    s&&e;

    a&&n;
    a&&s;
    a&&b;
    a&&i;
    a&&a;
    a&&e;

    i&&n;
    i&&s;
    i&&b;
    i&&a;
    i&&i;
    i&&e;

    e&&n;
    e&&s;
    e&&b;
    e&&a;
    e&&i;
    e&&e;

    n||a;
    n||s;
    n||b;
    n||i;
    n||n;
    n||e;

    s||a;
    s||n;
    s||b;
    s||i;
    s||s;
    s||e;

    a||n;
    a||s;
    a||b;
    a||i;
    a||a;
    a||e;

    i||n;
    i||s;
    i||b;
    i||a;
    i||i;
    i||e;

    e||n;
    e||s;
    e||b;
    e||a;
    e||i;
    e||e;

    n==a;
    n==s;
    n==b;
    n==i;
    n==n;
    n==e;

    s==a;
    s==n;
    s==b;
    s==i;
    s==s;
    s==e;

    a==n;
    a==s;
    a==b;
    a==i;
    a==a;
    a==e;

    i==n;
    i==s;
    i==b;
    i==a;
    i==i;
    i==e;

    e==n;
    e==s;
    e==b;
    e==a;
    e==i;
    e==e;

    +i;
    +s;
    +n;
    +a;
    +b;

    -i;
    -s;
    -n;
    -a;
    -b;

    !i;
    !s;
    !n;
    !a;
    !b;


    n+a;
    n+s;
    n+b;
    n+i;
    n+n;
    n+e;

    s+a;
    s+n;
    s+b;
    s+i;
    s+s;
    s+e;

    a+n;
    a+s;
    a+b;
    a+i;
    a+a;
    a+e;

    i+n;
    i+s;
    i+b;
    i+a;
    i+i;
    i+e;

    e+n;
    e+s;
    e+b;
    e+a;
    e+i;
    e+e;

    n^a;
    n^s;
    n^b;
    n^i;
    n^n;
    n^e;

    s^a;
    s^n;
    s^b;
    s^i;
    s^s;
    s^e;

    a^n;
    a^s;
    a^b;
    a^i;
    a^a;
    a^e;

    i^n;
    i^s;
    i^b;
    i^a;
    i^i;
    i^e;

    e^n;
    e^s;
    e^b;
    e^a;
    e^i;
    e^e;

    n-a;
    n-s;
    n-b;
    n-i;
    n-n;
    n-e;

    s-a;
    s-n;
    s-b;
    s-i;
    s-s;
    s-e;

    a-n;
    a-s;
    a-b;
    a-i;
    a-a;
    a-e;

    i-n;
    i-s;
    i-b;
    i-a;
    i-i;
    i-e;

    e-n;
    e-s;
    e-b;
    e-a;
    e-i;
    e-e;

}