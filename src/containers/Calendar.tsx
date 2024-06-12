'use client';
import ProgressBar from '@/components/monthly/ProgressBar';
import SelectBox from '@/components/SelectBox';
import { DAY_OF_WEEK, MONTH_OF_YEAR } from '@/constants';
import useCreateCalendar from '@/hooks/useCreateCalendar';
import useSwipeDirection from '@/hooks/useSwipeDirection';
import { useEffect, useState } from 'react';
import { getPostsList } from '../services/getPostsList';
import { useAtomValue } from 'jotai';
import { userAtom } from '@/atoms/atoms';
import { postType } from '@/types/PostType';

export default function Calendar() {
  const today = new Date().getDate();
  const todayMonth = new Date().getMonth() + 1;
  const todayYear = new Date().getFullYear();
  const [currentYear, setCurrentYear] = useState(todayYear);
  const [currentMonth, setCurrentMonth] = useState(todayMonth);
  const [calendar, setCalendar] = useState<string[][]>([]);
  const [postsList, setPostsList] = useState<postType[]>([]);
  const [startDate, setStartDate] = useState('');
  const [lastDate, setLastDate] = useState('');
  const [possibleYear, setPossibleYear] = useState<number[]>([]);
  const [possibleMonth, setPossibleMonth] = useState<number[]>([]);
  const { direction, setDirection } = useSwipeDirection();
  const user = useAtomValue(userAtom);

  useEffect(() => {
    async function getPosts() {
      const response = await getPostsList(user?.id);
      setPostsList(response);
      console.log(today);
      if (response.length !== 0) {
        setStartDate(response[0].todo_date.slice(0, 7));
        setLastDate(response[response.length - 1].todo_date.slice(0, 7));
      } else {
        setStartDate(todayYear.toString() + todayMonth.toString().padStart(2, '0'));
        setLastDate(todayYear.toString() + todayMonth.toString().padStart(2, '0'));
      }
      // const startYear = Number(response[0].todo_date.slice(0, 4));
      // const lastYear = Number(response[response.length - 1].todo_date.slice(0, 4));
      // const startMonth = Number(response[0].todo_date.slice(5, 7));
      // console.log('start month', startMonth);
      // const lastMonth = Number(response[response.length - 1].todo_date.substring(5, 7));
      // console.log('last month', lastMonth);
      // let possibleYearList = [];
      // let possibleMonthList = [];
      // if (possibleYear[0] !== startYear) {
      //   possibleYearList.push(startYear);
      // }
      // if (possibleMonth[0] !== startMonth) {
      //   possibleMonthList.push(startMonth);
      // }
      // if (startYear !== lastYear) {
      //   possibleYearList.push(lastYear);
      // }
      // if (startMonth !== lastMonth) {
      //   possibleMonthList.push(lastMonth);
      // }
      // setPossibleYear(possibleYearList);
      // setPossibleMonth(possibleMonthList);
    }
    getPosts();
  }, []);

  useEffect(() => {
    const startYear = Number(startDate.slice(0, 4));
    const lastYear = Number(lastDate.slice(0, 4));
    const startMonth = Number(startDate.slice(5, 7));
    const lastMonth = Number(lastDate.slice(5, 7));
    if (currentYear === startYear && startYear !== lastYear) {
      const startMonth = Number(startDate.slice(5, 7));
      const lastMonth = 12;
    } else if (currentYear === lastYear) {
      const startMonth = 1;
      const lastMonth = Number(lastDate.slice(5, 7));
    } else if (currentYear > startYear && currentYear < lastYear) {
      const startMonth = 1;
      const lastMonth = 12;
    }
    if (possibleYear[0] !== startYear) {
      setPossibleYear([...possibleYear, startYear]);
    }
    if (possibleMonth[0] !== startMonth) {
      setPossibleMonth([...possibleMonth, startMonth]);
    }
    if (startYear !== lastYear) {
      setPossibleYear([...possibleYear, lastYear]);
    }
    if (startMonth !== lastMonth) {
      setPossibleMonth([...possibleMonth, lastMonth]);
    }
    postsList.map(post => {
      console.log(post.todo_date);
    });
    console.log(possibleYear, possibleMonth);
  }, [startDate, lastDate]);

  useEffect(() => {
    if (direction === 'left') {
      console.log(currentMonth, possibleMonth[possibleMonth.length - 1]);
      if (currentYear === Number(startDate.slice(0, 4)) && currentMonth + 1 < possibleMonth[possibleMonth.length - 1])
        return;
      else setCurrentMonth(prev => prev + 1);
    } else if (direction === 'right') {
      if (currentMonth - 1 < possibleMonth[0]) return;
      else setCurrentMonth(prev => prev - 1);
    }
    setDirection('');
  }, [direction, possibleMonth]);

  useEffect(() => {
    if (currentMonth < 1) {
      if (currentYear - 1 < possibleYear[0]) {
        setCurrentMonth(prev => prev + 1);
        return;
      }
      setCurrentYear(prev => prev - 1);
      setCurrentMonth(12);
    } else if (currentMonth > 12) {
      if (currentYear + 1 > possibleYear[possibleYear.length - 1]) {
        setCurrentMonth(prev => prev - 1);
        return;
      }
      setCurrentYear(prev => prev + 1);
      setCurrentMonth(1);
    }
    setCalendar(() => useCreateCalendar(currentYear, currentMonth));
  }, [currentYear, currentMonth, possibleYear]);

  return (
    <div className="w-full">
      <div className="w-full p-[1.125rem]">
        <div className="h-10 mt-8 flex justify-center items-center space-x-[0.625rem]">
          <SelectBox
            type={'년'}
            possibleList={possibleYear}
            currentProps={currentYear}
            setCurrentProps={setCurrentYear}
          />
          <SelectBox
            type={'월'}
            possibleList={possibleMonth}
            currentProps={currentMonth}
            setCurrentProps={setCurrentMonth}
          />
        </div>
        <div className="w-full h-fit min-h-80 mt-7" id="calendar">
          <table className="w-full h-full text-center">
            <thead className="border-y border-black-200">
              <tr className="h-[1.4375rem]">
                {DAY_OF_WEEK.map((day, i) => {
                  return (
                    <td
                      key={i}
                      className={`${i === 0 && 'text-errorRed'} ${i === 6 && 'text-saturdayBlue'} text-xs align-middle ${i !== 0 && i !== 6 && 'border-[0.5px]'} border-[#CACACA]`}>
                      {day}
                    </td>
                  );
                })}
              </tr>
            </thead>
            <tbody className={`${direction === '' && 'animate-fadeIn'}`}>
              {calendar.map((week_arr, j) => {
                return (
                  <tr key={j} className="w-full h-[3.0625rem] border-y border-black-200">
                    {week_arr.map((day, i) => {
                      return (
                        <td
                          key={i}
                          className={`w-[3.1875rem] h-full text-xs ${i !== 0 && i !== 6 && 'border-[0.0313rem]'} align-middle text-center border-black-200 `}>
                          <button>
                            <div
                              className={`w-[1.125rem] h-[1.125rem] rounded-full flex justify-center items-center ${today === Number(day) && todayMonth === currentMonth && todayYear === currentYear ? 'bg-primary-500 text-white' : ''} mx-auto`}>
                              {day}
                            </div>
                            {day !== '' && (
                              <div className="w-full mx-auto mt-1">
                                <div className="h-3 flex justify-center items-center text-2xs">87%</div>
                                <ProgressBar rate={87} />
                              </div>
                            )}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
