import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { FormatPrice } from "../../helpers/utilities";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "../ui/toast";

function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProduct,
  setCurrentEditId,
  handleDelete,
}) {
  const { toast } = useToast();

  return (
    <Card className="w-full max-w-sm mx-auto">
      <div>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.productname}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
        </div>
        <CardContent>
          <h2 className="text-xl font-bold mb-2">{product?.productname}</h2>
          <p className="mb-2">Số lượng: {product?.quantity}</p>
          <div className="flex justify-between items-center mb-2 mt-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              {FormatPrice(product?.price)}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg font-bold">
                {FormatPrice(product?.salePrice)}
              </span>
            ) : null}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button
            onClick={() => {
              setOpenCreateProduct(true);
              setCurrentEditId(product?._id);
              setFormData(product);
            }}
          >
            Chỉnh sửa
          </Button>
          <Button
            onClick={() =>
              toast({
                title: "Bạn có chắn muốn xóa sản phấm?",
                description:
                  "Sản phẩm của bạn sẽ bị xóa vĩnh viễn và không khôi phục lại được",
                action: (
                  <div className="flex flex-col gap-2 items-center">
                    <ToastAction
                      altText="confirm"
                      variant="destructive"
                      onClick={() => {
                        handleDelete(product?._id);
                      }}
                    >
                      Xác nhận
                    </ToastAction>
                    <ToastAction altText="cancel">Hủy</ToastAction>
                  </div>
                ),
                duration: 2000,
              })
            }
          >
            Xóa
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default AdminProductTile;
