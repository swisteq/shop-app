import { ProductType } from "./productType"

export type Product = {
  id: number | null
  title: string,
  description: string,
  price: number,
  categoryName: string,
  productType: ProductType,
  authorId: number
}


