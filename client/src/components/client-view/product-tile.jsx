import { Badge } from "../ui/badge";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { FormatPrice } from "@/helpers/utilities";
import { categoryOptionsMap, sizeOptionsMap } from "@/config";
import { handler } from "tailwindcss-animate";

function ClientProductTile({
  product,
  handleGetProductDetails,
  handleAddToCart,
}) {
  return (
    <Card className="w-ful max-w-sm mx-auto cursor-pointer">
      <div onClick={() => handleGetProductDetails(product?._id)}>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.productname}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
          {product?.quantity === 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Hết hàng
            </Badge>
          ) : product?.quantity < 10 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              {`Chỉ còn ${product?.quantity} sản phẩm`}
            </Badge>
          ) : product?.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Giảm giá
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">{product?.productname}</h2>
          <p className="mb-2 text-muted-foreground">
            Số lượng: {product?.quantity}
          </p>
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg text-muted-foreground">
              {categoryOptionsMap[product?.category]}
            </span>
            <span className="text-lg text-muted-foreground">
              {sizeOptionsMap[product?.size]}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              {FormatPrice(product?.price)}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg font-semibold text-primary">
                {FormatPrice(product?.salePrice)}
              </span>
            ) : null}
          </div>
        </CardContent>
      </div>
      <CardFooter>
        {product?.quantity === 0 ? (
          <Button className="w-full opacity-60 cursor-not-allowed">
            Hết hàng
          </Button>
        ) : (
          <Button
            onClick={() => handleAddToCart(product?._id, product?.quantity)}
            className="w-full"
          >
            Thêm vào giỏ hàng
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ClientProductTile;
