public class LoopFor {
public static void main(String[] args){
    System.out.println("Mencetak 1-10");
    for (int i = 1; i <= 10; i++) {
    System.out.println(i + "");
    }

    System.out.println("");

    System.out.println("Mencetak 10 20 30...100");

    for (int i = 10; i <= 100; i+=10) {
        System.out.println(i + "");
    }
    System.out.println("");
    for (int i = 1; i <= 10; i++) {
        int hasil = i * 10;
        System.out.println(hasil + "");
    }
    System.out.println("");
    System.out.println("Mencetak 10 9 .... 1");
    for (int i = 10; i >= 1; i--) {
        System.out.println(i + "");

    }
    
    System.out.println();
    for (int i = 1; i <= 10; i++) {
        int t = i - 1;
        System.out.println(t + "");        
    }

    System.out.println("");
    System.out.println("Mencetak 1 -2 3 -4");
    for (int i = 1; i <= 10; i++) {
        int a = i;
        if(i%2==0){
            a = a * -1;
        }
        System.out.println(a + "");
    }

    System.out.println("");
    int tanda = 1;
    for (int i = 1; i <= 10; i++) {
        int hasil = tanda * i;
        System.out.println(hasil + "");
        tanda = tanda * -1;
    }
}
}
