const config = require("config");
const moment = require("moment");
const { VnPayLibrary, Utils } = require("../helpers/vnpayLibrary");
let vnpay = new VnPayLibrary();
let utils = new Utils();

class VnPayService {
  createPaymentUrl(model, clientIp) {
    const tick = Date.now().toString();
    const createDate = moment(model.orderDate).format("YYYYMMDDHHmmss");

    const tmnCode = config.get("vnp_TmnCode");
    const secretKey = config.get("vnp_HashSecret");
    const vnpUrl = config.get("vnp_Url");
    const returnUrl = config.get("vnp_ReturnUrl");

    vnpay.addRequestData("vnp_Version", "2.1.0");
    vnpay.addRequestData("vnp_Command", "pay");
    vnpay.addRequestData("vnp_TmnCode", tmnCode);
    vnpay.addRequestData("vnp_Amount", (model.totalAmount * 100).toString());
    vnpay.addRequestData("vnp_CreateDate", createDate);
    vnpay.addRequestData("vnp_CurrCode", "VND");
    vnpay.addRequestData("vnp_IpAddr", "127.0.0.1");
    vnpay.addRequestData("vnp_Locale", "vn");
    vnpay.addRequestData(
      "vnp_OrderInfo",
      "Thanh toan cho don hang:" + model._id.toString()
    );
    vnpay.addRequestData("vnp_OrderType", "onl");
    vnpay.addRequestData("vnp_ReturnUrl", returnUrl);
    vnpay.addRequestData("vnp_TxnRef", tick);

    const paymentUrl = vnpay.createRequestUrl(vnpUrl, secretKey);

    return paymentUrl;
    // let vnp_Params = {
    //   vnp_Version: "2.1.0",
    //   vnp_Command: "pay",
    //   vnp_TmnCode: tmnCode,
    //   vnp_Locale: "vn",
    //   vnp_CurrCode: "VND",
    //   vnp_TxnRef: tick,
    //   vnp_OrderInfo: `Thanh toan cho ma GD: ${model._id.toString()}`,
    //   vnp_OrderType: "onl",
    //   vnp_Amount: model.totalAmount * 100,
    //   vnp_ReturnUrl: returnUrl,
    //   vnp_IpAddr: clientIp,
    //   vnp_CreateDate: createDate,
    // };
    // Sắp xếp tham số theo thứ tự từ điển
    // vnp_Params = this.sortObject(vnp_Params);

    // // Tạo chuỗi mã hóa
    // // let querystring = require("qs");
    // // let signData = querystring.stringify(vnp_Params, { encode: false });
    // let sortedParams = Object.keys(vnp_Params)
    //   .map((key) => `${key}=${vnp_Params[key]}`)
    //   .join("&");
    // let signData = sortedParams;
    // let crypto = require("crypto");
    // let hmac = crypto.createHmac("sha512", secretKey);
    // let signed = hmac.update(Buffer.from(sortedParams, "utf-8")).digest("hex");
    // vnp_Params["vnp_SecureHash"] = signed;

    // console.log(vnp_Params, "vnp_Params");

    // // Tạo URL thanh toán
    // // const paymentUrl = `${vnpUrl}?${querystring.stringify(vnp_Params, {
    // //   encode: false,
    // // })}`;
    // let queryString = Object.keys(vnp_Params)
    //   .map((key) => `${key}=${encodeURIComponent(vnp_Params[key])}`) // Mã hóa giá trị để đảm bảo URL hợp lệ
    //   .join("&");

    // // Tạo paymentUrl
    // const paymentUrl = `${vnpUrl}?${queryString}`;
  }

  // Hàm sắp xếp tham số theo thứ tự từ điển
  sortObject(obj) {
    const sorted = {};
    const keys = Object.keys(obj).sort();
    for (const key of keys) {
      sorted[key] = obj[key];
    }
    return sorted;
  }
}

module.exports = new VnPayService();
