import { Input } from "../ui/input";
import { Label } from "../ui/label";

const { Button } = require("../ui/button");

export default function CommonForm({
  action,
  btnText,
  btnType,
  isBtnDisabled,
  formData,
  setFormData,
  formControls,
  handleFileChange,
}) {
  function renderInputByComponentType(getCurrentControl) {
    let content = null;
    switch (getCurrentControl?.componentType) {
      case "input":
        content = (
          <div>
            <Input
              type="text"
              name={getCurrentControl?.name}
              id={getCurrentControl?.name}
              placeholder={getCurrentControl?.placeholder}
              value={formData[getCurrentControl?.name]}
              disabled={
                getCurrentControl?.disabled ? getCurrentControl.disabled : false
              }
              onChange={(event) => {
                setFormData({
                  ...formData,
                  [event.target.name]: event.target.value,
                });
              }}
              className="text-xl  rounded-md  border-2  my-6 w-full h-[60px] focus-visible:shadow-2xl focus:bg-slate-300 hover:bg-slate-300 hover:shadow-xl focus-visible:border-none transition-all duration-300 text-black font-bold disabled:opacity-40"
            ></Input>
          </div>
        );

        break;

      case "file":
        content = (
          <div className="text-xl border-2 rounded-md  my-6 w-full h-[60px] outline-none focus-visible:drop-shadow-lg transition-all hover:bg-slate-300 duration-200 text-black font-bold flex items-center px-4 ">
            <Label type="text" htmlFor={getCurrentControl?.name}>
              {getCurrentControl.label + " : "}
            </Label>
            <Input
              type="file"
              id={getCurrentControl?.name}
              className="my-6 w-[30%] cursor-pointer  border-black border-2"
              onChange={handleFileChange}
            ></Input>
          </div>
        );

        break;

      default:
        content = (
          <div>
            <Input
              type="text"
              name={getCurrentControl.name}
              id={getCurrentControl.name}
              value={formData[getCurrentControl.name]}
              onChange={(event) => {
                setFormData({
                  ...formData,
                  [event.target.name]: event.target.value,
                });
              }}
              className="text-xl  rounded-md  border-2  my-6 w-full h-[60px] focus-visible:shadow-2xl focus:bg-slate-300 hover:bg-slate-300 hover:shadow-xl transition-all duration-300 text-black font-bold disabled:opacity-40"
            ></Input>
          </div>
        );

        break;
    }
    return content;
  }

  return (
    <>
      <form action={action}>
        {formControls?.map((control) => renderInputByComponentType(control))}
        <div className="mt-6 ">
          <Button
            disabled={isBtnDisabled}
            type={btnType || "Submit"}
            className="disabled:opacity-60 h-11 flex justify-center  "
          >
            {btnText}
          </Button>
        </div>
      </form>
    </>
  );
}
