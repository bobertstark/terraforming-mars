
import { IProjectCard } from "./IProjectCard";
import { Tags } from "./Tags";
import { CardType } from "./CardType";
import { Player } from "../Player";
import { Game } from "../Game";

export class Zeppelins implements IProjectCard {
    public cost: number = 13;
    public nonNegativeVPIcon: boolean = true;
    public tags: Array<Tags> = [];
    public cardType: CardType = CardType.AUTOMATED;
    public name: string = "Zeppelins";
    public text: string = "Requires 5% oxygen. Increase your mega credit production 1 step for each city tile on mars. Gain 1 victory point.";
    public description: string = "A relatively cheap way to travel between cities across the planet.";
    public requirements: string = "5% Oxygen";
    public canPlay(player: Player, game: Game): boolean {
        return game.getOxygenLevel() >= 5 - player.getRequirementsBonus(game);
    }
    public play(player: Player, game: Game) {
        player.megaCreditProduction += game.getCitiesInPlayOnMars();
        player.victoryPoints++;
        return undefined; 
    }
}

