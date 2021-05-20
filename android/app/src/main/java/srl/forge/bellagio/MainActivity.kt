package srl.forge.bellagio

import android.graphics.Color
import android.graphics.drawable.ShapeDrawable
import android.os.Bundle
import android.util.Log
import android.view.MotionEvent
import android.view.View
import android.view.ViewGroup
import android.widget.LinearLayout
import android.widget.TextView
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import com.forge.bellagio.R
import srl.forge.bellagio.js.Board
import srl.forge.bellagio.js.Game
import srl.forge.bellagio.js.Player
import srl.forge.bellagio.js.Segment

class MainActivity : AppCompatActivity() {
    private val colors = arrayOf(
        Color.RED,
        Color.BLUE
    )

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val playersContainer = findViewById<LinearLayout>(R.id.players_container)
        val boardContainer = findViewById<LinearLayout>(R.id.board_container)

        val game = Game()
        game.onGameStart { board ->
            val playerColors = game.players()
                .map { it.name() }
                .zip(colors)
                .toMap()
            setupPlayers(playersContainer, game, playerColors)
            setupBoard(boardContainer, game, board, playerColors)
            null
        }
        game.onSegmentAdded { board, segment ->
            updatePlayers(playersContainer, game)
            updateBoard(boardContainer, board, segment)
            null
        }
        game.onGameOver { player ->
            showWinner(player)
            null
        }
        game.startGame(5, 5)
    }

    private fun setupPlayers(
        playersContainer: LinearLayout,
        game: Game,
        playerColors: Map<String, Int>
    ) {
        val points = game.points()
        game.players().forEach { player ->
            val playerView = TextView(this)
            playerView.layoutParams = LinearLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.WRAP_CONTENT
            )
            playerView.tag = player.name()
            playerView.text = player.name() + ": " + points[player]
            playerView.setTextColor(playerColors.getValue(player.name()))
            playersContainer.addView(playerView)
        }
    }

    private fun setupBoard(
        boardContainer: LinearLayout,
        game: Game,
        board: Board,
        playerColors: Map<String, Int>
    ) {
        val minSize = minOf(resources.displayMetrics.widthPixels, resources.displayMetrics.heightPixels) /
                (board.size().width() - 1)
        repeat(board.size().height() - 1) { row ->
            val rowView = LinearLayout(this)
            boardContainer.addView(rowView)
            repeat(board.size().width() - 1) { col ->
                val cell = View(this)
                val cellBackground = CellBackground(resources, playerColors)
                cell.layoutParams = LinearLayout.LayoutParams(minSize, minSize)
                cell.background = ShapeDrawable(cellBackground)
                cell.tag = cellBackground
                rowView.addView(cell)
                cell.setOnTouchListener { v, event ->
                    if (event.action != MotionEvent.ACTION_DOWN) return@setOnTouchListener false
                    val clickLocation = getClickLocation(v, event)

                    Log.e("AAAAA", "col = $col, row = $row, clickLocation = $clickLocation")
                    try {
                        when (clickLocation) {
                            "top" -> game.addSegment(col, row, Segment.horizontal())
                            "bottom" -> game.addSegment(col, row + 1, Segment.horizontal())
                            "left" -> game.addSegment(col, row, Segment.vertical())
                            "right" -> game.addSegment(col + 1, row, Segment.vertical())
                        }
                    } catch (ignored: Exception) {
                    }
                    true
                }
            }
        }
    }

    private fun showWinner(player: Player) {
        AlertDialog.Builder(this)
            .setTitle(R.string.game_over)
            .setMessage(getString(R.string.player_won, player.name()))
            .setPositiveButton(android.R.string.ok, null)
            .show()
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

    private fun updatePlayers(playersContainer: LinearLayout, game: Game) {
        val points = game.points()
        game.players().forEach { player ->
            val playerView = playersContainer.findViewWithTag<TextView>(player.name())
            playerView.text = player.name() + ": " + points[player]
        }
    }

    private fun updateBoard(boardContainer: LinearLayout, board: Board, segment: Segment) {
        if (segment.isHorizontal) {
            val x = segment.startPoint().x()
            val y = segment.startPoint().y()
            if (y >= 1) {
                val row = boardContainer.getChildAt(y - 1) as ViewGroup
                val cell = row.getChildAt(x)
                val cellBackground = cell.tag as CellBackground
                cellBackground.bottom = segment.player()
                cell.invalidate()
            }
            if (y < board.size().height() - 1) {
                val row = boardContainer.getChildAt(y) as ViewGroup
                val cell = row.getChildAt(x)
                val cellBackground = cell.tag as CellBackground
                cellBackground.top = segment.player()
                cell.invalidate()
            }
        } else {
            val x = segment.startPoint().x()
            val y = segment.startPoint().y()
            if (x >= 1) {
                val row = boardContainer.getChildAt(y) as ViewGroup
                val cell = row.getChildAt(x - 1)
                val cellBackground = cell.tag as CellBackground
                cellBackground.right = segment.player()
                cell.invalidate()
            }
            if (x < board.size().width() - 1) {
                val row = boardContainer.getChildAt(y) as ViewGroup
                val cell = row.getChildAt(x)
                val cellBackground = cell.tag as CellBackground
                cellBackground.left = segment.player()
                cell.invalidate()
            }
        }
        board.conqueredSquares().forEach { square ->
            for (r in square.top() until square.bottom()) {
                val row = boardContainer.getChildAt(r) as ViewGroup
                for (c in square.left() until square.right()) {
                    val cell = row.getChildAt(c)
                    val cellBackground = cell.tag as CellBackground
                    cellBackground.owner = square.player()
                    cell.invalidate()
                }
            }
        }
    }
}