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

  updateAgedBrie(agedBries: Item) {
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

  updateBackstagePass(backstagePass: Item) {
    if (backstagePass.quality < 50) {
      backstagePass.quality = backstagePass.quality + 1;
      if (backstagePass.sellIn < 11) {

      }
    }
  }

  updateQuality() {
    const agedBries = this.items.filter((item) => item.name === "Aged Brie").map((agedBries) => this.updateAgedBrie(agedBries));
    const rest = this.items.filter((item) => item.name !== "Aged Brie");

    for (const item of rest) {

      if (item.name != "Aged Brie" && item.name != "Backstage passes to a TAFKAL80ETC concert") {
        if (item.quality > 0) {
          if (item.name != "Sulfuras, Hand of Ragnaros") {
            item.quality = item.quality - 1;
          }
        }
      } else {
        if (item.quality < 50) {
          item.quality = item.quality + 1;
          if (item.name == "Backstage passes to a TAFKAL80ETC concert") {
            if (item.sellIn < 11) {
              if (item.quality < 50) {
                item.quality = item.quality + 1;
              }
            }
            if (item.sellIn < 6) {
              if (item.quality < 50) {
                item.quality = item.quality + 1;
              }
            }
          }
        }
      }
      if (item.name != "Sulfuras, Hand of Ragnaros") {
        item.sellIn = item.sellIn - 1;
      }
      if (item.sellIn < 0) {
        if (item.name != "Aged Brie") {
          if (item.name != "Backstage passes to a TAFKAL80ETC concert") {
            if (item.quality > 0) {
              if (item.name != "Sulfuras, Hand of Ragnaros") {
                item.quality = item.quality - 1;
              }
            }
          } else {
            item.quality = item.quality - item.quality;
          }
        } else {
          if (item.quality < 50) {
            item.quality = item.quality + 1;
          }
        }
      }
    }

    return [...agedBries, ...rest];
  }
}
