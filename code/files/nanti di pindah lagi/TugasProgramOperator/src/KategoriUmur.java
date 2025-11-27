
import javax.swing.JOptionPane;

public class KategoriUmur {
public static void main(String[] args) {
    String umur = JOptionPane.showInputDialog(message:"");
    string kategori="";
    int i_umur = Integer.parseInt(umur);
    if(i_umur >=0 &&  i_umur <=12){
        kategori = "anak-anak";
    }
     else if(i_umur >=13 && i_umur <=17){
        kategori = "remaja";
    }
    else if(i_umur >=18 && i_umur <=59){
        kategori = "Dewasa";
    }
    else if(i_umur >=60){
        kategori = "lansia";
    }
    else{
        kategori = "kesalahan input";
    }

    JOptionPane.showMessageDialog(parentComponent, null, kategori);
}
}

