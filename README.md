# StudyPlanner (UAS Pengganti)

Aplikasi web Node.js (Express + EJS) untuk:
- CRUD Tugas (judul, mata kuliah, deadline, estimasi jam, kesulitan)
- Catat sesi belajar per tugas
- Hitung prioritas otomatis (algoritma matematis: normalisasi + bobot + moving average trend)

## Syarat tugas yang terpenuhi
- OOP: Strategy Pattern (PriorityStrategy + turunan)
- Inheritance/Polymorphism: override computePriority()
- Async/Await: query DB (Sequelize) + file CRUD export JSON
- Frontend: EJS + Bootstrap + custom CSS

## Cara jalanin
```bash
npm install
npm run dev
```

Buka: http://localhost:3000
