package srl.forge.bellagio.js;

import bionic.js.Bjs;
import bionic.js.BjsObject;
import bionic.js.BjsObjectTypeInfo;
import bionic.js.BjsTypeInfo;
import jjbridge.api.runtime.JSReference;

@BjsTypeInfo.BjsLocation(project = "Bellagio", module = "ConqueredSquare")
public class ConqueredSquare extends BjsObject {
    
    protected <T extends BjsObject> ConqueredSquare(Class<T> type, JSReference jsObject) {
        super(type, jsObject);
    }
    
    protected <T extends BjsObject> ConqueredSquare(Class<T> type, JSReference[] arguments) {
        super(type, arguments);
    }
    
    public ConqueredSquare(JSReference jsObject) {
        this(ConqueredSquare.class, jsObject);
    }
    
    public Integer left() {
        return bjs.getInteger(bjsGetProperty("left"));
    }
    
    public Integer top() {
        return bjs.getInteger(bjsGetProperty("top"));
    }
    
    public Integer right() {
        return bjs.getInteger(bjsGetProperty("right"));
    }
    
    public Integer bottom() {
        return bjs.getInteger(bjsGetProperty("bottom"));
    }
    
    public Player player() {
        return bjs.getObj(bjsGetProperty("player"), Player.bjsFactory, Player.class);
    }
    
    private static final JSReference bjsClass = BjsObjectTypeInfo.get(ConqueredSquare.class).bjsClass();
    public static final Bjs bjs = BjsObjectTypeInfo.get(ConqueredSquare.class).bjsLocator.get();
    public static final Bjs.JSReferenceConverter<ConqueredSquare> bjsFactory = ConqueredSquare::new;
}