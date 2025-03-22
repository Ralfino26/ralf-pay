const axios = require("axios");

axios.post("http://localhost:8888/.netlify/functions/cryptoCallback", {
  coin: "btc",
  address_in: "3DCj4YuqnLEKpThooCsf5FvcANg5PRCSpg",
  value_coin: 0.0001,
  value_coin_convert: {
    EUR: "5.32"
  },
  pending: 0
})
  .then(res => console.log("✅ RESPONSE:", res.data))
  .catch(err => console.error("❌ ERROR:", err.response?.data || err.message));
