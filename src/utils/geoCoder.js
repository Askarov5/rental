const GIS_API_KEY = 'cf996ea7-1382-4529-9110-68cdcc0f13f6';

const geoCoder= (address) => fetch(`https://catalog.api.2gis.com/3.0/items/geocode?q=${address}&fields=items.point,items.geometry.centroid&key=${GIS_API_KEY}`)
.then((res) => res.json())
.then(res => {
    console.log(res);
    const point = res.result.items[0].point
    return point;
})

export default geoCoder;