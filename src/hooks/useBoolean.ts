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
