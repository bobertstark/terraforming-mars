import {IProjectCard} from './IProjectCard';
import {Tags} from './Tags';
import {CardType} from './CardType';
import {Player} from '../Player';
import {OrOptions} from '../inputs/OrOptions';
import {SelectOption} from '../inputs/SelectOption';

export class ArtificialPhotosynthesis implements IProjectCard {
    public cost: number = 12;
    public nonNegativeVPIcon: boolean = true;
    public tags: Array<Tags> = [Tags.SCIENCE];
    public cardType: CardType = CardType.AUTOMATED;
    public name: string = 'Artficial Photosynthesis';
    public text: string = 'Increase your plant production 1 step or your' +
      ' energy production 2 steps.';
    public requirements: undefined;
    public description: string = 'Artificial photosynthesis was achieved ' +
      'chemically by prof Akermark et. al. in 2021. Its application to ' +
      'terraforming remains to be seen.';
    public canPlay(): boolean {
      return true;
    }
    public play(player: Player) {
      return new OrOptions(
          new SelectOption('Increase your plant production 1 step', () => {
            player.plantProduction++;
            return undefined;
          }),
          new SelectOption('Increase your energy production 2 steps', () => {
            player.energyProduction += 2;
            return undefined;
          })
      );
    }
}
