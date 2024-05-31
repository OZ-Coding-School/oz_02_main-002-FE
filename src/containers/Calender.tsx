'use client';
import { DAY_OF_WEEK } from '@/constants';
import { ChangeEvent, useMemo, useState } from 'react';

const CalenderList = () => {
  const [calender, setCalender] = useState<string[][]>([]);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);

  // 윤달 체크하기
  const checkLeapYear = (year: number) => {
    if (year % 400 === 0) return true;
    else if (year % 100 === 0) return false;
    else if (year % 4 === 0) return true;
    else return false;
  };

  // 'yyyy-mm-dd'형식 맞추고 각 달의 1일 위치 정해주기
  const getFirstDayOfWeek = (year: number, month: number) => {
    let digit = '';
    if (month < 10) digit = '0';
    return new Date(year + '-' + digit + month + '-' + '01').getDay();
  };

  const changeYearMonth = (year: number, month: number) => {
    let monthDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    // 1일 위치
    let firstDay = getFirstDayOfWeek(year, month);
    let arrCalender = [];
    let newCalender = [];

    // 윤달이면 29일
    if (month === 2) if (checkLeapYear(year)) monthDay[1] = 29;

    // 1일 시작 전에 공백 채우기
    for (let i = 0; i < firstDay; i++) {
      arrCalender.push('');
    }

    // 날짜 넣어주기
    for (let i = 1; i <= monthDay[month - 1]; i++) {
      arrCalender.push(String(i));
    }

    // 마지막 날짜 이후에 공백 채우기
    let remainDay = 7 - (arrCalender.length % 7);
    if (remainDay < 7) {
      for (let i = 0; i < remainDay; i++) {
        arrCalender.push('');
      }
    }

    // 주 단위로 자르기
    for (let i = 0; i < arrCalender.length; i += 7) {
      newCalender.push(arrCalender.slice(i, i + 7));
    }

    setCalender(newCalender);
  };

  // 화살표를 클릭했을 때 ( 왼쪽 | 오른쪽 )
  const changeMonth = (diff: number) => {
    setCurrentMonth(prev => prev + diff);
  };

  // 이전 달 | 다음 달
  const calenderMemo = useMemo(() => {
    if (currentMonth < 1) {
      setCurrentYear(prev => prev - 1);
      setCurrentMonth(12);
    } else if (currentMonth > 12) {
      setCurrentYear(prev => prev + 1);
      setCurrentMonth(1);
    }
    changeYearMonth(currentYear, currentMonth);
  }, [currentYear, currentMonth]);

  return (
    <div className="w-full">
      <div className="w-full p-[1.125rem]">
        <div className="h-10">
          <button onClick={() => changeMonth(-1)} className="calender_button_left">
            {/* <Left /> */}
          </button>
          <input
            type="number"
            value={currentYear}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setCurrentYear(parseInt(e.target.value))}
          />
          <select
            value={currentMonth}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setCurrentMonth(parseInt(e.target.value))}>
            <option value="1">1월</option>
            <option value="2">2월</option>
            <option value="3">3월</option>
            <option value="4">4월</option>
            <option value="5">5월</option>
            <option value="6">6월</option>
            <option value="7">7월</option>
            <option value="8">8월</option>
            <option value="9">9월</option>
            <option value="10">10월</option>
            <option value="11">11월</option>
            <option value="12">12월</option>
          </select>
          <button onClick={() => changeMonth(1)}>{/* <Right /> */}</button>
        </div>
        <div className="w-full h-[15.4375rem]">
          <table className="w-full h-full text-center border-y border-solid border-[#CACACA]">
            <thead className="border-b-[0.5px] border-[#CACACA]">
              <tr className="h-[1.4375rem] text-[#A4A4A4]">
                {DAY_OF_WEEK.map((day, i) => {
                  return (
                    <td
                      key={i}
                      className={`${i === 0 && 'text-lightRed'} ${i === 6 && 'text-lightBlue'} text-xs align-middle`}>
                      {day}
                    </td>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {calender.map((week_arr, j) => {
                return (
                  <tr key={j} className="h-[3.0625rem]">
                    {week_arr.map((day, i) => {
                      let className = null;
                      if (day !== '') {
                        //   if (todayYear === currentYear && todayMonth === currentMonth && todayDay === Number(day))
                        //     className = 'today';
                        //   else if (currentDay === Number(day)) className = 'selectToday';
                        //   else className = 'tbody_Day_td';
                      } else className = null;
                      return (
                        <td key={i} className="text-[0.5rem]">
                          {day}
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
