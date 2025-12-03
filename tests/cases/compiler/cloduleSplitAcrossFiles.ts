// @Filename: cloduleSplitAcrossFiles_class.ts
class D { }

// @Filename: cloduleSplitAcrossFiles_module.ts
namespace D {
    export var y = "hi";
}
D.y;