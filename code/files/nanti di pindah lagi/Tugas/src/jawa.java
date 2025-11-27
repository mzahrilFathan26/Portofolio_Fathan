import java.util.Scanner;

public class PenjualanKafe {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        // Scanner input = new Scanner(System.in); // Asumsi 'input' di sini adalah 'scanner'

        // 1. Meminta input user
        System.out.print("Jumlah kopi terjual: ");
        int intKopi = scanner.nextInt(); // 1
        
        System.out.print("Jumlah teh terjual: ");
        int intTeh = scanner.nextInt(); // 2
        
        System.out.print("Jumlah jus terjual: ");
        int intJus = scanner.nextInt(); // 3
        
        // 2. Menentukan Minuman Terlaris
        int maxPenjualan = Math.max(intKopi, Math.max(intTeh, intJus)); // 4

        // Penentuan string 'minuman' (terlaris)
        String minuman = ""; 
        if (intKopi == maxPenjualan) { // 5 (Cek apakah Kopi terlaris)
            minuman = "Kopi"; // 6
        } 
        else if (intTeh == maxPenjualan) { // 7
            minuman = "Teh"; // 8
        }
        else { // 9 (Jika bukan Kopi atau Teh, pasti Jus yang terlaris, atau salah satu dari yang lain jika ada nilai yang sama)
            minuman = "Jus";
        }
        
        // Menentukan Total Penjualan
        int total = intKopi + intTeh + intJus; // 10
        
        System.out.println("\nMinuman terlaris hari ini: " + minuman);
        System.out.println("Total penjualan hari ini: " + total);

        // 3. Menampilkan Kategori Minuman Terlaris menggunakan switch
        // switch (minuman) { // 11
        //     case "Kopi": // 12
        //         System.out.println("Kategori: Minuman panas");
        //         break;
        //     case "Teh": // 13
        //         System.out.println("Kategori: Minuman sehat");
        //         break;
        //     case "Jus": // 14
        //         System.out.println("Kategori: Minuman buah");
        //         break;
        // }
    }
}