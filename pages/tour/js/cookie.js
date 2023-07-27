// cookie 저장
// 매개변수 : 쿠키이름:string, 쿠키값:string, 쿠키만료일(n일 후까지):Number
// 반환값 : 성공 시 true, 실패 시 false
function setCookie(key, value, expires) {
  let result = false;

  if (
    key !== undefined &&
    value !== undefined &&
    expires !== undefined &&
    key.length > 0 &&
    value.length > 0 &&
    Number(expires) > 0
  ) {
    let expiresDate = new Date();
    expiresDate.setDate(expiresDate.getDate() + Number(expires));
    let cookie = `${key}=${value};expires=${expiresDate.toUTCString()}`;
    document.cookie = cookie;
    result = true;
  }

  return result;
}

// cookie 읽기
// 매개변수 : 쿠키이름:string
// 반환값 : 쿠키값 or 없을 시 false
function getCookie(key) {
  let cookies = document.cookie.split(";");
  let cookieValue = false;

  for (let cookie of cookies) {
    if (cookie.trim().split("=")[0] === key) {
      cookieValue = cookie.split("=")[1];
      break;
    }
  }

  return cookieValue;
}

// cookie 삭제 () : string or -1
// 매개변수 : 쿠키이름
// 반환값 : 없음
function delCookie(key) {
  document.cookie = `${key}=;expires=${new Date().toUTCString()}`;
}
