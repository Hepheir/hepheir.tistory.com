var isMobile = window.innerWidth > window.innerHeight ? false : true;
console.log('isMobile :', isMobile);

// var isMobile = window.innerWidth > window.innerHeight ? false : true;
// console.log('isMobile :', isMobile);


// 2016 10 30 에 작성. protected article이 focus되었을 때 opacity transition을 받지 않도록 해주는 기능.

class ProtectedFeeds {
  constructor() {
    this.feedPw = document.querySelectorAll('.feed-protected__article_password');

    this.addEventListeners();
  }

  addEventListeners() {
    for (var i = 0; i < this.feedPw.length; i++) {
      this.feedPw[i].addEventListener('focus', this.onFocused);
      this.feedPw[i].addEventListener('focusout', this.unFocused);
    }
  }

  onFocused(evt) {
    event.target.parentNode.parentNode.classList.add('--focused');
  }

  unFocused(evt) {
    event.target.parentNode.parentNode.classList.remove('--focused');
  }
}
new ProtectedFeeds();


// 2016 10 25 에 작성. 날짜, 윤년 계산을 세심히 하지 않았으므로 수능 끝나고 다시 검토 할 것을 당부.

class DateFix {
  constructor() {
    this.feedDate = document.querySelectorAll('.feed__date');
    this.date = new Date();
    this.td = {
      year : this.date.getFullYear(),
      month : this.date.getMonth() + 1, // month : 0 ~ 11 (zero-based index)
      day : this.date.getDate(),
      hour : this.date.getHours(),
      minute : this.date.getMinutes()
    };

    this.fixDate = this.fixDate.bind(this);

    for (var i = 0; i < this.feedDate.length; i++) {
      this.fixDate(this.feedDate[i]);
    }
  }

  fixDate(_feedDate) {
    this.a = _feedDate.innerHTML.split('.');
    this.fd = {
      year : parseInt(this.a[0]),
      month : parseInt(this.a[1]),
      day : parseInt(this.a[2].split(' ')[0]),
      hour : parseInt(this.a[2].split(' ')[1].split(':')[0]),
      minute : parseInt(this.a[2].split(' ')[1].split(':')[1])
    };

    if (this.td.year > this.fd.year) {
      this.fixedDate = this.td.year - 1 > this.fd.year ? `${this.td.year - this.fd.year}년` : `${this.td.month - this.fd.month + 12}달`;
    }
    else if (this.td.month > this.fd.month) {
      this.fixedDate = this.td.month - 2 > this.fd.month ? `${this.td.month - this.fd.month}달` : `${Math.floor((this.td.day - this.fd.day + (this.td.month - this.fd.month) * (new Date(this.fd.year, this.fd.month, 0)).getDate())/7)}주`;
    }
    else if (this.td.day > this.fd.day) {
      this.fixedDate = this.td.day - 1 > this.fd.day ? `${this.td.day - this.fd.day}일` : `${this.td.hour - this.fd.hour + 24}시간`;
    }
    else {
      this.fixedDate = this.td.hour > this.fd.hour ? `${this.td.hour - this.fd.hour}시간` : `${this.td.minute - this.fd.minute}분`;
    }
    console.log(this.td.month, this.fd.month);

    _feedDate.innerHTML = this.fixedDate;
  }
}

new DateFix();
