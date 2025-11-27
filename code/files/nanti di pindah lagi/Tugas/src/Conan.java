
import java.util.Scanner;

public class Conan {
public static void main(String[] args) {
    Scanner input = new Scanner(System.in);

    System.out.println("Masukkan Nama :");
    String nama = input.nextLine();

    System.out.println("Masukkan Umur :");
    int umur = input.nextInt();
    input.nextLine();

    System.out.println("Masukkan Tempat Tinggal :");
    String tempat = input.nextLine();

    System.out.println("Masukkan Jumlah Tabungan :");
    double tabungan = input.nextDouble();

    String pangkat = "";

    if (umur > 40 && (tempat.equalsIgnoreCase("Nevada") || 
    tempat.equalsIgnoreCase("New York") ||
    tempat.equalsIgnoreCase("Havana")) &&
    tabungan > 10000000) {

        pangkat = "Don";
        
    } else if (umur >= 25 && umur <= 40 && 
    (tempat.equalsIgnoreCase("New Jersey") || 
    tempat.equalsIgnoreCase("Manhattan") || 
    tempat.equalsIgnoreCase("Nevada")) && 
    tabungan >= 1000000 && tabungan <= 2000000) {
        
        pangkat = "Underboss";
        
    } else if (umur >= 18 && umur <= 24 && 
    (tempat.equalsIgnoreCase("California") ||
    tempat.equalsIgnoreCase("Detroit") ||
    tempat.equalsIgnoreCase("Boston")) &&
    tabungan < 1000000) {

        pangkat = "Capo";

    }

    if (!pangkat.isEmpty()) {
        System.out.println(nama + " Kemungkinan Adalah Seorang Anggota Mafia dengan " + pangkat + ".");
    } else {
        System.out.println(nama + " Tidak Mencurigakan" + ".");
    }

    input.close();
}
}