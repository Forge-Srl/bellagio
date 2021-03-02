package srl.forge.bellagio;

import bionic.js.BjsProject;
import jjbridge.engine.v8.V8Engine;
import srl.forge.bellagio.js.Game;

public class Main
{
    public static void main(String[] args)
    {
        BjsProject.setJsEngine(new V8Engine());

        System.out.println(Game.run());
    }
}
