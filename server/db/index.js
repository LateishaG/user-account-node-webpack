import conn from './conn.js';
import User from './User.js';

export const syncAndSeed = async () => {
  await conn.sync({ force: true });
  const moe = await User.create({
    username: 'moe',
    password: '123',
    email: 'test@example.com',
    emailVerification: true
  });
  const lucy = await User.create({
    username: 'lucy',
    password: '123',
    email: 'test@example.com',
    emailVerification: true
  });
  const larry = await User.create({
    username: 'larry',
    password: '123',
    email: 'test@example.com',
    emailVerification: true
  });
  const ethyl = await User.create({
    username: 'ethyl',
    password: '123',
    email: 'test@example.com',
    emailVerification: true
  });

  return {
    users: { moe, lucy, larry, ethyl }
  };
};

export { User };
