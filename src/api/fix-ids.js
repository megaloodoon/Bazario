const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'db.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

db.Products = db.Products
  .sort((a, b) => Number(a.id) - Number(b.id))
  .map((item, idx) => ({
    ...item,
    id: (idx + 1).toString()
  }));

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log('Products ids sorted and renumbered!'); 