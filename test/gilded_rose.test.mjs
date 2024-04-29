import { describe, test } from "vitest";
import { expect } from "chai";
import { Item, Shop } from "../src/gilded_rose.ts";

describe("Gilded Rose", () => {
  test("foo", () => {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("foo");
  });


  test("Item quality gets lowered by two", () => {
    const gildedRose = new Shop([new Item("foo", 0, 3)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).equal(1);
  });

  test("Item quality gets lowered by three if sell in is negative", () => {
    const gildedRose = new Shop([new Item("foo", -1, 3)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).equal(1);
  });

  test("Item Aged Brie gets quality added by two", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 0, 3)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).equal(5);
  });

  test("If Item is Aged Brie quality stays the same if the item quality more than 50", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 0, 51)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).equal(51);
  });

  test("If Item is Backstage Pass and sell in is 0. Quality resets", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).equal(0);
  });

  test("If Item is Backstage Pass and sell in is 1. Quality increases by 3", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 1, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).equal(4);
  });

  test("If item is Sulfuras, Hand of Ragnaros. Quality stays the same.", () => {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 0, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).equal(1);
  })

  test("If unknown item with quality over 50. Its quality gets lowered by two.", () => {
    const gildedRose = new Shop([new Item("foo", 0, 51)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).equal(49);
  })

  test("If item is Sulfuras, Hand of Ragnaros with quality <0. Sell in stays the same.", () => {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 0, -1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).equal(0);
  })

  test("If unknown item with quality <0. Its quality stays the same.", () => {
    const gildedRose = new Shop([new Item("foo", 0, -1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).equal(-1);
  })

  test("If unknown item with quality 0. Its quality stays the same.", () => {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).equal(0);
  })

  test("If Item is Backstage Pass with quality 50. Quality stays the same 50", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 1, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).equal(50);
  });

  test("If Item is Backstage Pass with quality 49 and Sell in 11. Quality increases by 1.", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 11, 49)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).equal(50);
  });

  test("If Item is Backstage Pass with quality 48 and Sell in 6. Quality increases by 2.", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 6, 48)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).equal(50);
  });

  test("If Item is Backstage Pass Quality 49 and Sell in 1. Quality increases by one.", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 1, 49)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).equal(50);
  });

  test("If unknown item with quality 2. Its quality stays the same.", () => {
    const gildedRose = new Shop([new Item("foo", 0, 2)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).equal(0);
  });


  test("If Item is Aged Brie with quality 49. Quality increases by one.", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 0, 49)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).equal(50);
  });

  test("If Item is Backstage Pass Sell in 11. Quality increases by one.", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 11, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).equal(1);
  });

  test("If Item is Backstage Pass Sell in 6. Quality increases by two.", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 6, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).equal(2);
  });

  test("If item is Sulfuras, Hand of Ragnaros with quality 3 and Sell in <0. Quality stays the same.", () => {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", -1, 3)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).equal(3);
  });

  test("Shop initialized with empty array in constructor", () => {
    const gildedRose = new Shop();
    expect(gildedRose.items).deep.equal([]);
  });

});