'use client';
import NavBottom from '@/components/NavBottom';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { BiCloset } from 'react-icons/bi';
import { BsBox2Heart } from 'react-icons/bs';
import { BiBowlRice } from 'react-icons/bi';
import { LuIceCream } from 'react-icons/lu';
import { BiDonateHeart } from 'react-icons/bi';
import { RiContactsBook2Line } from 'react-icons/ri';
import MainPetButton from '@/components/main/MainPetButton';
import PetStateMessage from '@/components/main/PetStateMessage';
import PetProfile from '@/components/main/PetProfile';
import { FeedType, PetType } from '@/types/petType';

import { useRouter } from 'next/navigation';
import { getCookieValue } from '@/libs/getCookieValue';
import { useAtom } from 'jotai';
import { User, userAtom, accessTokenAtom, csrfTokenAtom } from '@/atoms/atoms';
import { axios } from '@/services/instance';

function Main() {
  const [petData, setPetData] = useState<PetType>();
  const [backgroundImageURL, setBackgroundImageURL] = useState('');
  const [activePetImageURL, setActivePetImageURL] = useState('');
  const [riceCount, setRiceCount] = useState(0);
  const [snackCount, setSnackCount] = useState(0);
  const [boxCount, setBoxCount] = useState(0);
  const [level, setLevel] = useState(0);
  const [maxProgress, setMaxProgress] = useState(0);
  const [experience, setExperience] = useState(0);
  const [petName, setPetName] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [tempSaveMessage, setTempSaveMessage] = useState('');
  const router = useRouter();

  const [user, setUser] = useAtom<User | null>(userAtom);
  const [accessToken, setAccessToken] = useAtom<string | null>(accessTokenAtom);
  const [csrf, setCsrf] = useAtom<string | null>(csrfTokenAtom);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const csrfToken = getCookieValue('csrftoken');
        const token = getCookieValue('access_token');
        if (token) {
          setAccessToken(token);
          console.log('accesstoken 값: ', accessToken)
        }
        if (csrfToken) {
          setCsrf(csrfToken);
          console.log('csrfToken 값: ', csrfToken)
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchTokens();
  }, [setAccessToken]);

  useEffect(() => {   
    axios
      .get('users/myinfo/')
      .then(response => {
        setUser(response.data);
        console.log(response.data);
        axios
          .get<PetType>('pets/mypet/')
          .then(response => {
            setPetData(response.data);
            setBackgroundImageURL(response.data.primary_background.image);
            setActivePetImageURL(response.data.active_pet.image);
            setBoxCount(response.data.random_boxes);
            setRiceCount(response.data.rice_quantity);
            setSnackCount(response.data.snack_quantity);
            setLevel(response.data.pet_rating.level);
            setExperience(response.data.point);
            setMaxProgress(response.data.pet_rating.point);
            setPetName(response.data.active_pet.pet_name);
            setStatusMessage(response.data.hunger_degree_status);
            console.log(petData);
          })
          .catch(error => {
            console.error('펫에러', error);
            alert('로그인이 필요합니다.');
            router.push('/introduce');
          });
      })
      .catch(error => {
        console.error('유저에러', error.data)
        // alert('로그인이 필요합니다.');
        // router.push('/introduce');
      })
  }, [accessToken, csrf]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStatusMessage(tempSaveMessage);
    }, 5000);
    return () => {
      clearTimeout(timeout);
    }
  },[tempSaveMessage])

  //밥주기
  const handleFeedRice = () => {
    if (petData && petData?.rice_quantity > 0) {
      axios
        .post<FeedType>('pets/feed-rice/')
        .then(response => {
          setExperience(response.data.pet.pet_rating.point);
          const defaultMessage = statusMessage
          setStatusMessage(response.data.pet.hunger_degree_status);
          setRiceCount(riceCount - 1);
          if(level !== response.data.pet.pet_rating.level){
            setLevel(response.data.pet.pet_rating.level);
            setExperience(response.data.pet.point);
            setMaxProgress(response.data.pet.pet_rating.point);
          };
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      alert('밥이 없습니다!');
    }
  };

  //간식주기
  const handleFeedSnack = () => {
    if (petData && petData.snack_quantity > 0) {
      axios
        .post<FeedType>('pets/feed-snack/')
        .then(response => {
          setExperience(response.data.pet.pet_rating.point);
          setTempSaveMessage(statusMessage);
          setStatusMessage(response.data.pet.hunger_degree_status);
          setSnackCount(snackCount - 1);
            setLevel(response.data.pet.pet_rating.level);
            setExperience(response.data.pet.point);
            setMaxProgress(response.data.pet.pet_rating.point);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      alert('간식이 없습니다!');
    }
  };

  // 쓰다듬기
  const handleTouchPet = () => {
    setTempSaveMessage(statusMessage);
    setStatusMessage('당신의 펫은 달콤함에 콧노래를 흥얼거립니다!');
  }

  return (
    <div className="w-full h-full ">
      {petData ? (
        <div
          className="wrap-section bg-cover animate-fadeIn"
          style={{ backgroundImage: `url(https://api.oz-02-main-04.xyz${backgroundImageURL})` }}>
          <header className="h-1/6 pt-8 pb-2 bg-white">
            <PetProfile name={petName} level={level} progress={experience} maxProgress={maxProgress} />
          </header>

          <main className="w-full h-5/6 ">
            <section className="h-1/3 grid justify-end items-center py-5 px-2 text-center">
              <MainPetButton icon={<BiCloset size="30" />} label="보관함" count={-1} link="/closet" />
              <MainPetButton icon={<BsBox2Heart size="28" />} label="랜덤박스" link="/randombox" count={boxCount} />
            </section>

            <section className="w-full h-1/3 flex flex-col items-center">
              <div className='flex w-full h-2/5 p-2 justify-center items-center'>
                <Image
                  src={''}
                  alt="accessory"
                  width={40}
                  height={40}
                  className="h-full object-contain"
                />
              </div>
              <div className='flex w-full h-3/5 p-1 justify-center items-center'>
                <Image
                  src={`https://api.oz-02-main-04.xyz${activePetImageURL}`}
                  alt="pet"
                  width={110}
                  height={110}
                  className="h-full object-contain"
                />                
              </div>
            </section>

            <section className="h-1/3 p-3 text-center">
              <PetStateMessage message={statusMessage} />
              <div className="flex justify-center items-end">
                <MainPetButton
                  icon={<BiBowlRice size="30" />}
                  label="밥주기"
                  count={riceCount}
                  handle={() => handleFeedRice()}
                />
                <MainPetButton
                  icon={<LuIceCream size="30" />}
                  label="간식주기"
                  count={snackCount}
                  handle={() => handleFeedSnack()}
                />
                <MainPetButton icon={<BiDonateHeart size="30" />} label="쓰다듬기" count={-1} 
                  handle={() => handleTouchPet()}/>
                <MainPetButton icon={<RiContactsBook2Line size="30" />} label="방명록" link="/guest" count={-1} />
              </div>
            </section>
          </main>
        </div>
      ) : (
         <div className="wrap-section text-center flex">
           <div className="m-auto text-primary-500">Loding...</div>
         </div>
       )}
      <NavBottom />
    </div>
  );
}

export default Main;