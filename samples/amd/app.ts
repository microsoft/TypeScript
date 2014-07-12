import model = require("greeter")

var el = document.getElementById('content');
var greeter = new model.Greeter(el);
greeter.start();
