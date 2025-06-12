var m2;
(function (m2) {
    m2.c1 = new m2.mExported.me.class1;
    function f1() {
        return new m2.mExported.me.class1();
    }
    m2.f1 = f1;
    m2.x1 = m2.mExported.me.x;
    class class1 extends m2.mExported.me.class1 {
    }
    m2.class1 = class1;
    var c2 = new m2.mExported.me.class1;
    function f2() {
        return new m2.mExported.me.class1();
    }
    var x2 = m2.mExported.me.x;
    class class2 extends m2.mExported.me.class1 {
    }
    m2.c3 = new mNonExported.mne.class1;
    function f3() {
        return new mNonExported.mne.class1();
    }
    m2.f3 = f3;
    m2.x3 = mNonExported.mne.x;
    class class3 extends mNonExported.mne.class1 {
    }
    m2.class3 = class3;
    var c4 = new mNonExported.mne.class1;
    function f4() {
        return new mNonExported.mne.class1();
    }
    var x4 = mNonExported.mne.x;
    class class4 extends mNonExported.mne.class1 {
    }
})(m2 || (m2 = {}));
