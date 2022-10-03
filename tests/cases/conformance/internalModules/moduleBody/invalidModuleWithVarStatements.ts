// All of these should be an error

module Y {
    public var x: number = 0;
}

module Y2 {
    public function fn(x: string) { }
}

module Y4 {
    static var x: number = 0;
}

module YY {
    static function fn(x: string) { }
}

module YY2 {
    private var x: number = 0;
}


module YY3 {
    private function fn(x: string) { }
}
