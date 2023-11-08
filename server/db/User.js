import conn from './conn.js';
const { UUID, UUIDV4, STRING, BOOLEAN } = conn.Sequelize;
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const JWT = process.env.JWT;

const User = conn.define('user', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  email: {
    type: STRING,
    allowNull: false,

    validate: {
      notEmpty: true,
      isEmail: true
    }
  },
  username: {
    type: STRING,
    allowNull: false,
    unique: true,

    validate: {
      notEmpty: true
    }
  },
  password: {
    type: STRING,
    allowNull: false,

    validate: {
      notEmpty: true
    }
  },
  emailVerification: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
});

User.addHook('beforeSave', async user => {
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }
});

User.authenticate = async function ({ username, password }) {
  const user = await this.findOne({
    where: {
      username
    }
  });

  if (user && (await bcrypt.compare(password, user.password))) {
    return user.generateToken();
  }

  const error = new Error('bad credentials');
  error.status = 401;
  throw error;
};

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, JWT, { expiresIn: '1d' });
};

User.findByToken = async function (token) {
  try {
    const { id } = jwt.verify(token, process.env.JWT);
    const user = await this.findByPk(id);
    if (user) {
      return user;
    }
    throw 'user not found';
  } catch (err) {
    const error = new Error('bad credentials');
    error.status = 401;
    throw error;
  }
};

export default User;
