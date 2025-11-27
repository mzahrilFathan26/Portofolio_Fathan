
import java.util.Scanner;
import javax.lang.model.util.ElementScanner14;

public class jam{
    public static void main(String[] args) {
        Scanner cs = new Scanner(System.in);

System.out.println("======================PILIH OPERATOR============================");
System.out.println("1. PENJUMLAHAN");
System.out.println("2. PERKALIAN");
System.out.println("3. PEMBAGIAN");
System.out.println("4. PEngurangan");
System.out.println("5. MODULUS");
System.out.println("Masukkan opertaor aritmatika (dengan memilih angka) : ");
int pilihan = cs.nextInt();
cs.nextLine();


System.out.print("masukkan angka ke-1 : ");
int angka1 = cs.nextInt();
cs.nextLine();
System.out.print("masukkan angka ke-2 : ");
int angka2 = cs.nextInt();
cs.nextLine();

if (pilihan == 1) {
    int hasil = angka1 + angka2;
    System.out.println(hasil);

}else if (pilihan == 2){
    int hasil = angka1 * angka2;
    System.out.println(hasil);

}else if (pilihan == 3){
    if(angka2 !=0){
        int hasil = angka1 / angka2;
        System.out.println(hasil);
    }else{
        System.out.println("eroor tidak bisa dibagi dengan 0");
    }
    
}else if (pilihan == 4) {
    int hasil = angka1 - angka1;
    System.out.println(hasil);

}else if (pilihan == 5) {
    int hasil = angka1 % angka2;
    System.out.println(hasil);
}else{
    System.out.println("angka inputt error");
}


    }
}

