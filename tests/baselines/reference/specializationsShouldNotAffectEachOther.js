//// [specializationsShouldNotAffectEachOther.ts]
interface Series  {
    data: string[];
}

var series: Series;


function foo() {

    var seriesExtent = (series) => null;

    var series2: number[];

    series2.map(seriesExtent);
    return null;
}


var keyExtent2: any[] = series.data.map(function (d: string) { return d; });

//// [specializationsShouldNotAffectEachOther.js]
var series;
function foo() {
    var seriesExtent = function (series) { return null; };
    var series2;
    series2.map(seriesExtent);
    return null;
}
var keyExtent2 = series.data.map(function (d) { return d; });
