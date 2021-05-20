package srl.forge.bellagio

import android.content.res.Resources
import android.graphics.Canvas
import android.graphics.Color
import android.graphics.Paint
import android.graphics.drawable.shapes.Shape
import androidx.core.graphics.ColorUtils
import srl.forge.bellagio.js.Player

class CellBackground(
    private val resources: Resources,
    private val colors: Map<String, Int>
) : Shape() {
    var left: Player? = null
    var top: Player? = null
    var right: Player? = null
    var bottom: Player? = null
    var owner: Player? = null

    override fun draw(canvas: Canvas, paint: Paint) {
        val o = owner
        if (o != null) {
            val color = colors.getValue(o.name())
            canvas.drawColor(ColorUtils.setAlphaComponent(color, 0x88))
        }

        paint.strokeWidth = resources.displayMetrics.density * 8

        val l = left
        paint.color = if (l != null) colors.getValue(l.name()) else Color.BLACK
        canvas.drawLine(0.0f, 0.0f, 0.0f, canvas.height.toFloat(), paint)

        val t = top
        paint.color = if (t != null) colors.getValue(t.name()) else Color.BLACK
        canvas.drawLine(0.0f, 0.0f, canvas.width.toFloat(), 0.0f, paint)

        val r = right
        paint.color = if (r != null) colors.getValue(r.name()) else Color.BLACK
        canvas.drawLine(canvas.width.toFloat(), 0.0f, canvas.width.toFloat(), canvas.height.toFloat(), paint)

        val b = bottom
        paint.color = if (b != null) colors.getValue(b.name()) else Color.BLACK
        canvas.drawLine(0.0f, canvas.height.toFloat(), canvas.width.toFloat(), canvas.height.toFloat(), paint)
    }
}