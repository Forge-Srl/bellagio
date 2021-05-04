package srl.forge.bellagio.js;

import jjbridge.api.runtime.JSReference;
import jjbridge.api.value.strategy.FunctionCallback;
import bionic.js.Bjs;
import bionic.js.BjsTypeInfo;
import bionic.js.BjsObjectTypeInfo;
import bionic.js.Lambda;
import java.util.Date;
import bionic.js.BjsObject;

@BjsTypeInfo.BjsLocation(project = "Bellagio", module = "Size")
public class Size extends BjsObject {
    
    protected <T extends BjsObject> Size(Class<T> type, JSReference jsObject) {
        super(type, jsObject);
    }
    
    protected <T extends BjsObject> Size(Class<T> type, JSReference[] arguments) {
        super(type, arguments);
    }
    
    public Size(JSReference jsObject) {
        this(Size.class, jsObject);
    }
    
    public Integer width() {
        return bjs.getInteger(bjsGetProperty("width"));
    }
    
    public Integer height() {
        return bjs.getInteger(bjsGetProperty("height"));
    }
    
    private static final JSReference bjsClass = BjsObjectTypeInfo.get(Size.class).bjsClass();
    public static final Bjs bjs = BjsObjectTypeInfo.get(Size.class).bjsLocator.get();
    public static final Bjs.JSReferenceConverter<Size> bjsFactory = Size::new;
}