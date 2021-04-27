package srl.forge.bellagio.js;

import bionic.js.Bjs;
import bionic.js.BjsObject;
import bionic.js.BjsObjectTypeInfo;
import bionic.js.BjsTypeInfo;
import jjbridge.api.runtime.JSReference;

@BjsTypeInfo.BjsLocation(project = "Bellagio", module = "Board")
public class Board extends BjsObject {
    
    protected <T extends BjsObject> Board(Class<T> type, JSReference jsObject) {
        super(type, jsObject);
    }
    
    protected <T extends BjsObject> Board(Class<T> type, JSReference[] arguments) {
        super(type, arguments);
    }
    
    public Board(JSReference jsObject) {
        this(Board.class, jsObject);
    }
    
    public Size size() {
        return bjs.getObj(bjsGetProperty("size"), Size.bjsFactory, Size.class);
    }
    
    public Segment[] segments() {
        return bjs.getArray(bjsGetProperty("segments"), r_bjs0 -> {
            return bjs.getObj(r_bjs0, Segment.bjsFactory, Segment.class);
        }, Segment.class);
    }
    
    public ConqueredSquare[] conqueredSquares() {
        return bjs.getArray(bjsGetProperty("conqueredSquares"), r_bjs0 -> {
            return bjs.getObj(r_bjs0, ConqueredSquare.bjsFactory, ConqueredSquare.class);
        }, ConqueredSquare.class);
    }
    
    private static final JSReference bjsClass = BjsObjectTypeInfo.get(Board.class).bjsClass();
    public static final Bjs bjs = BjsObjectTypeInfo.get(Board.class).bjsLocator.get();
    public static final Bjs.JSReferenceConverter<Board> bjsFactory = Board::new;
}