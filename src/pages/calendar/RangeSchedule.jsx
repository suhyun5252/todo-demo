import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./range.css";
function RangeSchedule() {
  const [date, setDate] = useState(new Date());
  // 샘플 일정
  const scheduleData = {
    "sc-1": {
      startDate: "2024-12-07",
      endDate: "2024-12-14",
      event: {
        id: 1,
        title: "🎃 프로젝트 기간",
        desc: "1차 프로젝트 협업 과제 기획 기간",
        eventBgColor: "#be60fd",
        eventColor: "#333",
        startDate: "2024-12-07",
        endDate: "2024-12-14",
      },
    },
    "sc-2": {
      startDate: "2024-12-01",
      endDate: "2024-12-17",
      event: {
        id: 2,
        title: "🎵 공부 기간",
        desc: "1차 프로젝트 협업 과제 기획 기간",
        eventBgColor: "pink",
        eventColor: "#333",
        startDate: "2024-12-01",
        endDate: "2024-12-17",
      },
    },
    "sc-3": {
      startDate: "2024-11-01",
      endDate: "2024-12-12",
      event: {
        id: 3,
        title: "🎁 테스트기간",
        desc: "1차 프로젝트 협업 과제 기획 기간",
        eventBgColor: "#ff763f",
        eventColor: "#333",
        startDate: "2024-12-01",
        endDate: "2024-12-17",
      },
    },
  };

  // 특정 날짜의 모든 일정을 뽑아서 관리해줄 함수
  const getEventDate = date => {
    // 날짜를 이용해서 출력시킬 데이터를 선택하도록 한다
    // 일정 중에 몇개나 겹칠지 모른다.
    let allEvents = [];

    // 범위에 맞는 내용 처리
    // 반복문 사용한다
    // 모든  scheduleData 에 저장해둔 내용에서 반복문을 돌린다.
    // "sc-1" ,"sc-2","sc-3"
    Object.keys(scheduleData).forEach(item => {
      // 하나 하나 객체에 있는 내용(키)을 알아낸다
      const rangeSchedule = scheduleData[item];
      //   console.log(rangeSchedule);

      //   데이트 객체로 만들어 날짜를 비교하는 용도로 활용한다.
      if (isDateInRange(date, rangeSchedule.startDate, rangeSchedule.endDate)) {
        //   내용
        const content = rangeSchedule.event;
        allEvents.push(content);
      }

      //   // 내용
      //   const event = rangeSchedule.event;
      //   // console.log("시작", startDay, "마감", endDay, "이벤트", event);
      //   dayEvents.push(event);
    });
    return allEvents;
  };
  //   특정한 시작과 종료 날짜의 범위에 있는지 없는지를 검사하는 함수
  const isDateInRange = (날짜, 시작일, 종료일) => {
    // 날짜가 시작일보다 작은지
    // 날짜가 종료일보다 큰지
    const checkDay = new Date(날짜); // "2024-12-06"
    const startDay = new Date(시작일); // "2024-12-05"
    const endDay = new Date(종료일); // "2024-12-14"

    return checkDay >= startDay && checkDay <= endDay;
  };

  // 날짜 타일에 출력할 내용 자리
  const formatShortWeekday = (locale, date) => {
    const weekName = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    return weekName[date.getDay()];
  };

  const tileContent = e => {
    const { date, view } = e;
    // 뽑아놓은 데이터를 모아준다
    let dayEvents = [];
    if (view === "month") {
      const formatedDate = date.toLocaleDateString("en-CA"); // "YYYY-MM-DD" 형식
      // 특정 날짜를 전달한다
      // 날짜를 이용 > 비교 > 일정있는지? > 있다면 몇개인지?
      dayEvents = getEventDate(formatedDate);
      console.log(dayEvents);

      //   const test = Object.keys(scheduleData);
      //   console.log(test);

      //   console.log(dayEvents);

      // html 만들기
      if (dayEvents.length > 0) {
        // 데이터가 있다면 비교 날짜와 시작 날짜가 같은 경우에 대해서만 글자 출력

        // 시작부터 종료일까지 배경색만 출력
        return (
          <div>
            {dayEvents.map(item => (
              <div
                key={item.id}
                style={{
                  height: 25,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: `${item.eventBgColor}`,
                  color: `${item.eventColor}`,
                  borderRadius:
                    formatedDate === item.startDate
                      ? "10px 0px 0px 10px"
                      : formatedDate === item.endDate
                        ? "0px 10px 10px 0px"
                        : "0",
                }}
              >
                {formatedDate === item.startDate && item.title}
              </div>
            ))}
          </div>
        );
      }
    }
  };

  return (
    <div>
      <h1>RangeSchedule</h1>
      <div>
        <Calendar
          calendarType="gregory"
          formatShortWeekday={formatShortWeekday}
          value={date}
          onChange={e => setDate(e)}
          tileContent={e => tileContent(e)}
        />
      </div>
    </div>
  );
}
export default RangeSchedule;
