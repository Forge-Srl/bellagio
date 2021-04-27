package srl.forge.bellagio.js;

import jjbridge.api.runtime.JSReference;
import jjbridge.api.value.strategy.FunctionCallback;
import bionic.js.Bjs;
import bionic.js.BjsTypeInfo;
import bionic.js.BjsObjectTypeInfo;
import bionic.js.Lambda;
import java.util.Date;
import srl.forge.bellagio.js.Player;
import bionic.js.BjsObject;

@BjsTypeInfo.BjsLocation(project = "Bellagio", module = "PlayersPoints")
public class PlayersPoints extends BjsObject {
    
    protected <T extends BjsObject> PlayersPoints(Class<T> type, JSReference jsObject) {
        super(type, jsObject);
    }
    
    protected <T extends BjsObject> PlayersPoints(Class<T> type, JSReference[] arguments) {
        super(type, arguments);
    }
    
    public PlayersPoints(JSReference jsObject) {
        this(PlayersPoints.class, jsObject);
    }
    
    public Integer get(Player player) {
        return bjs.getInteger(bjsCall("get", bjs.putObj(player)));
    }
    
    private static final JSReference bjsClass = BjsObjectTypeInfo.get(PlayersPoints.class).bjsClass();
    public static final Bjs bjs = BjsObjectTypeInfo.get(PlayersPoints.class).bjsLocator.get();
    public static final Bjs.JSReferenceConverter<PlayersPoints> bjsFactory = PlayersPoints::new;
}