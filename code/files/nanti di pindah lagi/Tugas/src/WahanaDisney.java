import java.util.Scanner;

public class WahanaDisney  {                     
        public static String hitungTarif (int umur, double tinggi) {
            if (umur < 1) {
                return "Dilarang Masuk";
            } else if (umur <= 3) {
                int tarif = 30000;
                if (umur > 2 && umur <= 3 && tinggi > 70) {
                    tarif += 10000;

                 }return String.format("Rp. %d", tarif);
                 } else if (umur <= 7) {
                    int tarif = 40000;
                    if (umur > 4 && umur <= 7 && tinggi > 120) {
                        tarif += 15000;                    
                    }
                    
                    return String.format("Rp. %d", tarif);

                    } else if (umur <= 10) {
                        int tarif = 50000;
                        if (umur > 8 && umur <= 10 && tinggi > 150) {
                            tarif += 20000;
                        }
                        return String.format("Rp. %d", tarif);
                    } else { 
                        return String.format( "Rp. %d", 80000);
                    
                    }
                }
                  public static void main(String[] args) {
                    Scanner scanner = new Scanner(System.in);
                    System.out.println("================================");
                    System.out.print("Masukan Umur Anak (TAHUN): ");
                    int umur = scanner.nextInt();      
                    System.out.print("Masukan Tinggi Anak (CM): ");
                    double tinggi = scanner.nextDouble();

                    String hasil = hitungTarif(umur, tinggi);
                    System.out.printf("Tarif Masuk Umur %d Tahun dan Tinggi %.1f cm adalah %s%n", umur, tinggi, hasil); 
                    System.out.println("================================");
                    scanner.close();

        
    }
}
        