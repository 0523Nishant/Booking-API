const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // or use host, user, password, etc. separately
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});


pool.connect((err, client, release) => {
  if (err) {
    return console.error('❌ Database connection error:', err.stack);
  }
  console.log('✅ Database connected successfully');
  release();
});

module.exports = pool;
