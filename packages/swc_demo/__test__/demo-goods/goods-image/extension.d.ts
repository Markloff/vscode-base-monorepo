type ShopInfo = {
  name: string;
  id: number;
};


export default interface ExtensionMetadata {
  data: {
    provide: {
      readonly shopInfo: ShopInfo;
    };
    consume: {
      shopId: number;
      readonly shopName: string;
    };
  };
  event: {
    emit: {
      switchGoods: number[];
    };
    listen: {
      changeShopId: number;
      switchShop: ShopInfo;
    };
  };
  process: {
    define: {
      getShopData: (shopName: string) => string;
    };
    invoke: {
      getShopInfo: (shopName: string) => ShopInfo;
    };
  };
  lambda: {
    provide: {
      formatShopName: (shopName: string) => string;
    };
    consume: {
      getShopInfo: (shopId: number) => ShopInfo;
    };
  };
  properties: {
    shopNameLabel: string;
    shopTitle?: string;
  };
}
