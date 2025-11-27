
import java.util.Scanner;

public class Sistem {
public static void main(String[] args) {
    Scanner input = new Scanner(System.in);

    System.out.println("Masukkan Nama :");
    String nama = input.nextLine();

    System.out.println("Masukkan nilai Coding 0 - 100 :");
    int nilai = input.nextInt();
    input.nextLine();

    System.out.println("Masukkan Nilai Interview :");
    String inter = input.nextLine().toUpperCase();

    String h_c = "";
    String h_i = "";


    if (nilai > 80) {
        h_c = "LOLOS";
    } else if (nilai >= 60 && nilai <= 80) {
        h_c = "DIPERTIMBANGKAN";
    } if (nilai >=100) {
        h_c = "Nilai Error";
    } else {
        h_c = "GAGAL";
    }
if (inter.equals("A") || inter.equals("B")) {
    h_i = "LOLOS";
} else {
    h_i = "GAGAL";
}

    if ((h_c.equals("LOLOS") ||
    h_c.equals("DIPERTIMBANGKAN")) &&
    h_i.equals("LOLOS")) {
        System.out.println("Selemat " + nama + " Berhasil Menjadi Calon Programmer" + ".");
    } else {
        System.out.print("Maaf " + nama + " Kamu Belum Berhasil Menjadi Calon Programmer" + ".");
    }
}
}

  
