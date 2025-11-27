import java.util.Scanner;

public class NomorPunggungSepakBola {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Masukkan nomor punggung pemain (1-100): ");
        int NP = scanner.nextInt();

        if (NP < 1 || NP > 100) {
            System.out.println("Nomor punggung harus antara 1 sampai 100.");
            scanner.close();
        }

    
        StringBuilder posisi = new StringBuilder();

        if (NP % 2 == 0) {
            posisi.append("target attacker");
        }

        if (NP % 2 == 0 && NP >= 50 && NP <= 100) {
            if (posisi.length() > 0) posisi.append(", ");
            posisi.append("berhak dipilih menjadi capten team");
        }

        if (NP % 2 != 0) {
            if (posisi.length() > 0) posisi.append(", ");
            posisi.append("defender");
        }


        if (NP % 2 != 0 && NP > 90) {
            if (posisi.length() > 0) posisi.append(", ");
            posisi.append("Playmaker");
        }

        if (NP % 2 != 0 && NP % 15 == 0) {
            if (posisi.length() > 0) posisi.append(", ");
            posisi.append("keeper");
        }

        if (posisi.length() == 0) {
            System.out.println("Nomor punggung tidak sesuai dengan aturan posisi.");
        } else {
            System.out.println("Posisi pemain dengan nomor punggung " + NP + ": " + posisi.toString());
        }

        scanner.close();
    }
}






    






