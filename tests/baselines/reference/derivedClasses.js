//// [tests/cases/compiler/derivedClasses.ts] ////

//// [derivedClasses.ts]
class Red extends Color {
    public shade() { 
    	var getHue = () => { return this.hue(); };
    	return getHue() + " red"; 
    }
}

class Color {
    public shade() { return "some shade"; }
    public hue() { return "some hue"; }
}

class Blue extends Color {
    
    public shade() { 
    	var getHue = () => { return this.hue(); };
    	return getHue() + " blue"; 
    }
}

var r = new Red();
var b = new Blue();

r.shade();
r.hue();
b.shade();
b.hue();




//// [derivedClasses.js]
class Red extends Color {
    shade() {
        var getHue = () => { return this.hue(); };
        return getHue() + " red";
    }
}
class Color {
    shade() { return "some shade"; }
    hue() { return "some hue"; }
}
class Blue extends Color {
    shade() {
        var getHue = () => { return this.hue(); };
        return getHue() + " blue";
    }
}
var r = new Red();
var b = new Blue();
r.shade();
r.hue();
b.shade();
b.hue();
