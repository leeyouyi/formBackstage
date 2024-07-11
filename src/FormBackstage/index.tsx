import { createContext, useMemo } from "react";
// import { Button } from "@/components/ui/button";
import { columns } from "./columns";
import DataTable from "./DataTable";
import { getData } from "./init";
import { useState } from "react";

interface FormBackstageContextType {
  edit: boolean;
}
export const FormBackstageContext = createContext<FormBackstageContextType>({
  edit: false,
});
const FormBackstage = () => {
  const initData = getData();
  const [data, setData] = useState(initData);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [originData, setOriginData] = useState(initData);
  const [editId, setEditId] = useState("");

  const handleEdit = (id: string) => {
    if (id === editId) {
      setEditId("");
    } else {
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
    setData(mapData);
  };

  const handleCancel = () => {
    setData(originData);
    setEditId("");
  };

  const tableColumns = useMemo(
    () => columns(editId, handleEdit, handleChange, handleCancel),
    [editId]
  );

  return (
    <>
      {/* <FormBackstageContext.Provider
      value={{
        edit: editId,
      }}
    > */}
      {/* <div className="flex justify-start mb-2">
        <Button onClick={() => setEditId(!editId)}>編輯</Button>
      </div> */}

      <DataTable columns={tableColumns} data={data} />
      {/* </FormBackstageContext.Provider> */}
    </>
  );
};
export default FormBackstage;
