export interface GuestBookListType {
  id: number;
  created_at: string;
  updated_at: string;
  content: string;
  guestbook: number;
  user: number;
}

export interface GuestListItemProps {
  item: {
    id: number;
    created_at: string;
    updated_at: string;
    content: string;
    guestbook: number;
    user: number;
  };
  modalHandler: () => void;
}

export interface NickNameListType {
  id: number;
  nickname: string;
}

export interface DeleteAlertProps {
  onClose: () => void;
  bgColor?: string;
}
