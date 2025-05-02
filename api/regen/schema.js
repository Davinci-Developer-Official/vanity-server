const { sql } = require('@vercel/postgres');

async function createTables() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS profile (
        id SERIAL PRIMARY KEY,
        full_name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        phone_number VARCHAR(20) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS owners (
        id SERIAL PRIMARY KEY,
        profile_id INTEGER NOT NULL REFERENCES profile(id) ON DELETE CASCADE,
        first_name VARCHAR(50),
        middle_name VARCHAR(50),
        last_name VARCHAR(50)
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS business (
        id SERIAL PRIMARY KEY,
        owner_id INTEGER NOT NULL REFERENCES owners(id) ON DELETE CASCADE,
        business_name VARCHAR(100) NOT NULL,
        business_location VARCHAR(100),
        business_type VARCHAR(50),
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;

    console.log(' Tables created successfully.');
  } catch (error) {
    console.error(' Error creating tables:', error);
  }
}

createTables();
