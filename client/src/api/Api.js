import axios from "axios";

export async function productsData() {
  try {
    const products = await axios.get(
      "https://fakestoreapiserver.reactbd.com/walmart"
    );
    return products;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
