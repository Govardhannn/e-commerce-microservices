

auth-services - 4001 

cart- servies - 4003

product -services = 4002

order-servise = 4004

`http://localhost:4003/api/cart

http://localhost:4002/api/products/



  // console.log("Cart Response", cartResponse.data.cart);

    const products = await Promise.all(
      cartResponse.data.cart.items.map(async (item) => {
        return (
          await axios.get(
            `http://localhost:4002/api/products/${item.productId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )
        ).data.data;
      }),
    );
    console.log("Products array:", products.data);