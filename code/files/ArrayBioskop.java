public class ArrayBioskop {
    public static void main(String[] args) {
        char kursi[] = {'L', 'P', 'L', 'L', 'P', 'P', 'P', 'L', 'L'};

        int L = 0;
        int p = 0;
        int pasangan = 0;
        
for(int i = 0; i <kursi.length; i++){
    if (kursi[i] == 'L'){
        L++;
    }else if(kursi[i] == 'P'){
        p++;
    }
}
for (int i = 0; i < kursi.length -1; i++) {
    if (kursi[i] != kursi[i+1]){
        pasangan++;
    }
    }
    System.out.println("Laki laki = " + L);
    System.out.println("Perempuan = " + p );
    System.out.println("Pasangan = " + pasangan);
}
 }

