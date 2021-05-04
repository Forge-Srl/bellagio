package srl.forge.bellagio.js;

import jjbridge.api.runtime.JSReference;
import jjbridge.api.value.strategy.FunctionCallback;
import bionic.js.Bjs;
import bionic.js.BjsTypeInfo;
import bionic.js.BjsObjectTypeInfo;
import bionic.js.Lambda;
import java.util.Date;
import bionic.js.BjsObject;

@BjsTypeInfo.BjsLocation(project = "Bellagio", module = "Point")
public class Point extends BjsObject {
    
    protected <T extends BjsObject> Point(Class<T> type, JSReference jsObject) {
        super(type, jsObject);
    }
    
    protected <T extends BjsObject> Point(Class<T> type, JSReference[] arguments) {
        super(type, arguments);
    }
    
    public Point(JSReference jsObject) {
        this(Point.class, jsObject);
    }
    
    public Integer x() {
        return bjs.getInteger(bjsGetProperty("x"));
    }
    
    public Integer y() {
        return bjs.getInteger(bjsGetProperty("y"));
    }
    
    private static final JSReference bjsClass = BjsObjectTypeInfo.get(Point.class).bjsClass();
    public static final Bjs bjs = BjsObjectTypeInfo.get(Point.class).bjsLocator.get();
    public static final Bjs.JSReferenceConverter<Point> bjsFactory = Point::new;
}