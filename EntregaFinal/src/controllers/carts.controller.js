import CartManager from '../dao/db/cart-manager-db.js';
const cartManager = new CartManager();

export const crearCarrito = async (req, res) => {
    try {
        const nuevoCarrito = await cartManager.crearCarrito();
        res.status(201).json(nuevoCarrito);
    } catch (error) {
        console.error('Error al crear un nuevo carrito', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const obtenerCarritos = async (req, res) => {
    try {
        const carritos = await cartManager.obtenerCarritos();
        res.status(200).json(carritos);
    } catch (error) {
        console.error('Error al obtener los carritos', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const obtenerCarritoxID = async (req, res) => {
    const cartId = req.params.cid;
    try {
        const carrito = await cartManager.obtenerCarritoxID(cartId);
        res.json(carrito.products);
    } catch (error) {
        console.error('Error al obtener el carrito', error);
        if (error.message.includes('No existe un carrito')) {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
};

export const vaciarCarrito = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const updatedCart = await cartManager.vaciarCarrito(cartId);
        res.json({
            status: 'success',
            message: 'El carrito fue vaciado',
            updatedCart,
        });
    } catch (error) {
        console.error('Error al vaciar el carrito', error);
        res.status(500).json({
            status: 'error',
            error: 'Error interno del servidor',
        });
    }
};

export const actualizarCarrito = async (req, res) => {
    const cartId = req.params.cid;
    const updatedProducts = req.body;

    try {
        const updatedCart = await cartManager.actualizarCarrito(cartId, updatedProducts);
        res.json(updatedCart);
    } catch (error) {
        console.error('Error al actualizar el carrito', error);
        res.status(500).json({
            status: 'error',
            error: 'Error interno del servidor',
        });
    }
};

export const agregarProductoCarrito = async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity || 1;

    try {
        const actualizarCarrito = await cartManager.agregarProductoCarrito(cartId, productId, quantity);
        res.json({ products: actualizarCarrito.products });
    } catch (error) {
        console.error('Error al agregar producto al carrito', error);
        if (error.message.includes('No existe un carrito')) {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
};

export const eliminarProductoCarrito = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;

        const updatedCart = await cartManager.eliminarProductoCarrito(cartId, productId);

        res.json({
            status: 'success',
            message: 'Producto eliminado del carrito',
            updatedCart,
        });
    } catch (error) {
        console.error('Error al eliminar el producto', error);
        res.status(500).json({
            status: 'error',
            error: 'Error interno del servidor',
        });
    }
};

export const actualizarCantidadProductoCarrito = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const newQuantity = req.body.quantity;

        const updatedCart = await cartManager.actualizarCantidadProductoCarrito(cartId, productId, newQuantity);

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
};