import axios from "axios";

export async function productsData() {
  try {
    const products = await axios.get(
      process.env.REACT_APP_PRODUCT_API
    );
    return products;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
