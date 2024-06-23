const axios = require("axios");
const redis = require("redis");

const login = async (email, password) => {
  try {
		const response = await axios.post(`${process.env.USER_SERVICE_URL}/login`, {
			email,
			password,
		});
		const { user, error } = response.data;
		if (error) {
			throw new Error(error);
		}

		return user;
	} catch (error) {
		console.error(error);
		return null;
	}
};


module.exports = {
	login,
};
