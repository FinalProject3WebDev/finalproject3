export interface CartItem {
    id: number;
    cartId: number;
    productId: number;
    quantity: number;
    price: number;
    createdAt: string;
    updatedAt: string;
    Product: {
      id: number;
      categoryId: number;
      productName: string;
      productDescription: string;
      price: number;
      stock: number;
      productImage: string;
      createdAt: string;
      updatedAt: string;
    };
  }
  
  interface CartResponse {
    message: string;
    cartItems: CartItem[];
    totalPrice: number;
  }
  