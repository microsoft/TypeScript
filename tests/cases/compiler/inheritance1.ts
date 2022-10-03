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
var sc: SelectableControl;
var c: Control;

var b: Button;
sc = b;
c = b;
b = sc;
b = c;

var t: TextBox;
sc = t;
c = t;
t = sc;
t = c;

var i: ImageBase;
sc = i;
c = i;
i = sc;
i = c;

var i1: Image1;
sc = i1;
c = i1;
i1 = sc;
i1 = c;

var l: Locations;
sc = l;
c = l;
l = sc;
l = c;

var l1: Locations1;
sc = l1;
c = l1;
l1 = sc;
l1 = c;