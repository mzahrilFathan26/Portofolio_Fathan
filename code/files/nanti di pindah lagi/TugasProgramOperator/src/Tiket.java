
import java.util.Scanner;

public class Tiket {
public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    int jmlAnak,jmlRemaja,jmlDewasa,jmlLansia;
    int hargaAnak = 10000;
    int hargaRemaja = 15000;
    int hargaDewasa = 25000;
    int hargaLansia = 0; 

    int totalAnak = 10000;
    int totalRemaja = 10000;
    int totalDewasa = 10000;
    int totalLansia = 10000;

    int diskon = 0;

    int totalHarga = 0;
    int totalBayar = 0;

    System.out.print(x:"====================================");
    System.out.print("1. Anak-anak (" + hargaAnak + ")");
    System.out.print("1. Remaja (" + hargaRemaja + ")");
    System.out.print("1. Dewasa (" + hargaDewasa + ")");
    System.out.print("1. Lansia (" + hargaLansia + ")");
    System.out.print(x:"====================================");


    System.out.println(s:"Anak-anak :");
    jmlAnak = sc.nextInt();

    totalAnak = jmlAnak * hargaAnak;
    totalLansia = 0;


    totalHarga = totalAnak + totalRemaja + totalDewasa + totalLansia;

    if(totalHarga > 100000){
        diskon = 5;
    }

    totalBayar = totalBayar - ((totalHarga * diskon/100));

    System.out.println(x:"pemesanan tiket anda :");
    System.out.println("Anak-anak :" + jmlAnak + "*" + hargaAnak + "=" totalAnak);
    System.out.println("total harga : " + totalHarga);
    System.out.println("diskon :" + ((totalHarga * diskon/100)));
    System.out.println("total bayar :" + totalBayar);
    
    }
}
