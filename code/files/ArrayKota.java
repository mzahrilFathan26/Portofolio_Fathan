
import java.util.Scanner;

public class ArrayKota {
public static void main(String[] args) {
    String kota [] = {"sukabumi", "jakarta", "surade", "inggris", "purabaya", "sagaranten", "mesir", "kanada", "surakarta"};
Scanner input = new Scanner(System.in);

    System.out.print("Masukan kota berangkat : ");
    String berangkat = input.nextLine();

    System.out.print("Masukkan kota tujuan : ");
    String tujuan = input.nextLine();

    int posisiberangkat = 0, posisiakhir = 0;

    for (int i = 0; i < kota.length; i++) {
        if (kota[i].equals(berangkat)) {
            posisiberangkat = i;
            
        }else if(kota[i].equals(tujuan)){
            posisiakhir = i;
        }


    }
             int harga = (posisiakhir - posisiberangkat) * 7500;
    System.out.println("tarif " + berangkat + " " + tujuan + " adalah " + harga);
}


}


    

