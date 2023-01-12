# Halaman Dashboard
## Problem
1. User adalah pemilik usaha yang sibuk sehingga hanya melihat laporan keuangan sekali sebulan

2. User menyempatkan waktu hanya 10-30 menit untuk membaca laporan

3. User bukan orang yang paham akuntansi

## Solusi
1. Laporan laba rugi:

- Dihalaman dashboard tampilkan nilai laba bersih, dengan informasi pendapatan kotor dan beban, dengan melihat laba bersih user bisa langsung mengetahui kondisi profit, jika nominalnya positif berarti untung, jika nominalnya negatif berarti rugi. Sehingga pemilik usaha bisa langsung tahu kinerja keuangannya dalam kondisi baik atau buruk.

- Ada tombol untuk melihat detail laba rugi dalam bentuk modal, modal dipilih karena tidak perlu melakukan navigasi ke halaman lain.

- Detail laba rugi dibuat dalam bentuk scontro dengan pembagian segment Pendapatan, Laba Kotor, Laba Bersih, Laba Usaha, Laba Sebelum Beban Pajak, agar user lebih mudah mengetahui besaran nominal dan interaksi antar elemen keuangan di sana, contoh: Laba kotor adalah pengurangan dari pendapatan bersih dengan HPP, atau dirumuskan sbb

> `Laba Kotor = Pendapatan Bersih - HPP`

harapannya semakin lama user makin paham pola perhitungan akuntansinya

- Pada laporan detail, untuk membedakan elemen pendapatan dengan element beban maka nilai dari beban dituliskan dalam tanda kurung.

2. Laporan neraca keuangan:

- Dihalaman dashboard ditampilkan nilai total aktiva dan total passiva, jika aktiva dan pasiva seimbang munculkan pesan "SEIMBANG", jika pasiva lebih besar dari aktiva munculkan pesan "TIDAK SEIMBANG"

- Ada menu untuk melihat detail jika user ingin melihat detail neraca

- Pada detail neraca, tampilan dibuat bertumpuk (stafel) karena kemungkinan akun neraca bisa banyak, akun dibagi atas Aset, Kewajiban, Ekuitas. Untuk Aset diletakkan di kolom debit, Kewajiban dan Ekuitas di kolom kredit.

