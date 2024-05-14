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

  private increaseItemQuality(item: Item) {
    if (this.isQualityLessThanMax(item.quality)) {
      return {...item, quality: item.quality + 1}
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


  private updateBackstagePassQuality(backstagePass: Item) {
    const firstUpdatedQuality = this.isQualityLessThanMax(backstagePass.quality) ? backstagePass.quality + 1 : backstagePass.quality;
    const finalUpdatedSellIn = backstagePass.sellIn - 1;

    if (this.isQualityLessThanMax(firstUpdatedQuality)) {
      if (backstagePass.sellIn < 6) {
        return {...backstagePass, sellIn: finalUpdatedSellIn, quality: finalUpdatedSellIn < 0 ? 0 : firstUpdatedQuality + 2 } 
      }
      if (backstagePass.sellIn < 11) {
        return {...backstagePass, sellIn: finalUpdatedSellIn, quality: finalUpdatedSellIn < 0 ? 0 : firstUpdatedQuality + 1 } 
      }
    }

    return {...backstagePass, sellIn: finalUpdatedSellIn, quality: finalUpdatedSellIn < 0 ? 0: firstUpdatedQuality}
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
          return this.updateBackstagePassQuality(item);

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
