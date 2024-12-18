export const registerFormControl = [
  {
    name: "username",
    label: "Tên người dùng",
    placeholder: "Nhập vào tên người dùng",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Nhập vào email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Mật khẩu",
    placeholder: "Nhập vào mật khẩu",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControl = [
  {
    name: "email",
    label: "Email",
    placeholder: "Nhập vào email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Mật khẩu",
    placeholder: "Nhập vào mật khẩu",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElement = [
  {
    label: "Tên sản phẩm",
    name: "productname",
    componentType: "input",
    type: "text",
    placeholder: "Nhập tên sản phẩm",
  },
  {
    label: "Mô tả",
    name: "description",
    componentType: "textarea",
    placeholder: "Nhập mô tả",
  },
  {
    label: "Danh mục",
    placeholder: "Chọn danh mục",
    name: "category",
    componentType: "select",
    options: [
      { id: "onepiece", label: "One Piece" },
      { id: "naruto", label: "Naruto" },
      { id: "dragonball", label: "Dragon Ball" },
      { id: "kimetsunoyaiba", label: "Kimetsu No Yaiba" },
      { id: "jujutsukaisen", label: "Jujutsu Kaisen" },
      { id: "attackontitan", label: "Attack On Titan" },
    ],
  },
  {
    label: "Kích thước",
    placeholder: "Chọn kích thước",
    name: "size",
    componentType: "select",
    options: [
      { id: "nendoroid", label: "Nendoroid(~10cm)" },
      { id: "figma", label: "Figma(~14-16cm)" },
      { id: "scale", label: "Scale(~22cm)" },
      { id: "statue", label: "Statue(>50cm)" },
    ],
  },
  {
    label: "Giá",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Nhập giá sản phẩm",
  },
  {
    label: "Nhập giá giảm",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Nhập giá giảm(nếu có)",
  },
  {
    label: "Số lượng sản phẩm",
    name: "quantity",
    componentType: "input",
    type: "number",
    placeholder: "Nhập số lượng sản phẩm",
  },
];

export const clientViewHeaderMenuItems = [
  { id: "products", label: "All Products", path: "/client/product" },
  { id: "nendoroid", label: "Nendoroid(~10cm)", path: "/client/product" },
  { id: "figma", label: "Figma(~14-16cm)", path: "/client/product" },
  { id: "scale", label: "Scale(~22cm)", path: "/client/product" },
  { id: "statue", label: "Statue(>50cm)", path: "/client/product" },
  { id: "search", label: "Tìm kiếm", path: "/client/search" },
];

export const sizeOptionsMap = {
  nendoroid: "Nendoroid(~10cm)",
  figma: "Figma(~14-16cm)",
  scale: "Scale(~22cm)",
  statue: "Statue(>50cm)",
};

export const categoryOptionsMap = {
  onepiece: "One Piece",
  naruto: "Naruto",
  dragonball: "Dragon Ball",
  kimetsunoyaiba: "Kimetsu No Yaiba",
  jujutsukaisen: "Jujutsu Kaisen",
  attackontitan: "Attack On Titan",
};

export const filterOptions = {
  size: [
    { id: "nendoroid", label: "Nendoroid(~10cm)" },
    { id: "figma", label: "Figma(~14-16cm)" },
    { id: "scale", label: "Scale(~22cm)" },
    { id: "statue", label: "Statue(>50cm)" },
  ],
  category: [
    { id: "onepiece", label: "One Piece" },
    { id: "naruto", label: "Naruto" },
    { id: "dragonball", label: "Dragon Ball" },
    { id: "kimetsunoyaiba", label: "Kimetsu No Yaiba" },
    { id: "jujutsukaisen", label: "Jujutsu Kaisen" },
    { id: "attackontitan", label: "Attack On Titan" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Giá: Tăng dẫn" },
  { id: "price-hightolow", label: "Giá: Giảm dần" },
];

export const addressForm = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];
