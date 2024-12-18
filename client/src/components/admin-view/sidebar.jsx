import { Fragment } from "react";
import {
  LayoutPanelLeftIcon,
  LayoutDashboardIcon,
  PuzzleIcon,
  ReceiptIcon,
  Layers3Icon,
} from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { useNavigate } from "react-router-dom";

const adminSidebarMenu = [
  {
    id: "index",
    label: "Trang chủ",
    path: "/admin/index",
    icon: <LayoutDashboardIcon />,
  },
  {
    id: "product",
    label: "Sản phẩm",
    path: "/admin/product",
    icon: <PuzzleIcon />,
  },
  {
    id: "order",
    label: "Đơn hàng",
    path: "/admin/order",
    icon: <ReceiptIcon />,
  },
];

function MenuItems({ setOpen }) {
  const navigate = useNavigate();
  return (
    <nav className="mt-8 flex-col flex gap-2">
      {adminSidebarMenu.map((menuItem) => (
        <div
          key={menuItem.id}
          onClick={() => {
            navigate(menuItem.path);
            setOpen ? setOpen(false) : null;
          }}
          className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer"
        >
          {menuItem.icon}
          <span>{menuItem.label}</span>
        </div>
      ))}
    </nav>
  );
}

function AdminSideBar({ open, setOpen }) {
  const navigate = useNavigate();

  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className="flex gap-2 mt-5">
                <LayoutPanelLeftIcon size={30} />
                <h2 className="text-xl font-extrabold">Admin Panel</h2>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div
          className="flex cursor-pointer items-center gap-2"
          onClick={() => navigate("/admin/index")}
        >
          <LayoutPanelLeftIcon size={30} />
          <h2 className="text-xl font-extrabold">Admin Panel</h2>
        </div>
        <MenuItems />
      </aside>
    </Fragment>
  );
}

export default AdminSideBar;
