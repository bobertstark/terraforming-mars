
import { IProjectCard } from "./IProjectCard";
import { Tags } from "./Tags";
import { CardType } from "./CardType";
import { Player } from "../Player";
import { Game } from "../Game";

export class NitrophilicMoss implements IProjectCard {
    public cost: number = 8;
    public tags: Array<Tags> = [Tags.PLANT];
    public cardType: CardType = CardType.AUTOMATED;
    public name: string = "Nitrophilic Moss";
    public text: string = "Requires 3 ocean tiles and that you lose 2 plants. Increase your plant production 2 steps.";
    public requirements: string = "3 Oceans 2 Plants";
    public description: string = "Specially made to thrive on the salty Martian rock.";
    public canPlay(player: Player, game: Game): boolean {
        return game.getOceansOnBoard() >= 3 - player.getRequirementsBonus(game) && player.plants >= 2;
    }
    public play(player: Player) {
        player.plants -= 2;
        player.plantProduction += 2;
        return undefined;
    }
}
