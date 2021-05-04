package srl.forge.bellagio

import android.annotation.SuppressLint
import android.os.Bundle
import android.util.Log
import android.view.MotionEvent
import android.view.View
import android.view.ViewGroup
import android.widget.LinearLayout
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import com.forge.bellagio.R
import srl.forge.bellagio.js.Game
import srl.forge.bellagio.js.Segment

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val content = findViewById<ViewGroup>(android.R.id.content)

        val container = LinearLayout(this)
        container.orientation = LinearLayout.VERTICAL
        val displayMetrics = resources.displayMetrics
        container.layoutParams =
            LinearLayout.LayoutParams(displayMetrics.widthPixels, displayMetrics.heightPixels)
        content.addView(container)


        val game = Game()
        game.onGameStart { board ->
            val minSize = minOf(displayMetrics.widthPixels, displayMetrics.heightPixels) /
                    (board.size().width() - 1)
            repeat(board.size().height() - 1) { row ->
                val rowView = LinearLayout(this)
                container.addView(rowView)
                repeat(board.size().width() - 1) { col ->
                    val cell = View(this)
                    cell.layoutParams = LinearLayout.LayoutParams(minSize, minSize)
                    cell.background = ContextCompat.getDrawable(this, R.drawable.background)
                    rowView.addView(cell)
                    cell.setOnTouchListener { v, event ->
                        if (event.action != MotionEvent.ACTION_DOWN) return@setOnTouchListener false
                        val clickLocation = getClickLocation(v, event)

                        Log.e("AAAAA", "col = $col, row = $row, clickLocation = $clickLocation")
                        when (clickLocation) {
                            "top" -> game.addSegment(col, row, Segment.horizontal())
                            "bottom" -> game.addSegment(col, row + 1, Segment.horizontal())
                            "left" -> game.addSegment(col, row, Segment.vertical())
                            "right" -> game.addSegment(col + 1, row, Segment.vertical())
                        }
                        true
                    }
                }
            }
            null
        }
        game.onSegmentAdded { _, segment ->
            Log.e("AAAA", "segment = ${segment.startPoint()}")
            null
        }
        game.onGameOver { null }
        game.startGame(5, 5)
    }

    private fun getClickLocation(cell: View, event: MotionEvent): String {
        val relX = event.x / cell.measuredWidth
        val relY = event.y / cell.measuredHeight

        val verticalProximity = if (relY >= 0.5) "bottom" else "top"
        val verticalDelta = minOf(relY, 1 - relY)
        val horizontalProximity = if (relX >= 0.5) "right" else "left"
        val horizontalDelta = minOf(relX, 1 - relX)

        return if (horizontalDelta <= verticalDelta) horizontalProximity else verticalProximity
    }
}