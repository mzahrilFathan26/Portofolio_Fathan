
import java.util.Scanner;

public class Pangkat {
public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);

    System.out.println("Isikan Bilangan:");
    int bilangan = sc.nextInt();
    System.out.println("Isikan Pangkat:");
    int pangkat = sc.nextInt();
    int hasil = 1;
    for (int i = 1; i <=pangkat; i++) {
        hasil = hasil * bilangan;
    }
    System.out.println(bilangan + "^" + pangkat + "=" + hasil);
}
}
