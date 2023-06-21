import { FaAngleDown } from "react-icons/fa";
import { nanoid } from "nanoid";

type InputProps = {
  value: string;
  inputHandler(e: React.ChangeEvent<HTMLInputElement>): void;
  toogleVisable(): void;
  visable: boolean;
  options: DogOption[];
  setInputClick(name: string): void;
};

const InputForm = ({
  value,
  inputHandler,
  toogleVisable,
  visable,
  options,
  setInputClick,
}: InputProps) => {
  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full items-center justify-between rounded-md border-2 border-solid border-primary p-2 text-black md:flex-row">
        <input
          className="w-full outline-none focus:outline-none active:outline-none"
          type="text"
          placeholder="type dog's breed..."
          value={value}
          onChange={(e) => inputHandler(e)}
        />
        <button
          type="button"
          className={`text-xl  text-primary ${
            visable ? "rotate-180" : "rotate-0 "
          } rounded-full `}
          onClick={toogleVisable}
        >
          <FaAngleDown />
        </button>
      </div>
      {visable && options.length > 0 && (
        <div className="relative w-full">
          <ul className="absolute top-0 z-10 flex max-h-96 w-full flex-col gap-1 overflow-y-scroll rounded-md border-2 bg-white px-1">
            {options.map((dog) => (
              <li
                key={nanoid()}
                onClick={() => setInputClick(dog.name)}
                className="group cursor-pointer border-b-2 py-2 pl-2 last:border-none hover:bg-neutral-200"
              >
                <button className="group-hover:font-semibold">
                  {dog.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
export default InputForm;
