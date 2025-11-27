
import java.lang.reflect.Array;

public class ArrayNilai {
public static void main(String[] args) {
    //deklarasi array dengan ukuran tertentu

    int nilaiSiswa [] = new int[5];

    nilaiSiswa [0] = 100;
    nilaiSiswa [1] = 95;
    nilaiSiswa [2] = 68;
    nilaiSiswa [3] = 71;
    nilaiSiswa [4] = 100;
    //nilaiSiswa [5] = 80;= => index outofbounds


    //output array
    /* 
    System.out.println(nilaiSiswa[0]);
    System.out.println(nilaiSiswa[1]);
    System.out.println(nilaiSiswa[2]);
    System.out.println(nilaiSiswa[3]);
    System.out.println(nilaiSiswa[4]);
*/

// hitung rata rata


/* 
    for (int i = 0; i < nilaiSiswa.length; i++) {
        System.out.println(nilaiSiswa[i]);
    }
    */

int total = 0;
        for (int i = 0; i < nilaiSiswa.length; i++) {
        total = total + nilaiSiswa[i];
        System.out.println(nilaiSiswa[i]);
    }

    double rata2 = (double)total / nilaiSiswa.length;

    System.out.println("rata rata siswa : " + rata2);

}

}
