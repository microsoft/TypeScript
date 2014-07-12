module foo {    
    export class Provide {
    }
    export module bar { export module baz {export class boo {}}}
}

import provide = foo;
import booz = foo.bar.baz;
import beez = foo.bar;

import m = no;
import m2 = no.mod;
import n = 5;
import o = "s";
import q = null;
import r = undefined;


var p = new provide.Provide();

function use() {
    
  beez.baz.boo;
  var p1: provide.Provide; 
  var p2: foo.Provide;
  var p3:booz.bar;
  var p22 = new provide.Provide();
}

