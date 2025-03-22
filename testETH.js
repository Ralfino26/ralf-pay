const axios = require("axios");

axios.post("http://localhost:8888/.netlify/functions/cryptoCallback", {
  coin: "eth",
  address_in: "0xDEADBEEF1234567890",
  value_coin: 0.0041,
  value_coin_convert: {
    EUR: "17.24"
  },
  pending: 0
})
  .then(res => console.log("✅ RESPONSE:", res.data))
  .catch(err => console.error("❌ ERROR:", err.response?.data || err.message));
