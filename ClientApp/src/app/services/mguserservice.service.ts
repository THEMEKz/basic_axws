import { Injectable, ElementRef } from '@angular/core';

import Map from "@arcgis/core/Map"
import MapView from "@arcgis/core/views/MapView"
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import Graphic from "@arcgis/core/Graphic"
import Point from "@arcgis/core/geometry/Point"

@Injectable({
  providedIn: 'root'
})
export class MguserserviceService {
  map!: Map
  mapView!: MapView
  constructor() { }

  initalMap(dom:ElementRef){
    this.map = new Map({
      basemap: "topo-vector"
    })

    this.mapView = new MapView({
      map: this.map,
      container : dom.nativeElement,
      center: [100.5433989, 13.7029924], // longitude, latitude
      zoom: 20,
    })

    this.mapView.when(()=>{
      this.mapView.on("click",(clickresponse)=>{
        // console.log('click form service: ',clickresponse)
        
        this.goToposition(clickresponse.mapPoint.latitude,clickresponse.mapPoint.longitude)
      })
    }
    )
  }




  goToposition(lat:number,long:number){
    this.mapView.graphics.removeAll()
    this.mapView.goTo({
      center:[long,lat],
      zoom:16
    },{
      duration:1000
    })

    // create symbol
    const symbol = new SimpleMarkerSymbol({
      style: "circle",
      color: "red",
      size: "10px",
      outline: {
        color: [ 255, 255, 255 ],
        width: 1
      }
    })

    const point = new Point({
      latitude: lat,
      longitude: long
    })

    // create graphic layer
    const graphic = new Graphic({
      geometry:point,
      symbol:symbol
    })

    this.mapView.graphics.add(graphic)
  }
}
