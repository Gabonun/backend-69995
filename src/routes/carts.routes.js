import express from 'express';
const router = express.Router();
import CartManager from '../dao/db/cartManagerDb.js';
const cartManager = new CartManager();

//POST -> CREAR CARRITO
router.post('/', async (req, res) => {
    try {
        const newCart = await cartManager.createCart();
        res.status(201).json(newCart);
    } catch (error) {
        console.error('Error al crear un nuevo carrito', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

//GET -> LISTAR TODOS LOS CARRITOS
router.get('', async (req, res) => {
    try {
        const carts = await cartManager.getAllCarts();
        res.status(200).json(carts);
    } catch (error) {
        console.error('Error al obtener los carritos', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

//GET --> LISTAR PRODUCTOS DEL CARRITO x ID
router.get('/:cid', async (req, res) => {
    const cartId = req.params.cid;
    try {
        const cart = await cartManager.getCartById(cartId);
        res.json(cart.products);
    } catch (error) {
        console.error('Error al obtener el carrito', error);
        if (error.message.includes('No existe un carrito')) {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
});

// Método DELETE para eliminar un carrito por ID
router.delete('/api/carts/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        
        const updatedCart = await cartManager.emptyCart(cartId);
        res.json({
            status: 'success',
            message: 'Todos los productos del carrito fueron eliminados correctamente',
            updatedCart,
        });
    } catch (error) {
        console.error('Error al vaciar el carrito', error);
        res.status(500).json({
            status: 'error',
            error: 'Error interno del servidor',
        });
    }
});

// Método PUT para actualizar un carrito por ID
router.put('/api/carts/:cid', async (req, res) => {
    const cartId = req.params.cid;
    const updatedProducts = req.body;

    try {
        const updatedCart = await cartManager.updateCart(cartId, updatedProducts);
        res.json(updatedCart);
    } catch (error) {
        console.error('Error al actualizar el carrito', error);
        res.status(500).json({
            status: 'error',
            error: 'Error interno del servidor',
        });
    }
});

//POST --> AGREGAR PRODUCTOS AL CARRITO
router.post(':cid/product/:pid', async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity || 1;

    try {
        const actualizarCarrito = await cartManager.addProductToCart(cartId, productId, quantity);
        res.json({ products: actualizarCarrito.products });
    } catch (error) {
        console.error('Error al agregar producto al carrito', error);
        if (error.message.includes('No existe un carrito')) {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
});

//DELETE --> ELIMINAR UN PRODUCTO POR ID
router.delete('/:cid/product/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;

        const updatedCart = await cartManager.removeProductFromCart(cartId, productId);

        res.json({
            status: 'success',
            message: 'Producto eliminado del carrito correctamente',
            updatedCart,
        });
    } catch (error) {
        console.error('Error al eliminar el producto del carrito', error);
        res.status(500).json({
            status: 'error',
            error: 'Error interno del servidor',
        });
    }
});

//PUT --> ACTUALIZAR CANTIDAD DE PRODUCTO EN CARRITO
router.put(':cid/product/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const newQuantity = req.body.quantity;

        const updatedCart = await cartManager.updateProductQuantity(cartId, productId, newQuantity);

        res.json({
            status: 'success',
            message: 'Cantidad del producto actualizada correctamente',
            updatedCart,
        });
    } catch (error) {
        console.error('Error al actualizar la cantidad del producto en el carrito', error);
        res.status(500).json({
            status: 'error',
            error: 'Error interno del servidor',
        });
    }
});

export default router;
