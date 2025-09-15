"use client"
import React, { createContext, useContext, useEffect, useState } from "react";

type ShopingCartContextProviderPros = {
    children: React.ReactNode
}

type CartItems = {
    id: number,
    qty: number,
};


type TShopingCartContext = {
    cartItems: CartItems[];
    handleIncreaseProductQty: (id: number) => void;
    handleDecreaseProductQty: (id: number) => void;
    getProductQty: (id: number) => number;
    cartTotalQty: number;
    handleRemoveProduct: (id: number) => void;

};

const ShopingCartContext = createContext({} as TShopingCartContext);


export const useShopingCartContext = () => {
    return useContext(ShopingCartContext);
}

// Also export with correct spelling for consumers
export const useShoppingCartContext = () => useContext(ShopingCartContext);

export function ShopingCartContextProvider({ children, }: ShopingCartContextProviderPros) {

    const [cartItems, setCartItems] = useState<CartItems[]>([]);

    const cartTotalQty = cartItems.reduce((totalQty, item) => {
        return totalQty + item.qty
    }, 0)

    const getProductQty = (id: number) => {
        return cartItems.find((item) => item.id == id)?.qty || 0
    }

    const handleIncreaseProductQty = (id: number) => {
        setCartItems((currentItems) => {
            let isNotProductExist = currentItems.find(item => item.id == id) == null

            if (isNotProductExist) {
                return [...currentItems, { id: id, qty: 1 }];
            }

            else {
                return currentItems.map((item) => {
                    if (item.id == id) {
                        return {
                            ...item,
                            qty: item.qty + 1,
                        };
                    } else {
                        return item;
                    }

                });
            }
        });
    };

    const handleDecreaseProductQty = (id: number) => {
        setCartItems((currentItems) => {
            let isLastOne = currentItems.find(item => item.id == id)?.qty == 1

            if (isLastOne) {
                return currentItems.filter(item => item.id != id);
            }
            else {
                return currentItems.map((item) => {
                    if (item.id == id) {
                        return {
                            ...item,
                            qty: item.qty - 1,
                        };
                    }
                    else {
                        return item;
                    }
                })
            }


        });
    };

    const handleRemoveProduct = (id: number) => {
        setCartItems((currentItems) => {
            return currentItems.filter(item => item.id != id);
        });
    };

    // //////////////////////////////////////////////////////local storage

    useEffect(() => {
        // read the same key we write to
        const storedCartItems = localStorage.getItem("cartItems");

        if (storedCartItems) {
            setCartItems(JSON.parse(storedCartItems));
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    // //////////////////////////////////////////////////////

    return (
        <ShopingCartContext.Provider value={{
            cartItems,
            handleIncreaseProductQty,
            getProductQty,
            cartTotalQty,
            handleDecreaseProductQty
            , handleRemoveProduct
        }}>

            {children}

        </ShopingCartContext.Provider>
    );
}

// Also export provider with correct spelling for existing imports
export const ShoppingCartContextProvider = ShopingCartContextProvider;