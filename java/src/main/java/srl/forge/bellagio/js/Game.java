package srl.forge.bellagio.js;

import jjbridge.api.runtime.JSReference;
import jjbridge.api.value.strategy.FunctionCallback;
import bionic.js.Bjs;
import bionic.js.BjsTypeInfo;
import bionic.js.BjsObjectTypeInfo;
import bionic.js.Lambda;
import java.util.Date;
import bionic.js.BjsObject;

@BjsTypeInfo.BjsLocation(project = "Bellagio", module = "Game")
public class Game extends BjsObject {
    
    protected <T extends BjsObject> Game(Class<T> type, JSReference jsObject) {
        super(type, jsObject);
    }
    
    protected <T extends BjsObject> Game(Class<T> type, JSReference[] arguments) {
        super(type, arguments);
    }
    
    public Game(JSReference jsObject) {
        this(Game.class, jsObject);
    }
    
    public static String run() {
        return bjs.getString(bjs.call(bjsClass, "run"));
    }
    
    private static final JSReference bjsClass = BjsObjectTypeInfo.get(Game.class).bjsClass();
    public static final Bjs bjs = BjsObjectTypeInfo.get(Game.class).bjsLocator.get();
    public static final Bjs.JSReferenceConverter<Game> bjsFactory = Game::new;
}