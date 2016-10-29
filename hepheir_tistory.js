var isMobile = window.innerWidth > window.innerHeight ? false : true;
console.log('isMobile :', isMobile);

// var isMobile = window.innerWidth > window.innerHeight ? false : true;
// console.log('isMobile :', isMobile);


// 2016 10 25 에 작성. 날짜, 윤년 계산을 세심히 하지 않았으므로 수능 끝나고 다시 검토 할 것을 당부.

window.addEventListener('load', function(){
  var feedDate = document.querySelectorAll('.feed__date');
  var date = new Date();
  console.log(date);

  const td = {
    year : date.getFullYear(),
    month : date.getMonth() + 1, // month : 0 ~ 11 (zero-based index)
    day : date.getDate(),
    hour : date.getHours(),
    minute : date.getMinutes()
  };

  console.log(td);

  for (var i = 0; i < feedDate.length; i++) {
    a = feedDate[i].innerHTML.split('.');

    fd = {
      year : parseInt(a[0]),
      month : parseInt(a[1]),
      day : parseInt(a[2].split(' ')[0]),
      hour : parseInt(a[2].split(' ')[1].split(':')[0]),
      minute : parseInt(a[2].split(' ')[1].split(':')[1])
    };

    if (td.year > fd.year) {
      b = td.year - 1 > fd.year ? `${td.year - fd.year}년` : `${td.month - fd.month + 12}달`;
    }
    else if (td.month > fd.month) {
      b = td.month - 2 > fd.month ? `${td.month - fd.month}달` : `${Math.floor((td.day - fd.day + (td.month - fd.month) * (new Date( fd.year, fd.month, 0)).getDate())/7)}주`;
    }
    else if (td.day > fd.day) {
      b = td.day - 1 > fd.day ? `${td.day - fd.day}일` : `${td.hour - fd.hour + 24}시간`;
    }
    else {
      b = td.hour > fd.hour ? `${td.hour - fd.hour}시간` : `${td.minute - fd.minute}분`;
    }
    console.log(td.month, fd.month);

    feedDate[i].innerHTML = b;
  }
  console.log('fixed dates');
})
