//// [tests/cases/compiler/inheritance1.ts] ////

//// [inheritance1.ts]
class Control {
    private state: any;
}
interface SelectableControl extends Control {
    select(): void;
}

class Button extends Control implements SelectableControl {
    select() { }
}
class TextBox extends Control {
    select() { }
}
class ImageBase extends Control implements SelectableControl{
}
class Image1 extends Control {
}
class Locations implements SelectableControl {
    select() { }
}
class Locations1 {
    select() { }
}
declare var sc: SelectableControl;
declare var c: Control;

declare var b: Button;
sc = b;
c = b;
b = sc;
b = c;

declare var t: TextBox;
sc = t;
c = t;
t = sc;
t = c;

declare var i: ImageBase;
sc = i;
c = i;
i = sc;
i = c;

declare var i1: Image1;
sc = i1;
c = i1;
i1 = sc;
i1 = c;

declare var l: Locations;
sc = l;
c = l;
l = sc;
l = c;

declare var l1: Locations1;
sc = l1;
c = l1;
l1 = sc;
l1 = c;

//// [inheritance1.js]
"use strict";
class Control {
    state;
}
class Button extends Control {
    select() { }
}
class TextBox extends Control {
    select() { }
}
class ImageBase extends Control {
}
class Image1 extends Control {
}
class Locations {
    select() { }
}
class Locations1 {
    select() { }
}
sc = b;
c = b;
b = sc;
b = c;
sc = t;
c = t;
t = sc;
t = c;
sc = i;
c = i;
i = sc;
i = c;
sc = i1;
c = i1;
i1 = sc;
i1 = c;
sc = l;
c = l;
l = sc;
l = c;
sc = l1;
c = l1;
l1 = sc;
l1 = c;
