import Swal from "sweetalert2";
import { SwalDataType } from "../types";

export default class Alerta {
  data: SwalDataType;
  callback: Function | null;
  constructor(callback?: Function) {
    this.data = { icon: "question", title: "Valkyria", text: "Info text" };
    this.callback = callback ? callback : null;
  }

  success(title: string, text: string) {
    this.data.icon = "success";
    this.structure(title, text);
  }

  warning(title: string, text: string) {
    this.data.icon = "warning";
    this.structure(title, text);
  }

  error(title: string, text: string) {
    this.data.icon = "error";
    this.structure(title, text);
  }

  structure(title: string, text: string) {
    this.data.title = title;
    this.data.text = text;
    this.drawAlerta();
  }

  drawAlerta() {
    Swal.fire(this.data.title, this.data.text, this.data.icon).then(
      (value: any) => {
        if (value && this.callback) {
          this.callback();
        }
      }
    );
  }
}
