// All of these should be an error

namespace Y {
    public var x: number = 0;
}

namespace Y2 {
    public function fn(x: string) { }
}

namespace Y4 {
    static var x: number = 0;
}

namespace YY {
    static function fn(x: string) { }
}

namespace YY2 {
    private var x: number = 0;
}


namespace YY3 {
    private function fn(x: string) { }
}
