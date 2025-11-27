
import java.util.Scanner;

public class palindrom{
    public static void main(String[] args){
       Scanner input = new Scanner(System.in);
        
        System.out.print("Masukkan Kata : ");
        String kata = input.nextLine();
        
        kata = kata.toLowerCase();

        String balikkata = new StringBuilder(kata).reverse().toString();

        if (kata.equals(balikkata)) {
            System.out.println("maka kata " + kata + " adalah palindrom ");
            
        }else{
            System.out.println("maka kata " + kata + " adalah bukan palindrom");
        }
    }
}