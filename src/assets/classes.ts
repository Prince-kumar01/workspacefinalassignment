export class customeraccount {
    id: string
    name: string
    balance: number

    constructor(id: string, name: string, balance:number) {
        this.id = id
        this.name = name
        this.balance = balance
}
}

export class deposits {
    balance: number
    creationdate: Date

    constructor(balance:number, creationdate:Date) {
        this.balance = balance
        this.creationdate = creationdate
    }
}

export class product {
    id: string
    title: string
    description: string
    stock: number
    price: number
    
    constructor(id: string, title: string, description:string, stock: number, price:number) {
        this.id = id
        this.title = title
        this.description = description
        this.stock = stock
        this.price = price
    }
}