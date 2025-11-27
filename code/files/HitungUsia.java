import java.util.Scanner;

public class HitungUsia {
public static void main(String[] args) {
    Scanner input = new Scanner(System.in);
    System.out.println("masukkan tahun sekarang");
    int a = input.nextInt();
    System.out.println("masukkan tahun lahir");
    int b = input.nextInt();
    int z = a-b;

    System.out.println(z);
}
}
