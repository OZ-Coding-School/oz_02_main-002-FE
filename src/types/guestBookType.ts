export interface GuestBookListType {
  id: number;
  user_nickname: string;
  created_at: string;
  updated_at: string;
  content: string;
  guestbook: number;
  user: number;
}

export interface GuestListItemProps {
  item: {
    id: number;
    user_nickname: string;
    created_at: string;
    updated_at: string;
    content: string;
    guestbook: number;
    user: number;
  };
  modalHandler: () => void;
}

export interface postGuestBookProps {
  content: string;
  guestbook_user: number;
}

export interface NickNameListType {
  id: number;
  nickname: string;
}

export interface DeleteAlertProps {
  onClose: () => void;
  bgColor?: string;
}
