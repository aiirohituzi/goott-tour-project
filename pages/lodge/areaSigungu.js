function areaList() {
  const apiKey =
    'LAq%2FybdsYKqtAbe1T8fBzUMyL2zn2GGMHvbKELi7l2I%2FIQs%2F0%2By%2F1wcIXgdzcF2duZszTQB0sWy5C8w%2BfXmG%2FA%3D%3D';

  $.ajax({
    url: `http://apis.data.go.kr/B551011/KorService1/areaCode1?ServiceKey=${apiKey}&numOfRows=17&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json`,
    type: 'get',
    dataType: 'json',
    async: false,
    success: function (data) {
      parsingData(data);
    },
    error: function () {},
    complete: function () {},
  });

  function parsingData(areaData) {
    const lodgeArr = areaData.response.body.items.item;
    $.each(lodgeArr, function (i, item) {
      areaCode = item.code;
      areaName = item.name;

      $.ajax({
        url: `http://apis.data.go.kr/B551011/KorService1/areaCode1?ServiceKey=${apiKey}&areaCode=${areaCode}&numOfRows=30&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json`,
        type: 'get',
        dataType: 'json',
        async: false,
        success: function (data) {
          parsingData2(data);
        },
        error: function () {},
        complete: function () {},
      });

      function parsingData2(sigunguData) {
        const lodgeArr = sigunguData.response.body.items.item;
        $.each(lodgeArr, function (i, item) {
          sigunguCode = item.code;
          sigunguName = item.name;

          console.log(areaCode, areaName, sigunguCode, sigunguName);
        });
      }
    });
  }
}
