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

  updateAgedBrieQuality(agedBries: Item) {
    if (agedBries.quality < 50) {
      agedBries.quality = agedBries.quality + 1;
    }
    agedBries.sellIn = agedBries.sellIn - 1;
    if (agedBries.sellIn < 0) {
      if (agedBries.quality < 50) {
        agedBries.quality = agedBries.quality + 1;
      }
    }
    return agedBries;
  }

  updateBackstagePassQuality(backstagePass: Item) {
    if (backstagePass.quality < 50) {
      backstagePass.quality = backstagePass.quality + 1;
      if (backstagePass.quality < 50) {
        if (backstagePass.sellIn < 11) {
          backstagePass.quality = backstagePass.quality + 1;
        }
        if (backstagePass.sellIn < 6) {
          backstagePass.quality = backstagePass.quality + 1;
        }
      }
    }
    backstagePass.sellIn = backstagePass.sellIn - 1;
    if (backstagePass.sellIn < 0) {
      backstagePass.quality = 0;
    }

    return backstagePass
  }

  updateMiscItems(item: Item) {
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
          return item;

        default:
          return this.updateMiscItems(item);
      }
    })
  }
}
