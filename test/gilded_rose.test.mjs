import { describe, test } from "vitest";
import { expect } from "chai";
import { Item, Shop } from "../src/gilded_rose.mjs";

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

});