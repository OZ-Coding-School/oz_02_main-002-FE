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
import { axios } from '@/services/instance';

function Main() {
  const [petData, setPetData] = useState<PetType>();
  const [backgroundImageURL, setBackgroundImageURL] = useState('');

  useEffect(() => {
    axios
      .get<PetType>('pets/mypet/')
      .then(response => {
        setPetData(response.data);
        console.log(response.data);
        const backgroundImageURL = response.data.primary_background.image;
        setBackgroundImageURL(backgroundImageURL);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className="w-full h-full">
      {petData ? (
        <div className="wrap-section bg-cover" style={{ backgroundImage: `url:(${backgroundImageURL})` }}>
          <header className="h-1/6 pt-8 pb-2 bg-white">
            <PetProfile
              name={petData.active_pet.pet_name}
              level={petData.pet_rating.level}
              progress={petData.point}
              maxProgress={100}
            />
          </header>

          <main className="w-full h-5/6 ">
            <section className="h-1/3 grid justify-end p-4 text-center">
              <MainPetButton icon={<BiCloset size="30" />} label="보관함" />
              <div className="">
                <MainPetButton icon={<BsBox2Heart size="28" />} label="랜덤박스" />
                <div className=" text-sm font-bold">{petData.random_boxes}개 남음</div>
              </div>
            </section>

            <section className="h-1/3 flex items-center">
              <Image src="/pet/egg.png" alt="egg" width={130} height={130} className="my-0 mx-auto" />
            </section>

            <section className="h-1/3 p-3 text-center">
              <PetStateMessage petId={1} />
              <div className="flex justify-center ">
                <div>
                  <MainPetButton icon={<BiBowlRice size="30" />} label="밥주기" />
                  <div className=" text-sm font-bold">1개 남음</div>
                </div>
                <div>
                  <MainPetButton icon={<LuIceCream size="30" />} label="간식주기" />
                  <div className="text-sm font-bold">1개 남음</div>
                </div>
                <MainPetButton icon={<BiDonateHeart size="30" />} label="쓰다듬기" />
                <MainPetButton icon={<RiContactsBook2Line size="30" />} label="방명록" link="/guest" />
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
