//// [typeParameterDiamond3.ts]
function diamondTop<Top>() {
    function diamondMiddle<T, U>() {
        function diamondBottom<Bottom extends Top | T | U>() {
            var top: Top;
            var middle: T | U;
            var bottom: Bottom;

            top = middle;
            middle = bottom;
            top = bottom;
        }
    }
}

//// [typeParameterDiamond3.js]
function diamondTop() {
    function diamondMiddle() {
        function diamondBottom() {
            var top;
            var middle;
            var bottom;
            top = middle;
            middle = bottom;
            top = bottom;
        }
    }
}
