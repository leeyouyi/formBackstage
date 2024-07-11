export enum EnumFormType {
  textbox = "textbox",
  dropdownlist = "dropdownlist",
  radio = "radio",
  calendar = "calendar",
  checkbox = "checkbox",
  textarea = "textarea",
}

// export enum EunmStatus {
//   enabled = "enabled",
//   disabled = "disabled",
// }

export enum EnumFields {
  /** 序號 */
  id = "id",
  /** 欄位型別 */
  type = "type",
  /** tag name */
  name = "name",
  /** tag value */
  value = "value",
  /** 顯示文字 */
  text = "text",
  /** 多筆選項 */
  options = "options",
}

export enum enumOptions {
  id = "id",
  name = "name",
  value = "value",
  text = "text",
}
export interface Ioption {
  [enumOptions.id]: string;
  [enumOptions.name]: string;
  [enumOptions.value]: string;
  [enumOptions.text]: string;
}
export type Itable = {
  [EnumFields.id]: string;
  [EnumFields.type]: EnumFormType;
  [EnumFields.name]: string;
  [EnumFields.value]: string;
  [EnumFields.text]: string;
  [EnumFields.options]?: Ioption;
};

export const getData = (): Itable[] => {
  return [
    {
      id: "1",
      type: EnumFormType.textbox,
      name: "textbox",
      value: "",
      text: "input欄位",
    },
    {
      id: "2",
      type: EnumFormType.dropdownlist,
      name: "dropdownlist",
      value: "",
      text: "dropdownlist",
    },
    {
      id: "3",
      type: EnumFormType.radio,
      name: "radio",
      value: "",
      text: "radio欄位",
    },
  ];
};
