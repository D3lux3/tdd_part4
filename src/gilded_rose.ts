const AGED_BRIE = "Aged Brie";
const BACKSTAGE_PASS = "Backstage passes to a TAFKAL80ETC concert";
const SULFURAS = "Sulfuras, Hand of Ragnaros";

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

  private isQualityLess(quality) { return quality < 50 }

  private updateAgedBrieQuality(agedBries: Item) {
    const firstUpdate = { ...agedBries, sellIn: agedBries.sellIn - 1, quality: this.isQualityLess(agedBries.quality) ? agedBries.quality + 1 : agedBries.quality }
    if (firstUpdate.sellIn < 0 && this.isQualityLess(firstUpdate.quality)) {
      return { ...firstUpdate, quality: firstUpdate.quality + 1 };
    }
    return firstUpdate;
  }


  private updateBackstagePassQuality(backstagePass: Item) {
    const firstUpdatedQuality = this.isQualityLess(backstagePass.quality) ? backstagePass.quality + 1 : backstagePass.quality;
    const finalUpdatedSellIn = backstagePass.sellIn - 1;

    if (this.isQualityLess(firstUpdatedQuality)) {
      if (backstagePass.sellIn < 6) {
        return {...backstagePass, sellIn: finalUpdatedSellIn, quality: finalUpdatedSellIn < 0 ? 0 : firstUpdatedQuality + 2 } 
      }
      if (backstagePass.sellIn < 11) {
        return {...backstagePass, sellIn: finalUpdatedSellIn, quality: finalUpdatedSellIn < 0 ? 0 : firstUpdatedQuality + 1 } 
      }
    }
    
    return {...backstagePass, sellIn: finalUpdatedSellIn, quality: finalUpdatedSellIn < 0 ? 0: firstUpdatedQuality}
  }

  private updateMiscItems(item: Item) {
    const updated = { ...item, sellIn: item.sellIn - 1, quality: item.quality > 0 ? item.quality - 1 : item.quality };
    return (updated.sellIn < 0 && updated.quality > 0) ? { ...updated, quality: updated.quality - 1 } : updated
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

        default:
          return this.updateMiscItems(item);
      }
    })
  }
}
