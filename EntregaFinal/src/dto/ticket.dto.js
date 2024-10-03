class ticketDto {
    constructor(ticket, productsPurchased, productsOutOfStock) {
      this.code = ticket.code;
      this.purchase_datetime = ticket.purchase_datetime;
      this.amount = ticket.amount;
      this.purchaser = ticket.purchaser;
      this.productsPurchased = productsPurchased.map(item => ({
        title: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
      }));
      this.productsOutOfStock = productsOutOfStock.map(item => ({
        title: item.product.name,
        quantityUnavailable: item.quantityUnavailable,
      }));
    }
  }
  
  export default ticketDto;
  