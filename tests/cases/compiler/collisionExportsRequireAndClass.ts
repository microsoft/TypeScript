//@module: amd
//@filename: collisionExportsRequireAndClass_externalmodule.ts
export class require {
}
export class exports {
}
namespace m1 {
    class require {
    }
    class exports {
    }
}
namespace m2 {
    export class require {
    }
    export class exports {
    }
}

//@filename: collisionExportsRequireAndClass_globalFile.ts
class require {
}
class exports {
}
namespace m3 {
    class require {
    }
    class exports {
    }
}
namespace m4 {
    export class require {
    }
    export class exports {
    }
}