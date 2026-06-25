export function useBoolean(boolean: boolean = false) {
  const [bool, setBool] = useState(boolean);
  const toggle = () => {
    setBool(!bool);
  };
  const setTrue = () => {
    setBool(true);
  };
  const setFalse = () => {
    setBool(false);
  };
  return { bool, toggle, setTrue, setFalse };
}

interface ITest extends Record<string, unknown> {
  a: string;
  b: string;
  c: number;
}

type test = keyof ITest;

const instance: test = {
  a: "123",
  b: "123",
};

instance.c = 23;
