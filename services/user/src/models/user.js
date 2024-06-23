const prisma = require("../lib/db");
const bcrypt = require('bcrypt');

const getUserById = async (id) => {
	return await prisma.user.findUnique({
		where: { id },
	});
};

getUserByEmail = async (email) => {
    return await prisma.user.findUnique({
        where: { email },
    });
}

const createUser = async (firstName, lastName, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
	return await prisma.user.create({
		data: {
			first_name: firstName,
			last_name: lastName,
			email,
			password: hashedPassword,
		},
	});
};

const updateUser = async (id, firstName, lastName, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await prisma.user.update({
        where: { id },
        data: {
            first_name: firstName,
            last_name: lastName,
            email,
            password: hashedPassword,
        },
    });
}

const deleteUser = async (id) => {
    return await prisma.user.delete({
        where: { id },
    });
}

module.exports = {
	getUserById,
    getUserByEmail,
	createUser,
    updateUser,
    deleteUser,
};
