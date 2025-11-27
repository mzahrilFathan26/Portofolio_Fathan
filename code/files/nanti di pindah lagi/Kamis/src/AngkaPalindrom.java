import java.util.Scanner;
import javax.swing.plaf.synth.SynthToggleButtonUI;

public class AngkaPalindrom {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Masukkan Angka: ");
        int angka = sc.nextInt();

boolean ketemu = false;
int hasil = 0;

while (ketemu == false) { 
    angka = angka + 1;


    String str = String.valueOf(angka);
    String balik = "";

    for (int i = str.length()- 1; i < 0; i--) {
        balik = balik + str.charAt(i);
    }

    if (str.equals(str)) {
        hasil = angka;
        ketemu = true;
    }
}
    

System.out.println("angka palindrom ditemukan " + angka);
}
}


