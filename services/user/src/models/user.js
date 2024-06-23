const prisma = require("../lib/db");
const bcrypt = require('bcrypt');

const getUserById = async (id) => {
    if (!id) {
        throw new Error('User id not provided');
    }


	const user = await prisma.user.findUnique({
		where: { id },
	});

    if (!user) {
        throw new Error('User not found');
    }

    return user;
};

getUserByEmail = async (email) => {
    if(!email) {
        throw new Error('User email not provided');
    }

    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        throw new Error('User not found');
    }

    return user;
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
    if (!id) {
        throw new Error('User id not provided');
    }

    try {
        return await prisma.user.delete({
            where: { id },
        });
    } catch (error) {
        throw new Error('User not deleted');
    }
}

module.exports = {
	getUserById,
    getUserByEmail,
	createUser,
    updateUser,
    deleteUser,
};
