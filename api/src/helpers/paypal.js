const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id:
    "Aalt0tMN3hwSQ3_GPDCMnfmDNHyboO0Q-BNfR3GzRiDKnKWwGfA1svBwQzFYUy6fN-K4zyC0lzm1_0kx",
  client_secret:
    "EEwWhk8e-p_g7A17d_jmqSkugBDKRIjztA-N-h8Cvv68xpzQaTDcVo5pIF2K_fKgdCmHPPgekQEnwcss",
});

module.exports = paypal;
