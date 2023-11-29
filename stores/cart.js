import { create } from "zustand";

const useUserCartStore = create((set, get) => ({
    items: [],
    setItems: (value) => set({ items: value }),
    quantity: () => get().items.length,
    reloadItems: async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/carts/user/${process.env.NEXT_PUBLIC_USERID}`)
        const json = await response.json()
        set({ items: json })
    }
}))

export {
    useUserCartStore
}