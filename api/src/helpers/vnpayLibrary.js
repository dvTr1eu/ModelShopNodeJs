class VnPayLibrary {
  constructor() {
    this.requestData = new Map();
    this.responseData = new Map();
  }

  // Add request data
  addRequestData(key, value) {
    if (value) {
      this.requestData.set(key, value);
    }
  }

  // Add response data
  addResponseData(key, value) {
    if (value) {
      this.responseData.set(key, value);
    }
  }

  // Get response data
  getResponseData(key) {
    return this.responseData.get(key) || "";
  }

  // Create request URL
  createRequestUrl(baseUrl, vnpHashSecret) {
    const queryParams = Array.from(this.requestData)
      .sort()
      .filter(([_, value]) => value)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join("&");

    let fullUrl = `${baseUrl}?${queryParams}`;
    let signData = queryParams;
    if (signData.endsWith("&")) {
      signData = signData.slice(0, -1);
    }

    const vnpSecureHash = Utils.hmacSHA512(vnpHashSecret, signData);
    fullUrl += `&vnp_SecureHash=${vnpSecureHash}`;

    return fullUrl;
  }

  // Validate signature
  validateSignature(inputHash, secretKey) {
    const rawResponse = this.getResponseDataString();
    const calculatedHash = Utils.hmacSHA512(secretKey, rawResponse);
    return calculatedHash.toLowerCase() === inputHash.toLowerCase();
  }

  // Get response data string (for validation)
  getResponseDataString() {
    const filteredData = Array.from(this.responseData)
      .filter(
        ([key, _]) => key !== "vnp_SecureHashType" && key !== "vnp_SecureHash"
      )
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join("&");

    return filteredData;
  }
}

class Utils {
  // Generate HMAC-SHA512 hash
  static hmacSHA512(key, inputData) {
    const crypto = require("crypto");
    let hmac = crypto.createHmac("sha512", key);
    // let signed = hmac.update(Buffer.from(sortedParams, "utf-8")).digest("hex");
    return hmac.update(Buffer.from(inputData, "utf-8")).digest("hex");
  }

  // Get client IP address
  static getIpAddress(req) {
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    return ip.includes("::") ? "127.0.0.1" : ip; // Handle IPv6 or local IP
  }
}

// Custom comparator for sorting keys
class VnPayCompare {
  static compare(x, y) {
    if (x === y) return 0;
    if (!x) return -1;
    if (!y) return 1;
    return x.localeCompare(y, "en-US", { sensitivity: "base" });
  }
}

module.exports = {
  VnPayLibrary,
  Utils,
  VnPayCompare,
};

// Example usage:
// const vnPay = new VnPayLibrary();
// vnPay.addRequestData('vnp_Amount', '100000');
// const paymentUrl = vnPay.createRequestUrl('https://example.com', 'your_secret_key');
// console.log(paymentUrl);
