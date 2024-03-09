export interface Hero {
    id: number
    name: string
    alias: string
    power: string
    origin: string
    alignment: string
    age: number
}

export interface CreateHero {
    name: string
    alias: string
    origin: string
    alignment: string
    power: string
    age: number
}

export interface UpdateHero extends CreateHero {
    id: number
}