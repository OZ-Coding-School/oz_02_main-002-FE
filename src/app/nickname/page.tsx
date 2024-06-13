'use client';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { userAtom } from '@/atoms/atoms';
import { useAtom } from 'jotai';
interface User {
  id?: number;
  계정?: string;
  닉네임: string;
}
const getCookieValue = (name: any) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()!.split(';').shift();
};

const Nickname = () => {
  const [user, setUser] = useState<User | null>(null);
  const [newNickname, setNewNickname] = useState('');
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useAtom(userAtom);
  console.log(userInfo);
  useEffect(() => {
    const csrfToken = getCookieValue('csrftoken');
    const token = getCookieValue('access_token');
    console.log(csrfToken);
    console.log(accessToken);
    if (token) {
      setAccessToken(token);
    }
    if (csrfToken) {
      setCsrfToken(csrfToken);
    }
  }, []);

  useEffect(() => {
    const fetchUserInfo = async () => {
      console.log(csrfToken);
      console.log(accessToken);
      if (!accessToken || csrfToken) return;
      try {
        const response = await axios.get('https://api.oz-02-main-04.xyz/api/v1/users/myinfo/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'X-CSRFToken': csrfToken,
          },

          withXSRFToken: true,
        });
        setUser(response.data);
        setUserInfo(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserInfo();
  }, [accessToken, csrfToken]);

  const handleNicknameChange = async () => {
    console.log(newNickname);
    if (!newNickname) {
      alert('닉네임을 입력해주세요.');
      return;
    }
    try {
      const response = await axios.post(
        'https://api.oz-02-main-04.xyz/api/v1/users/myinfo/',
        {
          action: 'change_nickname',
          nickname: newNickname,
        },
        {
          headers: {
            'Content-Type': 'application/json',

            Authorization: `Bearer ${accessToken}`,
            'x-csrftoken': csrfToken,
          },
          withXSRFToken: true,
        },
      );
      if (response.status === 200) {
        alert('닉네임이 변경되었습니다.');
        setUser({ ...user, 닉네임: newNickname });
      }
    } catch (error) {
      console.error(error);
    }
  };
  console.log(newNickname);
  return (
    <div className="profile-container">
      {user ? (
        <div>
          <h1>내 정보</h1>
          <p>계정: {user?.계정}</p>
          <p>닉네임: {user?.닉네임}</p>
          <input
            type="text"
            value={newNickname}
            onChange={e => setNewNickname(e.target.value)}
            placeholder="새 닉네임 입력"
          />
          <button onClick={handleNicknameChange}>닉네임 변경</button>
        </div>
      ) : (
        <p>로딩 중...</p>
      )}
    </div>
  );
};

export default Nickname;
