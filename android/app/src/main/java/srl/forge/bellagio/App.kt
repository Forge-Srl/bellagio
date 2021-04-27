package srl.forge.bellagio

import android.app.Application
import bionic.js.BjsProject
import jjbridge.engine.v8.V8Engine


class App : Application() {
    override fun onCreate() {
        super.onCreate()

        BjsProject.setJsEngine(V8Engine())
    }
}