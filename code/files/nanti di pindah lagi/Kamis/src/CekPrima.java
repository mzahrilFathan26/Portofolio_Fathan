
import java.util.Scanner;

public class CekPrima {
public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    System.out.println("Isikan Bilangan:");
int angka = sc.nextInt();
int faktor = 0;

for (int i = 1; i <= 10; i++) {
    if(angka % i == 0)
    faktor++;
}

if (faktor==2) {
    System.out.println("angka adalah palindrom");
}else{
    System.out.println("angka bukan palindrom");
}
}
}



 