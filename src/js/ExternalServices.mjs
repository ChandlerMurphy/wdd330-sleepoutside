const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  let responseJson = res.json();
  if (res.ok) {
    return responseJson;
  } else {
    throw { name: "servicesError", message: responseJson.body };
  }
}

export default class ExternalServices {
  constructor(category) {
    // this.category = category;
    // this.path = `../json/${this.category}.json`;
  }
  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    if (!response.ok) {
      console.error("Failed to fetch data:", response.statusText);
      throw new Error(`Error fetching products for category: ${category}`);
    }
    const data = await convertToJson(response);
    return data.Result;
  }
  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }
  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    return await fetch(`${baseURL}checkout/`, options).then(convertToJson);
  }
}
