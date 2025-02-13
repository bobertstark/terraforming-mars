import {Tag} from '../../../common/cards/Tag';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {PreludeCard} from '../prelude/PreludeCard';
import {IPlayer} from '../../IPlayer';
import {IActionCard} from '../ICard';
import {Units} from '../../../common/Units';
import {sum} from '../../../common/utils/utils';
import {AndOptions} from '../../inputs/AndOptions';
import {SelectCard} from '../../inputs/SelectCard';
import {OrOptions} from '../../inputs/OrOptions';
import {SelectOption} from '../../inputs/SelectOption';

export class FocusedOrganization extends PreludeCard implements IActionCard {
  constructor() {
    super({
      name: CardName.FOCUSED_ORGANIZATION,
      tags: [Tag.SPACE],

      behavior: {
        drawCard: 1,
        standardResource: 1,
      },

      metadata: {
        cardNumber: '',
        renderData: CardRenderer.builder((b) => {
          b.action('Discard 1 card and spend 1 standard resource to draw 1 card and gain 1 standard resource', (ab) => {
            ab.cards(1).wild(1).startAction.cards(1).wild(1);
          }).br;
          b.cards(1).wild(1).br;
          b.plainText('Draw 1 card and gain 1 standard resource.');
        }),
      },
    });
  }

  private selectResource(title: string, include: ReadonlyArray<keyof Units>, cb: (key: keyof Units) => undefined): OrOptions {
    const orOptions = new OrOptions();
    for (const key of include) {
      orOptions.options.push(new SelectOption(key, 'Select', () => {
        cb(key);
        return undefined;
      }));
    }

    orOptions.title = title;
    return orOptions;
  }

  public canAct(player: IPlayer): boolean {
    return player.cardsInHand.length > 0 && sum(Units.values(player.stock)) > 0;
  }

  public action(player: IPlayer) {
    const discardableStandardResources = Units.keys.filter((type) => player.stock[type] > 0);
    return new AndOptions(
      () => {
        player.drawCard();
        return this.selectResource('Select resource to gain', Units.keys, (type) => {
          player.stock.add(Units.ResourceMap[type], 1, {log: true});
          return undefined;
        });
      },
      new SelectCard('Select card to discard', 'select', player.cardsInHand, ([card]) => {
        player.discardPlayedCard(card);
        return undefined;
      }),
      this.selectResource('Select resource to discard', discardableStandardResources, (type) => {
        player.stock.deduct(Units.ResourceMap[type], 1, {log: true});
        return undefined;
      }));
  }
}

