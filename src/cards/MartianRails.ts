
import { IActionCard } from "./ICard";
import { IProjectCard } from "./IProjectCard";
import { Tags } from "./Tags";
import { CardType } from "./CardType";
import { Player } from "../Player";
import { Game } from "../Game";

export class MartianRails implements IActionCard, IProjectCard {
    public cost: number = 13;
    public tags: Array<Tags> = [Tags.STEEL];
    public name: string = "Martian Rails";
    public cardType: CardType = CardType.ACTIVE;
    public actionText: string = "Spend 1 energy to gain 1 mega credit for each city tile on mars.";
    public description: string = "Fast and cheap transportation for goods and guys";
    public text: string = "";
    public requirements: undefined;
    public canPlay(): boolean {
        return true;
    }
    public play(_player: Player, _game: Game) {
        return undefined;
    }
    public canAct(player: Player): boolean {
        return player.energy >= 1;
    }
    public action(player: Player, game: Game) {
        player.energy--;
        player.megaCredits += game.getCitiesInPlayOnMars();
        return undefined;
    }
}
