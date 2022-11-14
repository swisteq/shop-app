import { Component, OnInit } from '@angular/core';
import { CartItem } from '../model/cartItem';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  cartItems: CartItem[] = [
    {count: 5, productId: 1}
  ];

  constructor() { }

  ngOnInit(): void {
    console.log(this.cartItems)
  }

}
