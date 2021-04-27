package srl.forge.bellagio

import android.os.Bundle
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.forge.bellagio.R
import srl.forge.bellagio.js.Game

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val textName = findViewById<TextView>(R.id.text_name)

        val game = Game()
        game.onGameStart { null }
        game.onSegmentAdded { _, _ -> null }
        game.onGameOver { null }
        game.startGame()
        textName.text = game.players()[0].name()
    }
}