import useOutsideClick from '@/hooks/useOutsideClick';

interface SelectBoxProps {
  possibleList: string[];
  isClickedProps: boolean;
  currentProps: number;
  setCurrentProps: (props: number) => void;
  setIsClickedProps: (props: boolean) => void;
}

const SelectBox: React.FC<SelectBoxProps> = ({
  possibleList,
  isClickedProps,
  currentProps,
  setCurrentProps,
  setIsClickedProps,
}) => {
  const outsideRef = useOutsideClick(() => setIsClickedProps(false));
  return (
    <ul
      ref={outsideRef}
      className={`w-full h-fit bg-white ${isClickedProps ? 'block' : 'hidden'} border border-[#D1D1D1] rounded-[5px] z-20 relative -translate-y-[30px]`}>
      {possibleList.map((item, i) => {
        return (
          <li
            key={i}
            value={i + 1}
            className={`h-[1.875rem] py-[2px] cursor-pointer ${item.replace(/[^0-9]/g, '') === currentProps.toString() ? '' : 'text-[#D1D1D1]'}`}
            onClick={() => {
              setCurrentProps(Number(item.replace(/[^0-9]/g, '')));
              setIsClickedProps(false);
            }}>
            {item}
          </li>
        );
      })}
    </ul>
  );
};

export default SelectBox;
