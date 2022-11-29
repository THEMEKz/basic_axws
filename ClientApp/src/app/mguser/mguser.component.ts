import { Component, Input, OnInit, ViewChild, ElementRef} from '@angular/core';

import { AxRequestService } from '@atlasx/core/http-service';
import { MguserserviceService } from '../services/mguserservice.service';

@Component({
  selector: 'app-mguser',
  templateUrl: './mguser.component.html',
  styleUrls: ['./mguser.component.scss']
})
export class MguserComponent implements OnInit {
  @ViewChild("divMap") divMap!: ElementRef
  tmp:any
  isDisplay:boolean = false
  data: {
    gender:string,
    latitude:string,
    longtitude:string,
    mobile:string,
    name:string,
    surname:string,
    user_id:number
  }[] = []

  search_word:string = ""
  search_data: {
    gender:string,
    latitude:string,
    longtitude:string,
    mobile:string,
    name:string,
    surname:string,
    user_id:number
  }[] = []
  search_switch:boolean = false

  mode:string = 'add'

  data_tmp: {
    gender:string,
    latitude:string,
    longtitude:string,
    mobile:string,
    name:string,
    surname:string,
    user_id:number
  }
  index_clear:number = -1
  // Display value
  @Input() gender:string
  @Input() latitude:string
  @Input() longtitude:string
  @Input() mobile:string
  @Input() name:string = ''
  @Input() surname:string
  @Input() user_id:number
  
  constructor(
    private axRequestService:AxRequestService,
    private mguserserviceService:MguserserviceService,
    
  ) { }

  ngOnInit(): void {
    this.tempUserQ()
  }

  ngAfterViewInit(){
    this.mguserserviceService.initalMap(this.divMap)

    this.mguserserviceService.mapView.when(()=>{
      this.mguserserviceService.mapView.on("click",(clickresponse)=>{
        console.log('click form mg: ',clickresponse)
        this.latitude = clickresponse.mapPoint.latitude
        this.longtitude = clickresponse.mapPoint.longitude
      })
    })
  }

  // Search 
  searchInput(){
    // 1
    this.search_data = []
    if(this.search_word.length>0){
      for(let i = 0;i<this.data.length;i++){
        if(this.data[i].name != null && this.data[i].surname != null){
          let texttmp = this.data[i].name.toLowerCase() + this.data[i].surname.toLowerCase()
          if(texttmp.includes(this.search_word)){
            this.search_data.push(this.data[i])
          }
        }
      }
      console.log('Search : ',this.search_data)
      this.search_switch = true
    }else{
      this.search_switch = false
    }

    // 2
    // this.search_data = []
    // if(this.search_word.length>0){
    //   for(let i = 0;i<this.data.length;i++){
    //     if(this.data[i].name != null){
    //       let texttmp = this.data[i].name.toLowerCase()
    //       if(texttmp.includes(this.search_word)){
    //         this.search_data.push(this.data[i])
    //       }
    //     }
    //     if(this.data[i].surname != null){
    //       let texttmp = this.data[i].surname.toLowerCase()
    //       if(texttmp.includes(this.search_word)){
    //         this.search_data.push(this.data[i])
    //       }
    //     }
    //   }
    //   console.log('Search : ',this.search_data)
    //   this.search_switch = true
    // }else{
    //   this.search_switch = false
    // }
  }

  // befor to add user
  toAdd(){
    this.mode = 'add'
    this.gender = ''
    this.latitude = ''
    this.longtitude = ''
    this.mobile = ''
    this.name = ''
    this.surname = ''
    this.user_id = 0
    this.mguserserviceService.mapView.graphics.removeAll()
  }

  // Clear display
  setZero(){
    this.gender = ''
    this.latitude = ''
    this.longtitude = ''
    this.mobile = ''
    this.name = ''
    this.surname = ''
    this.mguserserviceService.mapView.graphics.removeAll()
  }
  clear_btn(){
    // this.mode = 'update'
    this.gender = this.data_tmp.gender
    this.latitude = this.data_tmp.latitude
    this.longtitude = this.data_tmp.longtitude
    this.mobile = this.data_tmp.mobile
    this.name = this.data_tmp.name
    this.surname = this.data_tmp.surname
    this.user_id = this.data_tmp.user_id
    this.mguserserviceService.mapView.graphics.removeAll()
    this.mguserserviceService.goToposition(Number(this.data_tmp.latitude),Number(this.data_tmp.longtitude))
  }
  
  // Show display
  toShowDetail(index:number){
    // this.showSuccess()
    this.mode = 'update'
    this.gender = this.data[index].gender
    this.latitude = this.data[index].latitude
    this.longtitude = this.data[index].longtitude
    this.mobile = this.data[index].mobile
    this.name = this.data[index].name
    this.surname = this.data[index].surname
    this.user_id = this.data[index].user_id

    this.data_tmp = {
      gender: this.gender,
      latitude: this.latitude,
      longtitude: this.longtitude,
      mobile: this.mobile,
      name: this.name,
      surname: this.surname,
      user_id: this.user_id
    }
    console.log('data+tmp = ',this.data_tmp)

    this.isDisplay = true
    this.mguserserviceService.goToposition(Number(this.latitude),Number(this.longtitude))
  }

  toShowDetail2(index:number){
    // this.showSuccess()
    this.mode = 'update'
    this.gender = this.search_data[index].gender
    this.latitude = this.search_data[index].latitude
    this.longtitude = this.search_data[index].longtitude
    this.mobile = this.search_data[index].mobile
    this.name = this.search_data[index].name
    this.surname = this.search_data[index].surname
    this.user_id = this.search_data[index].user_id

    this.data_tmp = {
      gender: this.gender,
      latitude: this.latitude,
      longtitude: this.longtitude,
      mobile: this.mobile,
      name: this.name,
      surname: this.surname,
      user_id: this.user_id
    }
    console.log('data+tmp = ',this.data_tmp)
    this.isDisplay = true
    this.mguserserviceService.goToposition(Number(this.latitude),Number(this.longtitude))
  }
  
  // Update button
  toUpdate(){   
    // Add user
    if(this.mode == 'add'){
      console.log('Mode : add')
      let params = {
        NAME : this.name,
        SURNAME : this.surname,
        MOBILE : this.mobile,
        GENDER : this.gender,
        LATITUDE : this.latitude,
        LONGITUDE : this.longtitude
      }
  
      this.axRequestService.sp("TEMP_USER_I","POST",params).toPromise().then((response)=>{
        console.log('Add user : ',response)
        this.tempUserQ()
        this.setZero()
        this.mguserserviceService.mapView.graphics.removeAll()
      })
    // Update user
    }else{
      console.log('Mode : update')
      let params = {
        USER_ID: this.user_id,
        NAME : this.name,
        SURNAME : this.surname,
        MOBILE : this.mobile,
        GENDER : this.gender,
        LATITUDE : this.latitude,
        LONGITUDE : this.longtitude
      }
  
      this.axRequestService.sp("TEMP_USER_U","POST",params).toPromise().then((response)=>{
        console.log('Edit user : ',response)
        this.tempUserQ()
        // this.setZero()
        // this.mguserserviceService.mapView.graphics.removeAll()
        if(this.search_switch){
          this.search_word = ''
          this.search_switch = false
          this.searchInput()
          this.setZero()
        }
        // this.searchInput()
      })
    }
  }

  // Delete
  toDelete(){
    let params = {
      USER_ID: this.user_id,
    }
    this.axRequestService.sp("TEMP_USER_D","POST",params).toPromise().then((response)=>{
      console.log('Delete user : ',response)
      this.tempUserQ()
      this.setZero()
      this.user_id = 0
    })
    this.mguserserviceService.mapView.graphics.removeAll()

  }

  // Get All
  tempUserQ(){
    this.data = []
    let params = {
      // USER_ID:1,
    }

    this.axRequestService.sp("TEMP_USER_Q","POST",params).toPromise().then((response)=>{
      // console.log('respone : ',response)
      this.tmp = response
      // this.data = this.tmp.data
      for(let i of this.tmp.data){
        let tmpData = {
          gender : i.GENDER,
          latitude : i.LATITUDE,
          longtitude : i.LONGITUDE,
          mobile: i .MOBILE,
          name : i .NAME,
          surname: i.SURNAME,
          user_id : i.USER_ID
        }
        this.data.push(tmpData)
      }
      console.log('data : ',this.data)
    })
  }
}
