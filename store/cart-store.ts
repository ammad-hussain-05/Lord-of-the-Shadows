import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { MerchProduct } from "@/lib/merch-products"

export type CartItem = {
  cartId: string
  productId: string
  slug: string
  title: string
  character: string
  category: string
  image: string
  price: number
  quantity: number
  selectedSize?: string
  selectedColor?: string
}

type AddToCartPayload = {
  product: MerchProduct
  quantity: number
  selectedSize?: string
  selectedColor?: string
}

type CartStore = {
  items: CartItem[]
  addToCart: (payload: AddToCartPayload) => void
  removeFromCart: (cartId: string) => void
  increaseQuantity: (cartId: string) => void
  decreaseQuantity: (cartId: string) => void
  updateQuantity: (cartId: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getCartTotal: () => number
}

const createCartId = (
  productId: string,
  selectedSize?: string,
  selectedColor?: string
) => {
  return `${productId}-${selectedSize || "no-size"}-${selectedColor || "no-color"}`
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: ({ product, quantity, selectedSize, selectedColor }) => {
        const cartId = createCartId(product.id, selectedSize, selectedColor)

        set((state) => {
          const existingItem = state.items.find((item) => item.cartId === cartId)

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.cartId === cartId
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            }
          }

          const newItem: CartItem = {
            cartId,
            productId: product.id,
            slug: product.slug,
            title: product.title,
            character: product.character,
            category: product.category,
            image: product.image,
            price: product.price,
            quantity,
            selectedSize,
            selectedColor,
          }

          return {
            items: [...state.items, newItem],
          }
        })
      },

      removeFromCart: (cartId) => {
        set((state) => ({
          items: state.items.filter((item) => item.cartId !== cartId),
        }))
      },

      increaseQuantity: (cartId) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.cartId === cartId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        }))
      },

      decreaseQuantity: (cartId) => {
        set((state) => ({
          items: state.items
            .map((item) =>
              item.cartId === cartId
                ? { ...item, quantity: Math.max(1, item.quantity - 1) }
                : item
            ),
        }))
      },

      updateQuantity: (cartId, quantity) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.cartId === cartId
              ? { ...item, quantity: Math.max(1, quantity) }
              : item
          ),
        }))
      },

      clearCart: () => {
        set({ items: [] })
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },

      getCartTotal: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        )
      },
    }),
    {
      name: "lord-of-the-shadows-cart",
    }
  )
)