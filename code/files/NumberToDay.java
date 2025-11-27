
import java.util.Scanner;

public class NumberToDay {
public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    System.out.println("=====Pemilu 2024=====");
    System.out.println("1. Anis Baswedan");
    System.out.println("2. Prabowo Subianto");
    System.out.println("3. Ganjar Pranowo");
    System.out.println("=====================");

    System.out.println("Tentukan Nomor Pilihanmu : ");
    int vote = sc.nextInt();
    String pilihan="";
    String Partai="";
    switch (vote) {
        case 1:
            pilihan = "anis baswedan";
            Partai = "pkb nasdem";
            System.out.println("Selamat anda memilih " + pilihan + " " +Partai);
            break;
        case 2:
            pilihan = "Prabowo Subianto";
            Partai = "Gerindra";
            System.out.println("Selamat anda memilih " + pilihan + " " +Partai);
                        break;
        case 3:
            pilihan = "Ganjar Pranowo";
            Partai = "pkbm";
            System.out.println("Selamat anda memilih " + pilihan + " " +Partai);
        default:
            pilihan = "Golput";
            System.out.println("Selamat anda memilih " + pilihan);
    }

    System.out.println("");

}
}
