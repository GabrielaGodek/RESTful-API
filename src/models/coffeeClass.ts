class Coffee {
    constructor(public id: number, public name: string, public description: string, public price: number, public salePrice: number, public image: string) {
        return { id,  name,  description,  price,  salePrice,  image}
    }
}

export default Coffee