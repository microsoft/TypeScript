// @allowUnusedLabels: false

let x = 1;
loop: while (true) {
    if (x == 100) {
        break;
    }
    else {
        x++;
    }
}
{
    x: 100
}

var y = () => { f: 1 }