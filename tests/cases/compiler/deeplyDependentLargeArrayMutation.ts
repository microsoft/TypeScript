// @allowJs: true
// @checkJs: true
// @noEmit: true
// @target: es6
// @filename: foo.js
// repro from #26031
function build() {
    var arr = [];

    arr[arr.length] = 'value'; 
    arr[arr.length] = 'value'; 
    arr[arr.length] = 'value';
    arr[arr.length] = 'value';
    arr[arr.length] = 'value';
    arr[arr.length] = 'value';
    arr[arr.length] = 'value'; 
    arr[arr.length] = 'value'; 
    arr[arr.length] = 'value';
    arr[arr.length] = 'value';
    arr[arr.length] = 'value';
    arr[arr.length] = 'value';
    arr[arr.length] = 'value';
    arr[arr.length] = 'value';
    arr[arr.length] = 'value';
    arr[arr.length] = 'value'; 
    arr[arr.length] = 'value';
    arr[arr.length] = 'value';
    arr[arr.length] = 'value';
    arr[arr.length] = 'value';
    arr[arr.length] = 'value';
    arr[arr.length] = 'value';
    arr[arr.length] = 'value';
    arr[arr.length] = 'value';
    arr[arr.length] = 'value'; 
}