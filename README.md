NAMA ANGGOTA TIM
Daffa Pratama Yusuf(2510312035)
Erina Yuantika(2510312036)
Malika Balqis(2510312118)


# **EDUPLAN**

*(Aplikasi Web – UAS Pengganti)*

Eduplan adalah aplikasi web berbasis **Node.js** yang dikembangkan untuk membantu pengguna dalam mengatur dan memprioritaskan tugas belajar secara lebih terstruktur. Aplikasi ini dibuat sebagai proyek **UAS pengganti** dengan menerapkan konsep pemrograman web dan pemrograman berorientasi objek (OOP).

Aplikasi Eduplan memungkinkan pengguna untuk mengelola data tugas belajar, mencatat sesi belajar, serta menentukan prioritas tugas secara otomatis berdasarkan perhitungan tertentu.

---

## **Fitur Utama Aplikasi**

Aplikasi ini menyediakan fitur pengelolaan tugas (CRUD) yang meliputi penambahan, pengubahan, penghapusan, dan penampilan data tugas. Setiap tugas memiliki informasi berupa judul tugas, mata kuliah, batas waktu pengerjaan, estimasi waktu belajar, serta tingkat kesulitan. Selain itu, pengguna juga dapat mencatat sesi belajar untuk setiap tugas guna memantau progres belajar.

Eduplan juga dilengkapi dengan fitur **perhitungan prioritas tugas secara otomatis**. Perhitungan ini menggunakan pendekatan algoritma matematis yang melibatkan proses normalisasi data, pemberian bobot, serta perhitungan tren menggunakan moving average, sehingga pengguna dapat mengetahui tugas mana yang sebaiknya dikerjakan terlebih dahulu.

---

## **Penerapan Konsep dan Teknologi**

Dalam pengembangannya, Eduplan menerapkan konsep **Object-Oriented Programming (OOP)**, khususnya **Strategy Pattern** untuk pengelolaan perhitungan prioritas tugas. Konsep inheritance dan polymorphism digunakan dengan melakukan override method `computePriority()` pada setiap strategi prioritas yang diterapkan.

Aplikasi ini juga menggunakan **asynchronous programming** dengan `async/await` untuk pengolahan data, baik saat berinteraksi dengan database menggunakan **Sequelize** maupun saat melakukan ekspor data tugas ke dalam format JSON.

Pada sisi tampilan, Eduplan dibangun menggunakan **EJS** sebagai template engine, **Bootstrap** untuk mempercepat pembuatan antarmuka, serta **custom CSS** untuk menyesuaikan tampilan agar lebih rapi dan nyaman digunakan.

---

## **Cara Menjalankan Aplikasi**

Untuk menjalankan aplikasi Eduplan di lingkungan lokal, langkah yang perlu dilakukan adalah sebagai berikut:

```bash
npm install
npm run dev
```
http://localhost:3000/




Buka: http://localhost:3000
