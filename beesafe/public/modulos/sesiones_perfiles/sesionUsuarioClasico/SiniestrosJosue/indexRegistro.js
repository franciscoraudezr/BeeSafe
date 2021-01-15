function geo(lon,lat,tipoSiniestro){
    var geojson = {
      type: 'FeatureCollection',
        features: [{
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [lon, lat]//Preguntar
        },
          properties: {
          title: tipoSiniestro,//Preguntar
          description: 'Cenfotec'//Preguntar
        }
        }]};
        return geojson;
  }//  
      
  
  function addMarker (geoG){
    geoG.features.forEach(function(marker) {
      var el = document.createElement('div');
    el.className = 'marker';
  
    // make a marker for each feature and add to the map
    new mapboxgl.Marker(el)
      .setLngLat(marker.geometry.coordinates)
      .setPopup(new mapboxgl.Popup({ offset: 5 }) // agrega los popups
      .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>'))// agrega los popups
      .addTo(map);
  });
  }


function registro() {
    let datos = ["ruta", "asistencia", "tipoSiniestro","descripcion"];
    let valores = {};
    let aprobado = false;

    for (let dato of datos) {
       
        if(document.getElementById(dato).value==""||document.getElementById(dato).value==undefined){
            swal({
                title: "Registro Incorrecto",
                text: "Debe completar todos los campos de manera correcta",
                icon: "warning",
                button: "Continuar",
            });//josue
            aprobado = false;
            return;
        }
        if(dato=="asistencia"){
            valores[dato] = document.getElementById(dato).checked ;// trasnforma el true y false en 1 o 0 
            console.log(valores[dato]);
        }else{
            valores[dato] = document.getElementById(dato).value;
        }
     
        valores["longitude"]=longitude;
        valores["latitude"]=latitude;

    }




   fetch('/reporteSiniestro/insertar', { 
        method: 'POST',
        body: JSON.stringify(valores),
        headers: {"Content-Type": "application/json"}//le dice a mongo que la informmacion es tipo json

    }).then(response => response.json())
    .then(data=>{addMarker(geo(longitude, latitude, tipoSiniestro.value))})
    //then(res => res.json())
        //.catch(error => console.log('Error:', error))
       // .then(response => console.log('Success:', response));



    }
 
       
      
  
