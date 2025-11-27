//nomor 1

import java.util.Scanner;

public class TugasProgramOperator {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.print("Masukkan nilai angka: ");
        int nilai = input.nextInt();

        String grade = (nilai >= 85 && nilai <= 100) ? "A" :
                       (nilai >= 75 && nilai <= 84)  ? "B" :
                       (nilai >= 65 && nilai <= 74)  ? "C" :
                       (nilai >= 55 && nilai <= 64)  ? "D" : "E";

        System.out.println("Nilai huruf: " + grade);

        input.close();
    }
}













//nomor 2
import java.util.Scanner;

public class OperasiAritmatika {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.print("Masukkan bilangan pertama: ");
        int bil1 = input.nextInt();

        System.out.print("Masukkan bilangan kedua: ");
        int bil2 = input.nextInt();

        System.out.print("Pilih operator (+, -, *, /, %): ");
        char operator = input.next().charAt(0);

        int hasilInt = 0;
        double hasilDouble = 0;
        boolean pakaiDouble = false;

        switch (operator) {
            case '+':
                hasilInt = bil1 + bil2;
                System.out.println("Hasil: " + hasilInt);
                break;
            case '-':
                hasilInt = bil1 - bil2;
                System.out.println("Hasil: " + hasilInt);
                break;
            case '*':
                hasilInt = bil1 * bil2;
                System.out.println("Hasil: " + hasilInt);
                break;
            case '/':
                if (bil2 != 0) {
                    hasilDouble = (double) bil1 / bil2;
                    pakaiDouble = true;
                } else {
                    System.out.println("Error: Jangan dengan nol");
                }
                break;
            case '%':
                if (bil2 != 0) {
                    hasilInt = bil1 % bil2;
                    System.out.println("Hasil Modulus: " + hasilInt);
                } else {
                    System.out.println("Error: Jangan dengan nol");
                }
                break;
            default:
                System.out.println("Operator tidak valid!");
        }

        if (pakaiDouble) {
            System.out.println("Hasil: " + hasilDouble);
        }

        input.close();
    }
}
