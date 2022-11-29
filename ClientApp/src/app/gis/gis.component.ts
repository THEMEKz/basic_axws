import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { AxAuthenticationService } from '@atlasx/core/authentication'

import MapImageLayer from '@arcgis/core/layers/MapImageLayer'

import { GisService } from './gis.service'

import { AxRequestService } from '@atlasx/core/http-service'

@Component({
  selector: 'app-gis',
  templateUrl: './gis.component.html',
  styleUrls: ['./gis.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GisComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private hostRef: ElementRef<HTMLDivElement>,
    public gisService: GisService,
    public authService: AxAuthenticationService,
    private axRequestService:AxRequestService
  ) {}

  ngOnInit() {
    // Get functions from system id.
    const systemId: string = this.route.snapshot.data.systemId
    this.gisService.loadFunctions(systemId)

    // Create a new map.
    this.gisService.createMap(this.hostRef.nativeElement)

    /*** For test only ***/
    const atlasxLayer = new MapImageLayer({
      url: 'https://appserver2.cdg.co.th/arcgis/rest/services/AtlasX/City/MapServer',
      id: 'AtlasXCity',
    })
    // this.gisService.map.add(atlasxLayer)
    this.testSP()
  }
  testSP(){
    // console.log("TestSP")
    let params = {
      USER_ID:1,
      // PI_USERNAME: "AAA",
    }
    this.axRequestService.sp("UM_USER_Q","POST",params).toPromise().then((response)=>{
      console.log("---------",response)
    })
  }
}
