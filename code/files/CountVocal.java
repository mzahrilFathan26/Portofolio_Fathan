
import java.util.stream.Stream;

public class CountVocal {
public static void main(String[] args) {
    // Menghitung Sebuah Kalimat

    String kalimat = "aku harus bisa ngoding demi orangtuaku karena biaya pendidikan itu tidak murah, maka saya harus bisa ngoding untuk membuat orangtua saya tidak menyesal sudah menguliahkan saya";

int totalA = 0;
int panjang = kalimat.length(); 

for (int i = 0; i < panjang; i++) {
    char huruf = kalimat.charAt(i);
    if (huruf == 'A' || huruf == 'a') {
    totalA++;
    }
}
System.out.println("total huruf a " + totalA);
}
}
