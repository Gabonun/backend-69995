class productDto {
    constructor(product) {
      this.id = product._id;
      this.name = product.name;
      this.description = product.description;
      this.code = product.code;
      this.price = product.price;
      this.status = product.status;
      this.stock = product.stock;
      this.category = product.category;
      this.thumbnails = product.thumbnails;
    }
  }
  
  export default productDto;