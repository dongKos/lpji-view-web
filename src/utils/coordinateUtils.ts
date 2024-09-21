export const getPolygonCenter = (paths: number[][]) => {
    const { naver } = window as any;
    const initialPoint = new naver.maps.LatLng(paths[0][1], paths[0][0]);
    const bounds = new naver.maps.LatLngBounds(initialPoint);

    paths.forEach(([lng, lat]) => {
        bounds.extend(new naver.maps.LatLng(lat, lng));
    });

    return bounds.getCenter();
};
