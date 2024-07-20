const prisma = require("../lib/db");

const getProductById = async (id) => {
    if (!id) {
        throw new Error('Product id not provided');
    }

    const product = await prisma.product.findUnique({
        where: { id },
    });

    if (!product) {
        throw new Error('Product not found');
    }

    return product;
}

const getProducts = async (filters, sort, limit, offset) => {
    // TODO: Fix this.
    return await prisma.product.findMany({
        where: filters,
        orderBy: sort,
        take: limit,
        skip: offset,
    });
}

const createProduct = async (name, description, price, quantity) => {
    return await prisma.product.create({
        data: {
            name,
            description,
            price,
            quantity,
        },
    });
}

const updateProduct = async (id, name, description, price, quantity) => {
    return await prisma.product.update({
        where: { id },
        data: {
            name,
            description,
            price,
            quantity,
        },
    });
}

const deleteProduct = async (id) => {
    return await prisma.product.delete({
        where: { id },
    });
}

module.exports = {
    getProductById,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
};
