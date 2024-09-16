import cron from 'node-cron';
import Token from '../models/Token.js';

const tokenCleaner = () => {
  cron.schedule('0 * * * *', async () => {
    try {
      const result = await Token.deleteMany({ expiresAt: { $lt: new Date() } });
      console.log(`Expired tokens deleted: ${result.deletedCount}`);
    } catch (err) {
      console.error('Error deleting expired tokens:', err);
    }
  })
}

export default tokenCleaner;