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

export class registerdeposits {
    amount: number
    creationdate: Date
    accountId: string
    depositId: string
    trackday: number

    constructor(amount:number, creationdate:Date, accountId:string, depositId: string, trackday: number) {
        this.amount = amount
        this.creationdate = creationdate
        this.accountId = accountId
        this.depositId = depositId
        this.trackday = trackday
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
