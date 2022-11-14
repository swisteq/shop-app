
// {
//   "content": [
//   ],
//   "pageable": {
//   },
//   "last": false,
//   "first": true,
//   "empty": false
//   "totalElements": 11,
//   "totalPages": 4,
// }
// export type Pageable = {
  // pageNumber: number,
  // pageSize: number
// }

export type PageResponse<T> = {
  content: T[],
  // pageable?: Pageable,
  // last?: boolean,
  // first?: boolean,
  // empty?: boolean,
  totalElements: number,
  // totalPages?: number
}
