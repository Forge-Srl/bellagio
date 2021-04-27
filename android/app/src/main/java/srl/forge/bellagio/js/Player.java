package srl.forge.bellagio.js;

import bionic.js.Bjs;
import bionic.js.BjsObject;
import bionic.js.BjsObjectTypeInfo;
import bionic.js.BjsTypeInfo;
import jjbridge.api.runtime.JSReference;

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