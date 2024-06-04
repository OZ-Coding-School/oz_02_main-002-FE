'use client';
import ProgressBar from '@/components/ProgressBar';
import SelectBox from '@/components/SelectBox';
import { DAY_OF_WEEK, MONTH_OF_YEAR } from '@/constants';
import useCreateCalender from '@/hooks/useCreateCalender';
import useSwipeDirection from '@/hooks/useSwipeDirection';
import { useEffect, useState } from 'react';

const CalenderList = () => {
  const today = new Date().getDate();
  const todayMonth = new Date().getMonth() + 1;
  const todayYear = new Date().getFullYear();
  const [currentYear, setCurrentYear] = useState(todayYear);
  const [currentMonth, setCurrentMonth] = useState(todayMonth);
  const [calender, setCalender] = useState<string[][]>([]);
  const possibleYear = ['2023년', '2024년'];
  const possibleMonth = MONTH_OF_YEAR;
  let direction = useSwipeDirection();
  console.log(direction);

  useEffect(() => {
    if (direction === 'left') {
      setCurrentMonth(prev => prev - 1);
      console.log('go left');
    } else if (direction === 'right') {
      setCurrentMonth(prev => prev + 1);
      console.log('go right');
    }
    direction = '';
    console.log(direction);
  }, [direction, setCurrentMonth]);

  useEffect(() => {
    if (currentMonth < 1) {
      setCurrentYear(prev => prev - 1);
      setCurrentMonth(12);
    } else if (currentMonth > 12) {
      setCurrentYear(prev => prev + 1);
      setCurrentMonth(1);
    }
    setCalender(() => useCreateCalender(currentYear, currentMonth));
  }, [currentYear, currentMonth]);

  // 화살표를 클릭했을 때 ( 왼쪽 | 오른쪽 )
  const changeMonth = (diff: number) => {
    setCurrentMonth(prev => prev + diff);
  };

  return (
    <div className="w-full">
      <div className="w-full p-[1.125rem]">
        <div className="h-10 mt-8 flex justify-center items-center space-x-[0.625rem]">
          <button onClick={() => changeMonth(-1)} className="calender_button_left">
            {/* <Left /> */}
          </button>
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
          <button onClick={() => changeMonth(1)}>{/* <Right /> */}</button>
        </div>
        <div className="w-full h-fit min-h-80 mt-7" id="calender">
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
            <tbody>
              {calender.map((week_arr, j) => {
                return (
                  <tr key={j} className="w-full h-[3.0625rem] border-y border-black-200">
                    {week_arr.map((day, i) => {
                      return (
                        <td
                          key={i}
                          className={`w-[3.1875rem] h-full text-xs ${i !== 0 && i !== 6 && 'border-[0.0313rem]'} align-middle text-center border-black-200 `}>
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
};

export default CalenderList;
