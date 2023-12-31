
type T12 = {
    a: 1|2;
    set gsa(x: 1|2);
    get gsa(): 1|2;
    set sb(x: 1|2);
    get gc(): 1|2;
};
type T23 = {
    a: 2|3;
    set gsa(x: 2|3);
    get gsa(): 2|3;
    set sb(x: 2|3);
    get gc(): 2|3;
};

function fu(u:T12|T23) {
    u.a = 1;
    u.sb = 1;
    u.gsa = 1;
    u.a = 2;
    u.sb = 2;
    u.gsa = 2;
    u.a = 3;
    u.sb = 3;
    u.gsa = 3;
    if (u.gsa === 1) {
        u.gsa;
    }
    if (u.gc === 1) {
        u.gc;
    }
}
function fi(i:T12&T23) {
    i.a = 1; // error before & after
    i.sb = 1; // error before & after
    i.gsa = 1; // error before & after
    if (i.gsa === 1) { // error before & after
        i.gsa;
    }
    if (i.gc === 1) { // error before & after
        i.gc;
    }
}