package srl.forge.bellagio.js;

import bionic.js.Bjs;
import bionic.js.BjsProject;
import bionic.js.BjsProjectTypeInfo;

public class BjsBellagio extends BjsProject {
    
    @BjsProjectTypeInfo.Initializer
    public static void initialize(Bjs bjs) {
        initProject();
        bjs.loadBundle(BjsBellagio.class, "MainBundle");
    }
}