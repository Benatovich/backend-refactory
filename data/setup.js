const fs = require('fs').promises;

module.exports = async (pool) => {
  try {
    const sql = await fs
      .readFile(`${__dirname}/../sql/setup.sql`, { encoding: 'utf-8' });
    pool.query(sql);
    return console.log('✅ Database setup complete!');
  } catch (error) {
    return console.error('❌  Error setting up database:', error.message);
  }
};
