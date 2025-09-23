import { Injectable } from '@angular/core';

export interface CartItem {
    productId: number;
    variantId?: number;
    name: string;
    price: number;
    size: string;
    color: string;
    quantity: number;
    image?: string;
    selected?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private storageKey = 'cart_items';
    private checkoutKey = 'checkout_items';

    private saveCart(items: CartItem[]): void {
        localStorage.setItem(this.storageKey, JSON.stringify(items));
    }

    private loadCart(): CartItem[] {
        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : [];
    }

    getItems(): CartItem[] {
        return this.loadCart();
    }

    addItem(item: CartItem): void {
        const items = this.loadCart();
        const existing = items.find(i => i.productId === item.productId && i.variantId === item.variantId);

        if (existing) {
            existing.quantity += item.quantity;
        } else {
            items.push(item);
        }
        this.saveCart(items);
    }

    updateQuantity(productId: number, variantId: number | undefined, quantity: number): void {
        let items = this.loadCart();
        items = items.map(i => {
            if (i.productId === productId && i.variantId === variantId) {
                i.quantity = quantity;
            }
            return i;
        });
        this.saveCart(items);
    }

    removeItem(productId: number, variantId: number | undefined): void {
        let items = this.loadCart();
        items = items.filter(i => !(i.productId === productId && i.variantId === variantId));
        this.saveCart(items);
    }

    clearCart(): void {
        localStorage.removeItem(this.storageKey);
    }

    getTotal(): number {
        return this.getItems().reduce((sum, item) => sum + item.price * item.quantity, 0);
    }
    setCheckoutItems(items: CartItem[]): void {
        localStorage.setItem(this.checkoutKey, JSON.stringify(items));
    }

    getCheckoutItems(): CartItem[] {
        const data = localStorage.getItem(this.checkoutKey);
        return data ? JSON.parse(data) : [];
    }
}
