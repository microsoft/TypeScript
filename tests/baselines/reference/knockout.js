//// [knockout.js]
var o = {
    name: ko.observable("Bob"),
    age: ko.observable(37)
};
var x_v = o.name().length;
var age_v = o.age();
var name_v = o.name("Robert");
var zz_v = o.name.N;
var yy_v = o.name.g;
var rr_v = o.name.r;
var dd_v = o.name.d;
