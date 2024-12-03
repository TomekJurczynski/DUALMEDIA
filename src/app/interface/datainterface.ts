export interface DataInterface {
    id: string,
    productImageUrl: string,
    productName: string,
    // seller: string,
    // price: string,
    seller: {name: string},
    price: {    
        amount: number,
        currency: string,
    },
    name: string,
    amount: string,
    activeStockNumber: string,
    popularityValue: string,
    isPreorder: string,
    type: string,
}
