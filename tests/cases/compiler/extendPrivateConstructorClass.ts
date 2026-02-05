// @target: es2015
declare namespace abc {
    class XYZ {
        private constructor();
    }
}

class C extends abc.XYZ {
}
