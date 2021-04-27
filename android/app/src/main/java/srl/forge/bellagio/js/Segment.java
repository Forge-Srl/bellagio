package srl.forge.bellagio.js;

import bionic.js.Bjs;
import bionic.js.BjsObject;
import bionic.js.BjsObjectTypeInfo;
import bionic.js.BjsTypeInfo;
import jjbridge.api.runtime.JSReference;

@BjsTypeInfo.BjsLocation(project = "Bellagio", module = "Segment")
public class Segment extends BjsObject {
    
    protected <T extends BjsObject> Segment(Class<T> type, JSReference jsObject) {
        super(type, jsObject);
    }
    
    protected <T extends BjsObject> Segment(Class<T> type, JSReference[] arguments) {
        super(type, arguments);
    }
    
    public Segment(JSReference jsObject) {
        this(Segment.class, jsObject);
    }
    
    public static String horizontal() {
        return bjs.getString(bjs.getProperty(bjsClass, "horizontal"));
    }
    
    public static String vertical() {
        return bjs.getString(bjs.getProperty(bjsClass, "vertical"));
    }
    
    public Boolean isVertical() {
        return bjs.getBoolean(bjsGetProperty("isVertical"));
    }
    
    public Boolean isHorizontal() {
        return bjs.getBoolean(bjsGetProperty("isHorizontal"));
    }
    
    public Point startPoint() {
        return bjs.getObj(bjsGetProperty("startPoint"), Point.bjsFactory, Point.class);
    }
    
    private static final JSReference bjsClass = BjsObjectTypeInfo.get(Segment.class).bjsClass();
    public static final Bjs bjs = BjsObjectTypeInfo.get(Segment.class).bjsLocator.get();
    public static final Bjs.JSReferenceConverter<Segment> bjsFactory = Segment::new;
}