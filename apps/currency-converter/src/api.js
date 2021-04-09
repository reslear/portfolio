import axios from "axios";

export async function getExchange(base = "USD") {
  try {
    const { data } = await axios.get(
      `http://api.exchangeratesapi.io/v1/latest?base=${base}&access_key=6a869760ead7263759b3cb09450189cb`
    );
    return data ? { rates: data.rates, base: data.base } : false;
  } catch (error) {
    console.error(error);
  }
}
