export interface Product {
  productId: number;
  shopifyProductId: string;
  ebayItemId: string;
  ebayQuantity: number;
  shopifyQuantity: number;
  title: string;
  ebayPrice: number;
  shopifyPrice: number;
  synced: boolean;
  createdDate: string;
}
