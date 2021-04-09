import axios from "axios";

export async function getExchange(base = "USD") {
  try {
    const { data } = await axios.get(`https://api.openrates.io/latest`, {
      params: {
        base
      }
    });
    return data ? { rates: data.rates, base: data.base } : false;
  } catch (error) {
    console.error(error);
  }
}
