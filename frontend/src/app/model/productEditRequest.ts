import { ProductType } from "./productType"

export type ProductEditRequest = {
  title: string | null,
  description: string | null,
  price: number | null,
  categoryName: string | null,
  productType: ProductType | null
}
