import { ProductType } from "./productType"

export type ProductRequest = {
  title: string,
  description: string,
  price: number,
  categoryName: string,
  productType: ProductType,
  authorId: number
}
