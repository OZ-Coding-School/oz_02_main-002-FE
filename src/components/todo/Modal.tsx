import ModalWrapper from '../modal/ModalWrapper';

interface Props {
  onRemove(id: number): void;
  onClose: () => void;
  id: number;
}
function Modal({ onRemove, id, onClose }: Props) {
  return (
    <ModalWrapper onClose={onClose}>
      <div
        className="w-full flex items-center h-[8.5rem] bg-borderGray absolute bg-black-400 bottom-[5.5rem] rounded-t-[0.625rem]"
        onClick={e => e.stopPropagation()}>
        <div className="w-full flex flex-col items-start gap-7 pl-3">
          {/* <button className="flex font-semibold text-[1.125rem] w-full">수정</button> */}
          <button className="flex font-semibold text-[1.125rem] w-full text-red-400" onClick={() => onRemove(id)}>
            삭제
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
}

export default Modal;
