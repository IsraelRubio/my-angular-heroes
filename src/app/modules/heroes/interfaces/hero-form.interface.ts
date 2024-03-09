import { FormControl } from "@angular/forms"

export interface HeroForm {
    name: FormControl<string | null>
    alias: FormControl<string | null>
    power: FormControl<string | null>
    origin: FormControl<string | null>
    alignment: FormControl<string | null>
    age: FormControl<number | null>
}