const AGED_BRIE = "Aged Brie";
const BACKSTAGE_PASS = "Backstage passes to a TAFKAL80ETC concert";
const SULFURAS = "Sulfuras, Hand of Ragnaros";
const CONJURED = "Conjured";
export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class Shop {
  items: Array<Item>;

  constructor(items = []) {
    this.items = items;
  }

  private isQualityLessThanMax(quality: number) { return quality < 50 }

  private decreaseSellIn(item: Item) {
    return {...item, sellIn: item.sellIn - 1};
  }

  private increaseItemQuality(item: Item, increaseBy: number = 1) {
    if (this.isQualityLessThanMax(item.quality)) {
      return {...item, quality: item.quality + increaseBy}
    }
    return {...item}
  }

  private updateAgedBrieQuality(agedBries: Item) {
    const decreasedSellIn = this.decreaseSellIn(agedBries);
    const increasedItemQuality = this.increaseItemQuality(decreasedSellIn);

    if (increasedItemQuality.sellIn < 0) {
      return this.increaseItemQuality(increasedItemQuality);
    }

    return increasedItemQuality;
  }

  private updateBackstagePassQuality (pass: Item, increaseBy: number = 1) {
    if (pass.sellIn < 0) {
      return {...pass, quality: 0};
    }
    return this.increaseItemQuality(pass, increaseBy);
  }

  private updateBackstagePass(backstagePass: Item) {
    const decreasedSellIn = this.decreaseSellIn(backstagePass);
    const increasedItemQuality = this.increaseItemQuality(decreasedSellIn);
    if (this.isQualityLessThanMax(increasedItemQuality.quality)) {
      if (backstagePass.sellIn < 6) {
        return this.updateBackstagePassQuality(increasedItemQuality, 2);
      }
      if (backstagePass.sellIn < 11) {
        return this.updateBackstagePassQuality(increasedItemQuality);
      }
    }
    return this.updateBackstagePassQuality(increasedItemQuality, 0);
  }

  private updateItemQuality(item: Item, qualityDegradeAmount: number) {
    const updated = { ...item, sellIn: item.sellIn - 1, quality: item.quality > 0 ? item.quality - qualityDegradeAmount : item.quality };
    return (updated.sellIn < 0 && updated.quality > 0) ? { ...updated, quality: updated.quality - qualityDegradeAmount } : updated
  }
  
  private updateMiscItems(item: Item) {
    return this.updateItemQuality(item, 1);
  }

  private updateConjured(conjured: Item) {
    return this.updateItemQuality(conjured, 2);
  }

  updateQuality() {
    return this.items.map((item) => {
      switch (item.name) {
        case AGED_BRIE:
          return this.updateAgedBrieQuality(item);

        case BACKSTAGE_PASS:
          return this.updateBackstagePass(item);

        case SULFURAS:
          return item; // Do nothing.

        case CONJURED:
          return this.updateConjured(item);

        default:
          return this.updateMiscItems(item);
      }
    })
  }
}
