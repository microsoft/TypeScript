//// [typeParameterDiamond1.ts]
function diamondTop<Top>() {
    function diamondMiddle<T extends Top, U extends Top>() {
        function diamondBottom<Bottom extends T | U>() {
            var top: Top;
            var middle: T | U;
            var bottom: Bottom;

            top = middle;
            middle = bottom;
            top = bottom;
        }
    }
}

//// [typeParameterDiamond1.js]
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
