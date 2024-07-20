const productModel = require('../../src/models/product');
const { getProductById, getProducts, createProduct, updateProduct, deleteProduct } = productModel;
const prisma = require('../../src/lib/db');

prisma.product = {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
};

describe('Product Model', () => {
    describe('getProductById', () => {
        it('should get a product by id', async () => {
            const product = {
                id: 1,
                name: 'Product',
                description: 'Description',
                price: 10,
                quantity: 10,
            };

            prisma.product.findUnique.mockResolvedValue(product);
            const result = await getProductById(product.id);
            expect(result).toEqual(product);
            expect(prisma.product.findUnique).toHaveBeenCalledWith({
                where: { id: product.id },
            });
        });

        it('should throw an error if the product is not found', async () => {
            const id = 1;
            prisma.product.findUnique.mockResolvedValue(null);
            await expect(getProductById(id)).rejects.toThrow('Product not found');
        });

        it('should throw an error if the product id is not provided', async () => {
            await expect(getProductById()).rejects.toThrow('Product id not provided');
        });
    });

    describe('getProducts', () => {
        it('should get products', async () => {
            const filters = {};
            const sort = { name: 'asc' };
            const limit = 10;
            const offset = 0;
            const products = [
                {
                    id: 1,
                    name: 'Product',
                    description: 'Description',
                    price: 10,
                    quantity: 10,
                },
            ];

            prisma.product.findMany.mockResolvedValue(products);
            const result = await getProducts(filters, sort, limit, offset);
            expect(result).toEqual(products);
            expect(prisma.product.findMany).toHaveBeenCalledWith({
                where: filters,
                orderBy: sort,
                take: limit,
                skip: offset,
            });
        });
    });

    describe('createProduct', () => {
        it('should create a product', async () => {
            const product = {
                name: 'Product',
                description: 'Description',
                price: 10,
                quantity: 10,
            };

            prisma.product.create.mockResolvedValue(product);
            const result = await createProduct(product.name, product.description, product.price, product.quantity);
            expect(result).toEqual(product);
            expect(prisma.product.create).toHaveBeenCalledWith({
                data: product,
            });
        });
    });

    describe('updateProduct', () => {
        it('should update a product', async () => {
            const id = 1;
            const product = {
                name: 'Product',
                description: 'Description',
                price: 10,
                quantity: 10,
            };

            prisma.product.update.mockResolvedValue(product);
            const result = await updateProduct(id, product.name, product.description, product.price, product.quantity);
            expect(result).toEqual(product);
            expect(prisma.product.update).toHaveBeenCalledWith({
                where: { id },
                data: product,
            });
        });
    });

    describe('deleteProduct', () => {
        it('should delete a product', async () => {
            const id = 1;
            prisma.product.delete.mockResolvedValue({ id });
            const result = await deleteProduct(id);
            expect(result).toEqual({ id });
            expect(prisma.product.delete).toHaveBeenCalledWith({
                where: { id },
            });
        });
    });
});
