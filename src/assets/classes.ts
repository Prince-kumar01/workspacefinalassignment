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

export class products {
    id: string
    title: string
    description: string
    stock: number
    price: number
    }

