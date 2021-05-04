package srl.forge.bellagio.js;

import jjbridge.api.runtime.JSReference;
import jjbridge.api.value.strategy.FunctionCallback;
import bionic.js.Bjs;
import bionic.js.BjsTypeInfo;
import bionic.js.BjsObjectTypeInfo;
import bionic.js.Lambda;
import java.util.Date;
import bionic.js.BjsObject;

@BjsTypeInfo.BjsLocation(project = "Bellagio", module = "Player")
public class Player extends BjsObject {
    
    protected <T extends BjsObject> Player(Class<T> type, JSReference jsObject) {
        super(type, jsObject);
    }
    
    protected <T extends BjsObject> Player(Class<T> type, JSReference[] arguments) {
        super(type, arguments);
    }
    
    public Player(JSReference jsObject) {
        this(Player.class, jsObject);
    }
    
    public String name() {
        return bjs.getString(bjsGetProperty("name"));
    }
    
    private static final JSReference bjsClass = BjsObjectTypeInfo.get(Player.class).bjsClass();
    public static final Bjs bjs = BjsObjectTypeInfo.get(Player.class).bjsLocator.get();
    public static final Bjs.JSReferenceConverter<Player> bjsFactory = Player::new;
}