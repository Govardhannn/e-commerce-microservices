import Cart from "../models/cart.model.js";

// ✅ GET CART
export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [],
      });
    }

    res.status(200).json({
      cart,
      totals: {
        itemCount: cart.items.length,
        totalQuantity: cart.items.reduce((sum, item) => sum + item.quantity, 0),
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch cart",
      error: error.message,
    });
  }
};

// ✅ ADD ITEM
export const addItemToCart = async (req, res) => {
  try {
    const { productId, qty } = req.body;
    const userId = req.user.id;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [],
      });
    }

    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId,
    );

    if (existingItemIndex >= 0) {
      cart.items[existingItemIndex].quantity += qty;
    } else {
      cart.items.push({
        productId,
        quantity: qty,
      });
    }

    await cart.save();

    res.status(200).json({
      message: "Item added to cart",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add item",
      error: error.message,
    });
  }
};

// ✅ UPDATE QUANTITY
export const updateItemQuantity = async (req, res) => {
  try {
    const { productId } = req.params;
    const { qty } = req.body;
    const userId = req.user.id;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId,
    );

    if (existingItemIndex < 0) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    cart.items[existingItemIndex].quantity = qty;

    await cart.save();

    res.status(200).json({
      message: "Item updated",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update item",
      error: error.message,
    });
  }
};
