export interface Product {
    id: number,
    category: {
        id: number,
        categoryName: string
    },
    productName: string,
    productDescription: string,
    price: number,
    stock: number,
    productImage: string
}
