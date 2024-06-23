const { createUser, getUserById, getUserByEmail, updateUser, deleteUser } = require('../../src/models/user');
const bcrypt = require('bcrypt');
const prisma = require('../../src/lib/db');

jest.mock('bcrypt');
prisma.user = {
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
};

describe('User Model', () => {
    describe('createUser', () => {
        it('should create a user', async () => {
            const user = {
                first_name: 'John',
                last_name: 'Doe',
                email: 'aaa@aaa.aaa',
                password: 'password',
            };
            const hashedPassword = 'hashedPassword';
            bcrypt.hash.mockResolvedValue(hashedPassword);
            prisma.user.create.mockResolvedValue(user);
            const result = await createUser(user.first_name, user.last_name, user.email, user.password);
            expect(result).toEqual(user);
            expect(prisma.user.create).toHaveBeenCalledWith({
                data: {
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    password: hashedPassword,
                },
            });
        });

        it('should throw an error if the user is not created', async () => {
            const user = {
                first_name: 'John',
                last_name: 'Doe',
                email: null,
                password: 'password',
            };
            bcrypt.hash.mockResolvedValue('hashedPassword');
            prisma.user.create.mockRejectedValue(new Error('User not created'));
            await expect(createUser(user.first_name, user.last_name, user.email, user.password)).rejects.toThrow('User not created');
        });
    });

    describe('getUserById', () => {
        it('should get a user by id', async () => {
            const user = {
                id: 1,
                first_name: 'John',
                last_name: 'Doe',
                email: 'aaa@aaa.aaa'
            };
            prisma.user.findUnique.mockResolvedValue(user);
            const result = await getUserById(user.id);
            expect(result).toEqual(user);
            expect(prisma.user.findUnique).toHaveBeenCalledWith({
                where: { id: user.id },
            });
        });

        it('should throw an error if the user is not found', async () => {
            const id = 1;
            prisma.user.findUnique.mockResolvedValue(null);
            await expect(getUserById(id)).rejects.toThrow('User not found');
        });

        it('should throw an error if the user id is not provided', async () => {
            await expect(getUserById()).rejects.toThrow('User id not provided');
        });

    });

    describe('getUserByEmail', () => {
        it('should get a user by email', async () => {
            const user = {
                id: 1,
                first_name: 'John',
                last_name: 'Doe',
                email: 'aaa@aaa.aaa'
            };
            prisma.user.findUnique.mockResolvedValue(user);
            const result = await getUserByEmail(user.email);
            expect(result).toEqual(user);
            expect(prisma.user.findUnique).toHaveBeenCalledWith({
                where: { email: user.email },
            });
        });

        it('should throw an error if the user is not found', async () => {
            const email = 'aaa@aaa.aaa';
            prisma.user.findUnique.mockResolvedValue(null);
            await expect(getUserByEmail(email)).rejects.toThrow('User not found');
        });

        it('should throw an error if the user email is not provided', async () => {
            await expect(getUserByEmail()).rejects.toThrow('User email not provided');
        });
    });

    describe('updateUser', () => {
        it('should update a user', async () => {
            const user = {
                id: 1,
                first_name: 'John',
                last_name: 'Doe',
                email: 'aaa@aaa.aaa',
                password: 'password',
            };
            const hashedPassword = 'hashedPassword';
            bcrypt.hash.mockResolvedValue(hashedPassword);
            prisma.user.update.mockResolvedValue(user);
            const result = await updateUser(user.id, user.first_name, user.last_name, user.email, user.password);
            expect(result).toEqual(user);
            expect(prisma.user.update).toHaveBeenCalledWith({
                where: { id: user.id },
                data: {
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    password: hashedPassword,
                },
            });
        });

        it('should throw an error if the user is not updated', async () => {
            const user = {
                id: 1,
                first_name: 'John',
                last_name: 'Doe',
                email: 'aaa@aaa.aaa',
                password: 'password',
            };
            bcrypt.hash.mockResolvedValue('hashedPassword');
            prisma.user.update.mockRejectedValue(new Error('User not updated'));
            await expect(updateUser(user.id, user.first_name, user.last_name, user.email, user.password)).rejects.toThrow('User not updated');
        });
    });

    describe('deleteUser', () => {
        it('should delete a user', async () => {
            const id = 1;
            prisma.user.delete.mockResolvedValue({ id });
            const result = await deleteUser(id);
            expect(result).toEqual({ id });
            expect(prisma.user.delete).toHaveBeenCalledWith({
                where: { id },
            });
        });

        it('should throw an error if the user is not deleted', async () => {
            const id = 1;
            prisma.user.delete.mockRejectedValue(new Error('User not deleted'));
            await expect(deleteUser(id)).rejects.toThrow('User not deleted');
        });

        it('should throw an error if the user id is not provided', async () => {
            await expect(deleteUser()).rejects.toThrow('User id not provided');
        });
    });
});
