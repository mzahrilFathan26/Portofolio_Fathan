
import java.util.Scanner;

public class PrimaTerdekat {
public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    System.out.println("Carikan Bilangan Prima Setelah Angka:");
    int angka = sc.nextInt();

    boolean isFound = false;
    int hasil = 0;
    
    while(isFound == false){
        angka = angka + 1;
        int faktor= 0;

    for (int i = 1; i <=angka; i++) {
        if (angka % i==0) {
            faktor++;
        } 
    }

    if(faktor==2){
        hasil = angka;
        isFound = true;
    } 
    }

    System.out.println(" Bilangan Prima ditemukan:" + hasil) ;

}
}
