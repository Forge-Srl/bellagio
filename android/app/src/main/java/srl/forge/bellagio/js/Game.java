package srl.forge.bellagio.js;

import bionic.js.Bjs;
import bionic.js.BjsObject;
import bionic.js.BjsObjectTypeInfo;
import bionic.js.BjsTypeInfo;
import bionic.js.Lambda;
import jjbridge.api.runtime.JSReference;
import jjbridge.api.value.strategy.FunctionCallback;

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
    
    public Game(JSReference[] arguments) {
        this(Game.class, arguments);
    }
    
    public Game() {
        this(bjs_Game());
    }
    
    private static JSReference[] bjs_Game() {
        return new JSReference[]{};
    }
    
    public Player currentPlayer() {
        return bjs.getObj(bjsGetProperty("currentPlayer"), Player.bjsFactory, Player.class);
    }
    
    public PlayersPoints points() {
        return bjs.getObj(bjsGetProperty("points"), PlayersPoints.bjsFactory, PlayersPoints.class);
    }
    
    public Player[] players() {
        return bjs.getArray(bjsGetProperty("players"), r_bjs0 -> {
            return bjs.getObj(r_bjs0, Player.bjsFactory, Player.class);
        }, Player.class);
    }
    
    public void onGameStart(Lambda.F1<Board, Void> callback) {
        Lambda.F1<Board, Void> nativeFunc_bjs0 = callback;
        FunctionCallback<?> jsFunc_bjs1 = jsReferences_bjs2 -> {
            jsReferences_bjs2 = bjs.ensureArraySize(jsReferences_bjs2, 1);
            nativeFunc_bjs0.apply(bjs.getObj(jsReferences_bjs2[0], Board.bjsFactory, Board.class));
            return bjs.jsUndefined();
        };
        bjsCall("onGameStart", bjs.putFunc(nativeFunc_bjs0, jsFunc_bjs1));
    }
    
    public void onGameOver(Lambda.F1<Player, Void> callback) {
        Lambda.F1<Player, Void> nativeFunc_bjs0 = callback;
        FunctionCallback<?> jsFunc_bjs1 = jsReferences_bjs2 -> {
            jsReferences_bjs2 = bjs.ensureArraySize(jsReferences_bjs2, 1);
            nativeFunc_bjs0.apply(bjs.getObj(jsReferences_bjs2[0], Player.bjsFactory, Player.class));
            return bjs.jsUndefined();
        };
        bjsCall("onGameOver", bjs.putFunc(nativeFunc_bjs0, jsFunc_bjs1));
    }
    
    public void onSegmentAdded(Lambda.F2<Board, Segment, Void> callback) {
        Lambda.F2<Board, Segment, Void> nativeFunc_bjs0 = callback;
        FunctionCallback<?> jsFunc_bjs1 = jsReferences_bjs2 -> {
            jsReferences_bjs2 = bjs.ensureArraySize(jsReferences_bjs2, 2);
            nativeFunc_bjs0.apply(bjs.getObj(jsReferences_bjs2[0], Board.bjsFactory, Board.class), bjs.getObj(jsReferences_bjs2[1], Segment.bjsFactory, Segment.class));
            return bjs.jsUndefined();
        };
        bjsCall("onSegmentAdded", bjs.putFunc(nativeFunc_bjs0, jsFunc_bjs1));
    }
    
    public void startGame(Integer width, Integer height) {
        bjsCall("startGame", bjs.putPrimitive(width), bjs.putPrimitive(height));
    }
    
    public void addSegment(Integer x, Integer y, String direction) {
        bjsCall("addSegment", bjs.putPrimitive(x), bjs.putPrimitive(y), bjs.putPrimitive(direction));
    }
    
    private static final JSReference bjsClass = BjsObjectTypeInfo.get(Game.class).bjsClass();
    public static final Bjs bjs = BjsObjectTypeInfo.get(Game.class).bjsLocator.get();
    public static final Bjs.JSReferenceConverter<Game> bjsFactory = Game::new;
}