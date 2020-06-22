export class DiceSlugger {
    rollDice(maxNumber: string): number {
        let max = Number(maxNumber);
        let randomValue: number = Math.random() * (max - 1) + 1;
        return Math.floor(randomValue);
    }
}