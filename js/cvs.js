import axios from 'axios'

// 스트링값 포맷팅 함수 (파이썬과 같음)
String.prototype.format = function() {
  var formatted = this
  for (var i = 0; i < arguments.length; i++) {
      var regexp = new RegExp('\\{'+i+'\\}', 'gi')
      formatted = formatted.replace(regexp, arguments[i])
  }
  return formatted;
}

var mapContainer = document.getElementById('map'), // 지도를 표시할 div
    mapOption = {
        center: new daum.maps.LatLng(37.247644, 127.079115), // 지도의 중심좌표
        level: 5 // 지도의 확대 레벨
    };

var map = new daum.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

// axios로 로컬 API 요청 받아오기
function getDataFromAPI() {
  axios.get('http://207.148.94.157/api/cvs/')
  .then( reply => {for(var i=0; i<reply.data.length; i++){
    var data = reply.data[i]
    // 편의점별 데이터 정리 오브젝트
    // ds_info: department store information
    // ternary 컨디션 사용. 읽는법: 커디션이 true면 첫 번째 값, 아니면 둘째값
    var dsInfo = {
      cvsNum: data.cvsNunmber,
      delivery: data.delivery ? 'active' : 'inactive',
      atm: data.atm ? 'active' : 'inactive',
      medicine: data.medicine ? 'active' : 'inactive',
      lotto: data.lotto ? 'active' : 'inactive'
    }

    var titleData = data.name
    var latitudeData = data.latitude
    var longitudeData = data.longitude
    var positionData = {
      title: titleData,
      latlng: new daum.maps.LatLng(latitudeData, longitudeData)
    }
    handleAPIData(positionData, dsInfo)
  }})
  .catch( error => { console.log(error) })
}

function handleAPIData(data, dsInfo) {
  // 마커를 표시할 위치와 title 객체 배열입니다
  var positions = [];
  var dsInfoArray = [];
  positions.push(data)
  dsInfoArray.push(dsInfo)
  drawMap(positions, dsInfoArray)
  //infoWindow(positions)
}

function drawMap(positions, dsInfoArray) {
  // 마커 이미지의 이미지 주소입니다
  var imageSrc = "http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

  for (var i = 0; i < positions.length; i ++) {

      // 마커 이미지의 이미지 크기 입니다
      var imageSize = new daum.maps.Size(24, 35);

      // 마커 이미지를 생성합니다
      var markerImage = new daum.maps.MarkerImage(imageSrc, imageSize);

      // 마커를 생성합니다
      var marker = new daum.maps.Marker({
          map: map, // 마커를 표시할 지도
          position: positions[i].latlng, // 마커를 표시할 위치
          title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          image : markerImage // 마커 이미지
        }
      );

      var dsInfoItem = dsInfoArray[i]
      var deliveryHTML = dsInfoItem.delivery == 'active' ? '<img id="delivery" class="ds_info" src="http://127.0.0.1:8000/static/cvsinfoimage/delivery.png">' : ''
      var atmHTML = dsInfoItem.atm == 'active' ? '<img id="atm" class="ds_info atm" src="http://127.0.0.1:8000/static/cvsinfoimage/atm.png">' : ''
      var medicineHTML = dsInfoItem.medicine == 'active' ? '<img id="medicine" class="ds_info medicine" src="http://127.0.0.1:8000/static/cvsinfoimage/medicine.png">' : ''
      var lottoHTML = dsInfoItem.lotto == 'active' ? '<img id="lotto" class="ds_info lotto" src="http://127.0.0.1:8000/static/cvsinfoimage/lotto.png">' : ''

      var dsInfoImgs = `
      <div class="ds_info_mini_sec">
        {0}
        {1}
        {2}
        {3}
      </div>
      `.format(deliveryHTML, atmHTML, medicineHTML, lottoHTML)

      var iwContent = `
      <div class="ds_info_sec" style="padding:5px;">
        <div class="cvs_name">
        {0}
        </div>
        {1}
      </div>
      `.format(positions[i].title, dsInfoImgs)

      var iwPosition = positions[i].latlng;

      var infowindow = new daum.maps.InfoWindow({
        position : iwPosition,
        content : iwContent
      });

      // 이벤트 리스터 등록하기
      daum.maps.event.addListener(marker, 'mouseover', function() {
        infowindow.open(map, marker)
      })

      daum.maps.event.addListener(marker, 'mouseout', function() {
        infowindow.close()
      })
    }
}


document.addEventListener('DOMContentLoaded', getDataFromAPI()) // 웹사이트가 로딩하였을 때 실행시키는 자바스크립트 이벤트
                                                                // 로딩이 완료되면 getDataFromAPI 함수를 실행시킴

document.addEventListener("submit", e => {
  e.preventDefault()
})

document.addEventListener('click', e => {

  if (e.target.id == 'cu') {
    console.log('clicked cu')
  }

  else if (e.target.id == 'gs25') {
    console.log('clicked gs25')
  }

  else if ((e.target.id == 'postbox1') || (e.target.id == 'postbox2')) {
    console.log('clicked postbox')
  }

  else if ((e.target.id == 'ATM1') || (e.target.id == 'ATM2')) {
    console.log('clicked ATM')
  }

  else if ((e.target.id == 'medicine1') || (e.target.id == 'medicine2')) {
    console.log('clicked medicine')
  }

  else if ((e.target.id == 'lotto1') || (e.target.id == 'lotto2')) {
    console.log('clicked lotto')
  }

})
