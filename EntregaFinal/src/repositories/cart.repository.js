import CartDao from "../dao/models/cart.dao.js";

class CartRepository {
    async createcart() {
        return await CartDao.create();
    }
}

export default new CartRepository();