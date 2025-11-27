
import java.util.Scanner;

public class LoopWhile {
public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    boolean jawab = false;


    int bil1, bil2;
    System.out.println("========Operasi Aritmatika========");
    System.out.println("1. Penjumlahan");
    System.out.println("2. Pengurangan");
    System.out.println("==================================");

    do { 
        System.out.println("Input Angka Pilihan: ");
    int pilihan = sc.nextInt();
    System.out.println("Isikan Bilangan 1: ");
    bil1 = sc.nextInt();
    System.out.println("Isikan Bilangan 2: ");
    bil2 = sc.nextInt();

    if (pilihan==1) {
        System.out.println(bil1 + bil2);
    }else if (pilihan==2) {
        System.out.println(bil1 - bil2);
    }

    System.out.println("Apakah Mau Mengulang Program Y/T: ");
    jawab = sc.next()

    } while (jawab.equals(anObject:"Y"));


    
}
}
