// ----------------------------- map.js 전체 -----------------------------
document.addEventListener("DOMContentLoaded", function () {
    kakao.maps.load(function () {
        const mapContainer = document.getElementById('map');
        const mapOption = {
            center: new kakao.maps.LatLng(37.5665, 126.9780),
            level: 5
        };
        const map = new kakao.maps.Map(mapContainer, mapOption);

        // 줌 컨트롤 추가
        const zoomControl = new kakao.maps.ZoomControl();
        map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

        // 마커 이미지 설정
        const imageSrc = '/images/store/theliter_marker.svg';
        const imageSize = new kakao.maps.Size(40, 50);
        const imageOption = { offset: new kakao.maps.Point(20, 50) };
        const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

        // 매장 데이터
        const storeData = [
            { name: '더리터 수원중북점', latlng: new kakao.maps.LatLng(37.302368, 127.011401) },
            { name: '더리터 잠실삼전점', latlng: new kakao.maps.LatLng(37.505177, 127.094981) },
            { name: '더리터 대치점', latlng: new kakao.maps.LatLng(37.501498, 127.059355) },
            { name: '더리터 군산센트럴파크점', latlng: new kakao.maps.LatLng(35.971503, 126.732688) },
            { name: '더리터 운정해오름마을점', latlng: new kakao.maps.LatLng(37.728733, 126.770208) },
            { name: '더리터 성균관대점', latlng: new kakao.maps.LatLng(37.300372, 126.974464) },
            { name: '더리터 서초서일초점', latlng: new kakao.maps.LatLng(37.487993, 127.008889) },
            { name: '더리터 방이역점', latlng: new kakao.maps.LatLng(37.508844, 127.120204) },
            { name: '더리터 직영종로점', latlng: new kakao.maps.LatLng(37.570448, 126.991002) },
            { name: '더리터 부여홍산점', latlng: new kakao.maps.LatLng(36.274887, 126.829788) }
        ];

        // 마커 + 커스텀 오버레이 생성
        storeData.forEach((store) => {
            // 마커 생성
            new kakao.maps.Marker({
                map,
                position: store.latlng,
                title: store.name,
                image: markerImage
            });

            // 커스텀 오버레이 생성
            const overlayContent = `
                <div class="custom_label">${store.name}</div>
            `;
            const customOverlay = new kakao.maps.CustomOverlay({
                content: overlayContent,
                position: store.latlng,
                yAnchor: 1
            });
            customOverlay.setMap(map);
        });

        // 매장 목록 클릭 시 지도 이동
        const storeItems = document.querySelectorAll('.store_list_box');
        storeItems.forEach((item, idx) => {
            item.addEventListener('click', () => {
                const targetPosition = storeData[idx].latlng;
                map.setCenter(targetPosition);
                map.setLevel(3); // 확대 정도
            });
        });
    });
});

