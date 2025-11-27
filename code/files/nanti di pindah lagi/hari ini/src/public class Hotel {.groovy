public class Hotel {
    public static void main(String[] args) {
        // Inisialisasi array 2D: '*' artinya kosong, 'X' artinya terisi
        char[][] kamar = {
            {'*', 'X', '*', '*', '*', '*'},  // Lantai 3
            {'*', '*', '*', '*', '*', '*'},  // Lantai 2
            {'*', '*', 'X', '*', '*', '*'}   // Lantai 1
        };

        System.out.println("=== Denah Kamar Hotel ===");
        for (int i = 0; i < kamar.length; i++) {
            System.out.print("Lantai " + (kamar.length - i) + " : ");
            for (int j = 0; j < kamar[i].length; j++) {
                System.out.print(kamar[i][j] + " ");
            }
            System.out.println();
        }

        System.out.println("\n=== Posisi Tamu ===");
        for (int i = 0; i < kamar.length; i++) {               // Loop lantai
            for (int j = 0; j < kamar[i].length; j++) {        // Loop kamar
                if (kamar[i][j] == 'X') {                      // Jika kamar terisi
                    System.out.println("Tamu berada di Lantai " 
                        + (kamar.length - i) + ", Kamar " + (j + 1));
                }
            }
        }

        // Tambahan: hitung jumlah kamar kosong dan terisi
        int kosong = 0, terisi = 0;
        for (int i = 0; i < kamar.length; i++) {
            for (int j = 0; j < kamar[i].length; j++) {
                if (kamar[i][j] == '*') kosong++;
                else if (kamar[i][j] == 'X') terisi++;
            }
        }

        System.out.println("\nTotal kamar terisi : " + terisi);
        System.out.println("Total kamar kosong  : " + kosong);
    }
}
