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