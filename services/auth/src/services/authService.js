const axios = require('axios');
const bcrypt = require('bcrypt');
const redis = require('redis');
const jwtHelper = require('./util/jwtHelper');

const redisClient = redis.createClient();

const generateUserJWT = (user) => {
  return jwtHelper.generateToken(user);
};

const validateToken = async (token) => {
  const decoded = jwtHelper.verifyToken(token);
  if (!decoded) {
    return null;
  }
  const cachedToken = await getFromCache(decoded.email);
  return cachedToken === token ? decoded : null;
};

const invalidateToken = (token) => {
  const decoded = jwtHelper.verifyToken(token);
  if (decoded) {
    removeToken(decoded.email);
  }
};

const cacheToken = (email, token) => {
  return new Promise((resolve, reject) => {
    redisClient.set(email, token, 'EX', 3600, (err, reply) => {
      if (err) {
        reject(err);
      } else {
        resolve(reply);
      }
    });
  });
};

const removeToken = (email) => {
  return new Promise((resolve, reject) => {
    redisClient.del(email, (err, reply) => {
      if (err) {
        reject(err);
      } else {
        resolve(reply);
      }
    }
  });
};

const getFromCache = (email) => {
  return new Promise((resolve, reject) => {
    redisClient.get(email, (err, reply) => {
      if (err) {
        reject(err);
      } else {
        resolve(reply);
      }
    });
  });
};

module.exports = {
  login,
  generateUserJWT,
  validateToken,
  invalidateToken,
};
