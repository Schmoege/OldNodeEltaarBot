export class DiceSlugger {
    RollDice(maxNumber: number): number {
        let randomValue: number = Math.random() * (maxNumber - 1) + 1;
        return Math.floor(randomValue);
    }
}

// export class DiceResult {
//     public sides: string;
//     public result: number;
    
//     constructor(sides:string, result:number){
//         this.sides = sides;
//         this.result = result;
//     }
// }