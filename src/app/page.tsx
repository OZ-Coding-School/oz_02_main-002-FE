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
import { PetType } from '@/types/petType';
import axios from 'axios';
import { useRouter } from 'next/navigation';

function Main() {
  const [petData, setPetData] = useState<PetType>();
  const [backgroundImageURL, setBackgroundImageURL] = useState('');
  const [acivePetImageURL, setActivePetImageURL] = useState('');
  const [riceCount, setRiceCount] = useState(0);
  const [snackCount, setSnackCount] = useState(0);
  const [boxCount, setBoxCount] = useState(0);
  const [level, setLevel] = useState(0);
  const [progress, setProgress] = useState(0);
  const [experience, setExperience] = useState(0);
  const router = useRouter();

// 배포 (axios 변경)
  useEffect(() => {
    axios.get('https://api.oz-02-main-04.xyz/api/v1/users/myinfo/')
    .then(response => {
      if(response.status === 200) {
        axios
        .get<PetType>('https://api.oz-02-main-04.xyz/api/v1/pets/mypet/')
        .then(response => {
          setPetData(response.data);
          console.log(response.data);
          setBackgroundImageURL(response.data.primary_background.image);
          setActivePetImageURL(response.data.active_pet.image);
          setBoxCount(response.data.random_boxes);
          setRiceCount(response.data.rice_quantity);
          setSnackCount(response.data.snack_quantity);
        })
        .catch(error => {
          console.log(error);
        });
      } else {
        alert("로그인이 필요합니다.");
        router.push('/introduce')
      }
      console.log(response.status)
    })
    .catch(error => {
      console.log(error);
    })
  }, [router]);

// 로컬테스트
  // useEffect(() => {
  //   axios
  //     .get<PetType>('https://api.oz-02-main-04.xyz/api/v1/pets/mypet/1')
  //     .then(response => {
  //       setPetData(response.data);
  //       console.log(response.data);
  //       setBackgroundImageURL(response.data.primary_background.image);
  //       setActivePetImageURL(response.data.active_pet.image);
  //       setBoxCount(response.data.random_boxes);
  //       setRiceCount(response.data.rice_quantity);
  //       setSnackCount(response.data.snack_quantity);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }, []);

  //밥주기
  const handleFeedRice = () => {
    if(petData && petData?.rice_quantity > 0) {
      axios
        .post('https://api.oz-02-main-04.xyz/api/v1/pets/feed-rice/1/')
        .then(response => {
          setRiceCount(riceCount - 1);
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
      })      
    } else {
      alert('밥이 없습니다!');
    }    
  }

  //간식주기
  const handleFeedSnack = () => {
    if(petData && petData.snack_quantity > 0) {
      axios
        .post('https://api.oz-02-main-04.xyz/api/v1/pets/feed-snack/1/')
        .then(response => {
          setSnackCount(snackCount - 1);
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        })   
    } else {
      alert('간식이 없습니다!');
    }    
  }

  return (
    <div className="w-full h-full">
      {petData ? (
        <div className="wrap-section bg-cover" style={{ backgroundImage: `url:(${backgroundImageURL})` }}>
          <header className="h-1/6 pt-8 pb-2 bg-white">
            <PetProfile
              name={petData.active_pet.pet_name}
              level={petData.pet_rating.level}
              progress={petData.point}
              maxProgress={petData.pet_rating.point}
            />
          </header>

          <main className="w-full h-5/6 ">
            <section className="h-1/3 grid justify-end items-center py-5 px-2 text-center">
              <MainPetButton icon={<BiCloset size="30" />} label="보관함" count={-1} />
              <MainPetButton icon={<BsBox2Heart size="28" />} label="랜덤박스" link="/randombox" count={boxCount}/>
            </section>

            <section className="h-1/3 flex items-center">
              <Image src={acivePetImageURL} alt="pet" width={130} height={130} className="my-0 mx-auto" />
            </section>

            <section className="h-1/3 p-3 text-center">
              <PetStateMessage petId={1} />
              <div className="flex justify-center items-end">
                <MainPetButton icon={<BiBowlRice size="30" />} label="밥주기" count={riceCount} handle={() => handleFeedRice()}/>
                <MainPetButton icon={<LuIceCream size="30" />} label="간식주기" count={snackCount} handle={() => handleFeedSnack()}/>
                <MainPetButton icon={<BiDonateHeart size="30" />} label="쓰다듬기" count={-1} />
                <MainPetButton icon={<RiContactsBook2Line size="30" />} label="방명록" link="/guest" count={-1} />
              </div>
            </section>
          </main>
        </div>
      ) : (
        <div className="wrap-section">로딩중..</div>
      )}
      <NavBottom />
    </div>
  );
}

export default Main;
