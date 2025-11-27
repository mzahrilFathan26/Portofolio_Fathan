
        for (int i = 0; i < kursi.length; i++) {
            if (kursi[i] == 'L') {
                L++;
            } else if (kursi[i] == 'P') {
                p++;
            }
        }


        for (int i = 0; i < kursi.length - 1; i++) {
            if ((kursi[i] == 'L' && kursi[i + 1] == 'P') || (kursi[i] == 'P' && kursi[i + 1] == 'L')) {
                pasangan++;
                i++; 
            }
        }

        System.out.println("laki-laki: " + L);
        System.out.println("perempuan: " + p);
        System.out.println("pasangan: " + pasangan);