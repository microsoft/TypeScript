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


