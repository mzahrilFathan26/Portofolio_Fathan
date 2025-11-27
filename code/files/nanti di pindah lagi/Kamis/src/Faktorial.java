import java.util.Scanner;

public class Faktorial {
    public static void main(String[] args) {
        Scanner fn = new Scanner(System.in);
        System.out.print("Isikan Angka: ");
        int angka = fn.nextInt();
        int hasil = 1;

        for (int i = 2; i <= angka; i++) {
            hasil = hasil * i;
        }

        System.out.println(angka + "! = " + hasil);
    }
}
