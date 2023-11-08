import app from './app.js';
import { syncAndSeed } from './db/index.js';

const init = async () => {
  try {
    if (process.env.SYNC !== 'NO') {
      await syncAndSeed();
    }

    const port = process.env.PORT || 3000;
    const server = app.listen(port, () =>
      console.log(`listening on port ${port}`)
    );
  } catch (err) {
    console.log(err);
  }
};

init();
