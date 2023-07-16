/*
  찜하기 버튼 핸들러 (토글 방식으로 작동)
  쿠키는 JSON을 string 변환하여 관리
  쿠키를 읽어와서 JSON.parse
  버튼이 눌린 아이템의 contentId가 존재하면 해당 항목을 삭제하고
  없으면 항목을 추가한다.
  JSON 가공이 끝났으면 다시 JSON.stringify 후 쿠키 저장
*/
function toggleFavorites(contentId, title, imageUrl) {
  event.stopPropagation();
  // console.log(contentId, title, imageUrl);
  const addCookieObj = {
    contentId: contentId,
    title: title,
    firstimage: imageUrl,
  };

  let cookie = getCookie("favorites");
  let cookieJSON = cookie ? [...JSON.parse(cookie)] : [];
  let isExist = false;
  let dupIndex = -1;
  if (cookie) {
    // 쿠키값이 있음 (빈배열 일 수는 있음)
    $.each(cookieJSON, function (i, item) {
      if (item.contentId == contentId) {
        isExist = true;
        dupIndex = i;
      }
    });
    if (isExist) {
      // 쿠키에 해당 contentId가 존재, 항목 삭제
      cookieJSON.splice(dupIndex, 1);
      showToast("찜 목록에서 제거되었습니다");
    } else {
      // 쿠키에 해당 contentId가 없음, 항목 추가
      cookieJSON = [...cookieJSON, addCookieObj];
      showToast("찜 목록에 추가하였습니다");
    }
  } else {
    // 쿠키값이 없음, 첫 값 추가
    cookieJSON = [addCookieObj];
    showToast("찜 목록에 추가하였습니다");
  }
  setCookie("favorites", JSON.stringify(cookieJSON), 30);
  drawFavorites();
}

$(function () {
  const toastDOM = '<div class="toast-message">' + '<div id="toastMessage"></div>' + '<i class="icon-cross2" onclick="closeToast();"></i>' + "</div>";
  $("body").append(toastDOM);
});
// 찜 목록에서 찜 목록 삭제
function deleteFavorite(contentId) {
  event.stopPropagation();
  let cookie = getCookie("favorites");
  let cookieJSON = cookie ? [...JSON.parse(cookie)] : [];
  let dupIndex = -1;
  $.each(cookieJSON, function (i, item) {
    // console.log(item.contentId, contentId)
    if (item.contentId == contentId) {
      dupIndex = i;
    }
  });
  // console.log(dupIndex)
  cookieJSON.splice(dupIndex, 1);

  setCookie("favorites", JSON.stringify(cookieJSON), 30);
  drawFavorites();
  showToast("찜 목록에서 제거되었습니다");
}

/*
  찜 목록 그리기
  쿠키를 불러와서 JSON.parse
  반복문 돌려서 제목, 사진을 목록으로 출력
  각 목록마다 클릭하면 상세 페이지로 넘어갈 수 있도록
  클릭 이벤트도 추가
*/
function drawFavorites() {
  let cookie = getCookie("favorites");
  const cookieJSON = cookie ? [...JSON.parse(cookie)] : [];
  let output = "";
  if (cookieJSON.length == 0) {
    output += "<span>찜 목록을 추가해주세요</span>";
  } else {
    $.each(cookieJSON, function (i, item) {
      output += `<li onclick="viewDetail('${item.contentId}');">`;
      output += `<div><img src="${item.firstimage != "" ? item.firstimage : "../../images/noimage_restaurants.png"}" /></div>`;
      output += `<div><i class="icon-star3" onclick="deleteFavorite('${item.contentId}');"></i>${item.title}</div>`;
      output += `</li>`;
    });
  }
  // console.log(output);
  $("#favorites-list").html(output);
  updateFavoritesIcon();
}

function updateFavoritesIcon() {
  let cookie = getCookie("favorites");
  const cookieJSON = cookie ? [...JSON.parse(cookie)] : [];

  $(".favoriteIcon").removeClass("active");
  $.each(cookieJSON, function (i, item) {
    $(`#i${item.contentId}`).addClass("active");
  });
}

// contentId를 파라메터로 detail.html으로 이동
function viewDetail(contentId) {
  location.href = `./detail.html?contentId=${contentId}`;
}

function showToast(msg) {
  $(".toast-message").removeClass("on");
  $("#toastMessage").html(msg);
  setTimeout(() => {
    $(".toast-message").addClass("on");
  }, 50);
}
function closeToast() {
  $(".toast-message").removeClass("on");
}
