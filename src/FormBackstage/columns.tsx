import { ColumnDef } from "@tanstack/react-table";
import { EnumFields, EnumFormType, Itable } from "./init";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FormTypeOptions = [
  {
    value: EnumFormType.textbox,
    text: EnumFormType.textbox,
  },
  {
    value: EnumFormType.dropdownlist,
    text: EnumFormType.dropdownlist,
  },
  {
    value: EnumFormType.radio,
    text: EnumFormType.radio,
  },
  {
    value: EnumFormType.checkbox,
    text: EnumFormType.checkbox,
  },
  {
    value: EnumFormType.calendar,
    text: EnumFormType.calendar,
  },
  {
    value: EnumFormType.textarea,
    text: EnumFormType.textarea,
  },
];

export const columns = (
  editId: string,
  handleEdit: (editId: string) => void,
  handleChange: (editId: string, editCol: string, value: string) => void,
  handleCancel: () => void
): ColumnDef<Itable>[] => {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <div className="text-center">
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        </div>
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: () => <div className="text-left">id</div>,
      cell: ({ row }) => {
        return (
          <div className="text-left font-medium">{row.getValue("id")}</div>
        );
      },
    },
    {
      accessorKey: "type",
      header: () => <div className="text-left">類型</div>,
      cell: ({ row }) => {
        const item = row.original;
        return (
          <div className="text-left font-medium">
            {item.id !== editId ? (
              row.getValue("type")
            ) : (
              <Select
                name={EnumFields.type}
                value={item[EnumFields.type]}
                onValueChange={(e) => {
                  console.log(e);
                  handleChange(item.id, EnumFields.type, e);
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="請選擇" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {FormTypeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.text}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "name",
      header: () => <div className="text-left">綁定名稱</div>,
      cell: ({ row }) => {
        const item = row.original;
        return (
          <div className="text-left font-medium">
            {item.id !== editId ? (
              row.getValue("name")
            ) : (
              <Input
                value={item[EnumFields.name]}
                onChange={(e) =>
                  handleChange(item.id, EnumFields.name, e.target.value)
                }
              />
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "text",
      header: () => <div className="text-left">欄位名稱</div>,
      cell: ({ row }) => {
        const item = row.original;
        return (
          <div className="text-left font-medium">
            {item.id !== editId ? (
              row.getValue("text")
            ) : (
              <Input
                value={item[EnumFields.text]}
                onChange={(e) =>
                  handleChange(item.id, EnumFields.text, e.target.value)
                }
              />
            )}
          </div>
        );
      },
    },
    {
      id: "actions",
      header: () => <div className="text-center">設定</div>,
      cell: ({ row }) => {
        const item = row.original;
        return item.id !== editId ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
              <DropdownMenuItem onClick={() => handleEdit(item.id)}>
                編輯資料
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>刪除</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <Button className="mr-1" onClick={() => handleEdit("")}>
              儲存
            </Button>
            <Button onClick={() => handleCancel()}>取消</Button>
          </>
        );
      },
    },
  ];
};
