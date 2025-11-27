// File: AnimatedCoordinates.java
import java.awt.*;
import java.awt.event.*;
import java.awt.geom.*;
import javax.swing.*;

/**
 * AnimatedCoordinates.java
 * Contoh: menggambar bentuk dari titik koordinat dan menganimasikannya.
 * - Rotasi terus-menerus
 * - Pulsasi (scale) untuk efek 'bernapas'
 * - Titik koordinat digambar sebagai lingkaran kecil
 * - Gradien warna yang berubah seiring waktu
 *
 * Jalankan:
 *   javac AnimatedCoordinates.java
 *   java AnimatedCoordinates
 */
public class AnimatedCoordinates extends JPanel implements ActionListener {
    private static final int W = 900;
    private static final int H = 700;

    private final Timer timer;
    private double angle = 0;        // rotasi
    private double scale = 1.0;      // skala pulsasi
    private double scaleDir = 0.01;  // kecepatan perubahan skala
    private float hue = 0f;          // untuk mengubah warna gradien

    // Titik-titik koordinat bentuk (star / emblem). Koordinat relatif - akan discale & dipindah ke pusat.
    private final double[] px = {
        0,  20,  80,  30,  50,   0, -50, -30, -80, -20
    };
    private final double[] py = {
       -120, -40, -40,  10,  90,  40,  90,  10, -40, -40
    };

    public AnimatedCoordinates() {
        setPreferredSize(new Dimension(W, H));
        setBackground(Color.black);
        timer = new Timer(16, this); // sekitar 60 FPS
        timer.start();
    }

    @Override
    protected void paintComponent(Graphics g0) {
        super.paintComponent(g0);
        Graphics2D g = (Graphics2D) g0.create();
        // Rendering hints: anti-aliasing
        g.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);

        // Transform ke pusat panel
        AffineTransform original = g.getTransform();
        g.translate(W / 2.0, H / 2.0);

        // apply rotation & scale (pulsasi)
        g.rotate(angle);
        g.scale(scale, scale);

        // Shape dari titik koordinat (menghubungkan titik berurutan dan menutup)
        Path2D.Double shape = new Path2D.Double();
        shape.moveTo(px[0], py[0]);
        for (int i = 1; i < px.length; i++) {
            shape.lineTo(px[i], py[i]);
        }
        shape.closePath();

        // Buat gradien yang berubah warna
        Color c1 = Color.getHSBColor(hue % 1.0f, 0.9f, 1.0f);
        Color c2 = Color.getHSBColor((hue + 0.15f) % 1.0f, 0.9f, 0.85f);
        // Gradien radial pusat
        float radius = 160f;
        RadialGradientPaint rgp = new RadialGradientPaint(
            new Point2D.Double(0, 0),
            radius,
            new float[] {0f, 1f},
            new Color[] {c1, c2}
        );

        // Fill shape with gradient
        g.setPaint(rgp);
        g.fill(shape);

        // Draw stroke / outline with glow effect
        g.setStroke(new BasicStroke(4f));
        g.setComposite(AlphaComposite.getInstance(AlphaComposite.SRC_OVER, 0.9f));
        g.setColor(c2.darker());
        g.draw(shape);

        // Draw coordinate points and connecting dashed inner polygon
        drawPointsAndInner(g);

        // restore transform
        g.setTransform(original);

        // Optional: HUD info
        g.setColor(Color.WHITE);
        g.setFont(new Font("SansSerif", Font.PLAIN, 12));
        g.drawString("Animated Coordinates - Java Swing (press ESC to exit)", 10, H - 10);

        g.dispose();
    }

    private void drawPointsAndInner(Graphics2D g) {
        // Draw small circles for each coordinate point
        final int dotRadius = 6;
        for (int i = 0; i < px.length; i++) {
            double x = px[i];
            double y = py[i];

            // Fill circle
            Ellipse2D.Double dot = new Ellipse2D.Double(x - dotRadius/2.0, y - dotRadius/2.0, dotRadius, dotRadius);
            // Color variatif dari hue
            Color dotColor = Color.getHSBColor((hue + i * 0.07f) % 1.0f, 0.9f, 1f);
            g.setColor(dotColor);
            g.fill(dot);

            // Outline
            g.setColor(dotColor.darker());
            g.setStroke(new BasicStroke(1.5f));
            g.draw(dot);
        }

        // Inner dashed polygon connecting midpoints between each point for a layered effect
        Path2D.Double inner = new Path2D.Double();
        for (int i = 0; i < px.length; i++) {
            int j = (i + 1) % px.length;
            double mx = (px[i] + px[j]) / 2.0;
            double my = (py[i] + py[j]) / 2.0;
            if (i == 0) inner.moveTo(mx, my);
            else inner.lineTo(mx, my);
        }
        inner.closePath();
        Stroke dashed = new BasicStroke(2f, BasicStroke.CAP_ROUND, BasicStroke.JOIN_ROUND, 0f, new float[]{10f, 8f}, 0f);
        g.setStroke(dashed);
        g.setColor(Color.getHSBColor((hue + 0.4f) % 1.0f, 0.85f, 0.9f));
        g.draw(inner);
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        // Update animation state
        angle += 0.01;                 // putar sedikit tiap frame
        if (angle > Math.PI * 2) angle -= Math.PI * 2;

        // Pulsasi scale antara ~0.85 dan ~1.15
        scale += scaleDir;
        if (scale > 1.15 || scale < 0.85) scaleDir = -scaleDir;

        // Ubah hue perlahan untuk warna berganti
        hue += 0.003f;
        if (hue > 1.0f) hue -= 1.0f;

        repaint();
    }

    private static void createAndShowGui() {
        JFrame frame = new JFrame("Animated Coordinates - Example");
        AnimatedCoordinates panel = new AnimatedCoordinates();

        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setContentPane(panel);
        frame.pack();
        frame.setLocationRelativeTo(null);

        // Tombol ESC untuk keluar lebih cepat
        frame.addKeyListener(new KeyAdapter() {
            @Override
            public void keyPressed(KeyEvent e) {
                if (e.getKeyCode() == KeyEvent.VK_ESCAPE) {
                    System.exit(0);
                }
            }
        });

        frame.setVisible(true);
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(AnimatedCoordinates::createAndShowGui);
    }
}
