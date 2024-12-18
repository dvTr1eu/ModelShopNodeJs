import { FormatPrice } from "@/helpers/utilities";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { useSelector } from "react-redux";

function ClientOrderDetailsView({ orderDetails }) {
  const { user } = useSelector((state) => state.auth);

  return (
    <DialogContent className="sm:max-w-[600px]">
      <div className="grid gap-6 ">
        <div className="grid gap-2">
          <div className="flex mt-8 items-center justify-between">
            <p className="font-medium">OrderID</p>
            <Label>{orderDetails?._id}</Label>
          </div>
          <div className="flex mt-4 items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
          </div>
          <div className="flex mt-4 items-center justify-between">
            <p className="font-medium">Order Price</p>
            <Label>{FormatPrice(orderDetails?.totalAmount)}</Label>
          </div>
          <div className="flex mt-4 items-center justify-between">
            <p className="font-medium">Payment Method</p>
            <Label>{orderDetails?.paymentMethod}</Label>
          </div>
          <div className="flex mt-4 items-center justify-between">
            <p className="font-medium">Payment Status</p>
            <Label>{orderDetails?.paymentStatus}</Label>
          </div>
          <div className="flex mt-4 items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label>
              <Badge
                className={`p-2 py-1 px-3 ${
                  orderDetails?.orderStatus === "confirmed"
                    ? "bg-green-500"
                    : orderDetails?.orderStatus === "rejected"
                    ? "bg-red-600"
                    : "bg-black"
                }`}
              >
                {orderDetails?.orderStatus}
              </Badge>
            </Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium text-center">Order Details</div>
            <ul className="grid gap-3">
              {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
                ? orderDetails?.cartItems.map((item) => (
                    <li className="flex items-center justify-between">
                      <span>Name: {item.productname}</span>
                      <span>Quantity: {item.quantity}</span>
                      <span>Price: {FormatPrice(item.price)}</span>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium text-center">Shipping Info</div>
            <div className="grid gap-0.5 text-muted-foreground">
              <span>Name: {user?.username}</span>
              <span>Address: {orderDetails?.addressInfo?.address}</span>
              <span>City: {orderDetails?.addressInfo?.city}</span>
              <span>Phone: {orderDetails?.addressInfo?.phone}</span>
              <span>Notes: {orderDetails?.addressInfo?.notes}</span>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

export default ClientOrderDetailsView;
