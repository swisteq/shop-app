import { Component, Input, OnInit } from '@angular/core';
import { CartItem } from '../model/cartItem';

@Component({
  selector: 'app-basket-item',
  templateUrl: './basket-item.component.html',
  styleUrls: ['./basket-item.component.css']
})
export class BasketItemComponent implements OnInit {
  displayedColumns: string[] = [
    'productId',
    'count',
  ]

  @Input("cartItems") cartItems: CartItem[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
