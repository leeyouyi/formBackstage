import { createContext, useMemo, useRef } from "react";
// import { Button } from "@/components/ui/button";
import { columns } from "./DataTable/components/columns";
import DataTable from "./DataTable";
import { EnumFormType, getData } from "./init";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface FormBackstageContextType {
  edit: boolean;
}
export const FormBackstageContext = createContext<FormBackstageContextType>({
  edit: false,
});
const FormBackstage = () => {
  // const initData = getData()
  const initData = new Array(100).fill(0).map((item, index) => ({
    ...item,
    id: String(index + 1),
    sort: String(index + 1),
    type: EnumFormType.textbox,
    name: `name${index + 1}`,
    text: `text${index + 1}`,
  }));
  /** 畫面渲染資料 */
  const [data, setData] = useState(initData);
  /** 儲存前資料 */
  const originData = useRef(initData);
  /** 目前資料 */
  const currentData = useRef(initData);
  const [editId, setEditId] = useState("");

  const handleEdit = (id: string) => {
    if (id === editId) {
      setEditId("");
    } else {
      originData.current = data;
      setEditId(id);
    }
  };

  const handleChange = (id: string, col: string, val: string) => {
    const mapData = data.map((el) => {
      if (el.id === id) {
        return {
          ...el,
          [col]: val,
        };
      } else return el;
    });
    currentData.current = mapData;
    setData(mapData);
  };

  /** 單筆儲存 */
  const handleSave = () => {
    const sortData = [...currentData.current].sort(
      (a, b) => Number(a.sort) - Number(b.sort)
    );
    setData(sortData);
    setEditId("");
  };
  /** 單筆取消 */
  const handleCancel = () => {
    setData(originData.current);
    setEditId("");
  };

  const tableColumns = useMemo(
    () => columns(editId, handleEdit, handleChange, handleSave, handleCancel),
    [editId]
  );

  return (
    <>
      {/* <FormBackstageContext.Provider
      value={{
        edit: editId,
      }}
    > */}
      <div className="flex justify-start mb-2">
        <Button className="mr-3">新增</Button>
        <Button>刪除</Button>
      </div>

      <DataTable columns={tableColumns} data={data} />
      {/* </FormBackstageContext.Provider> */}
    </>
  );
};
export default FormBackstage;
