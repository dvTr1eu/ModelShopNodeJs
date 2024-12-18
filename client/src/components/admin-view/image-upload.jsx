import { useEffect, useRef } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";
function UploadProductImage({
  imageFile,
  setImageFile,
  imageLoadingState,
  setImageLoadingState,
  uploadedImage,
  setUploadedImage,
  isEdit,
  isCustomStyle = false,
}) {
  const inputRef = useRef(null);

  function handleImageFileChange(e) {
    console.log(e.target.files);
    const selectedFile = e.target.files?.[0];
    if (selectedFile) setImageFile(selectedFile);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }

  function handleRemoveImage() {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function uploadImageToCloudinary() {
    setImageLoadingState(true);
    const data = new FormData();
    data.append("my_file", imageFile);
    const response = await axios.post(
      "http://localhost:8088/v1/api/admin/product/upload-image",
      data
    );
    console.log(response, "response");
    if (response?.data?.success) {
      setUploadedImage(response.data.result.url);
      setImageLoadingState(false);
    }
  }

  useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary();
  }, [imageFile]);

  return (
    <div className={`w-full mt-4 ${isCustomStyle ? "" : "max-w-md mx-auto"}`}>
      <Label className="text-lg font-semibold mb-2 block">
        Tải lên hình ảnh
      </Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-4`}
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEdit}
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className={`${
              isEdit ? "cursor-not-allowed" : ""
            } flex flex-col items-center justify-center h-32 cursor-pointer`}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Kéo thả hoặc Nhấn để chọn ảnh</span>
          </Label>
        ) : imageLoadingState ? (
          <Skeleton className="h-10 bg-gray-100" />
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-8 text-primary mr-2 h-8" />
            </div>
            <p className="text-sm font-medium">{imageFile.name}</p>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Xóa ảnh</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadProductImage;
