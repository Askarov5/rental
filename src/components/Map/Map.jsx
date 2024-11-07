import useSWR from 'swr'
import React, { memo, useEffect, useState } from 'react'
import { load } from '@2gis/mapgl';
import geoCoder from "@/utils/geoCoder";
const GIS_API_KEY = 'cf996ea7-1382-4529-9110-68cdcc0f13f6';

export const Map = (address, id) => {
    const [point, setPoint] = useState(null);

    useEffect(() => {
        const getGeoCode = () => fetch(`https://catalog.api.2gis.com/3.0/items/geocode?q=${address}&fields=items.point,items.geometry.centroid&key=${GIS_API_KEY}`)
            .then((res) => res.json())
            .then(res => {
                const point = res.result.items[0].point
                setPoint(point)
            })
        getGeoCode();
    }, [address])

    useEffect(() => {
        let map;
        console.log(point)
        load().then((mapglAPI) => {
            map = new mapglAPI.Map('map-container', {
                center: [point.lat, point.lon],
                zoom: 13,
                key: GIS_API_KEY,
            });
        });

        // Удаляем карту при размонтировании компонента
        return () => map && map.destroy();
    }, [point]);

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <div id="map-container" style={{ width: '100%', height: '100%' }}></div>
        </div>
    );
};