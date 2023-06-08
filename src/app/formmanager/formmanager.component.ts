import { Component, ElementRef, OnInit, Renderer2 } from "@angular/core";
import {  NgForm } from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HttpService } from "../http.service";
import { DomSanitizer,SafeResourceUrl } from "@angular/platform-browser";



@Component({
  selector: "app-formmanager",
  templateUrl: "./formmanager.component.html",
  styleUrls: ["./formmanager.component.css"],
})
export class FormmanagerComponent implements OnInit {


  ngOnInit(): void {
    this.wizardBuilder()

  }
  
  formMetaResponse: any;
  form_data = new FormData();
  event_name: any;
  sub_portal: any;
  event_name_validator1: any;
  apiResponse: any;
  sampleResponse : any;
  wizardMenuArr: any = []
  // formMetaResponse :any;

  constructor(private http: HttpClient, private elRef: ElementRef, public renderer: Renderer2, private httpService: HttpService, private sanitizer: DomSanitizer) { }

  update_data(formData: any) {
    this.onSubmit(formData, (res: any) => {
      this.apiResponse = JSON.stringify(
        res["data"]
        
      );
      
    });
    
  }

  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  
  onSubmit(form: NgForm, callback?: Function | undefined) {

    const currentTimestampMs = new Date().getTime();
    this.form_data.set("entity_stamp", String(currentTimestampMs));

    const auth_token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6Ijk4OWJlMjM1LTk5OTUtNGVjYS04MGYyLWQ5ZTgzM2EwYTJjYSIsIlVzZXJJZCI6IjEiLCJQcm9kdWN0U3RhbXAiOiIzMTJkMTg5NS0yMTg1LTRiYWYtOTk5YS1mYWQ5OWUxMzQ2MDciLCJBY2NvdW50U3RhbXAiOiIzOTI0NWYxZi1lMTJkLTRhYTYtYTNiYy02ZTkxMzg5NzUxOGEiLCJQcm9kdWN0SWQiOiIyIiwiQWNjb3VudElkIjoiMiIsIlByb2R1Y3RTZXJ2aWNlU3RhbXAiOiIiLCJQcm9kdWN0TGlzdCI6IlswXSIsIlJvbGUiOiJhY2NvdW50X2FkbWluIiwiUm9sZUlkIjoiMCIsIklzQWRtaW4iOiIxIiwiTGFuZyI6ImVuIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6ImFiaGlzaGVrLmdhcmdAbXluZHNvbC5jb20iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJhYmhpc2hlay5nYXJnQG15bmRzb2wuY29tIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiIyOTNkZDNjZS1mY2Y0LTRkMDQtOTExMS0zYTk1MGU0M2I1YjkiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL2V4cGlyYXRpb24iOiJBcHIgVGh1IDE4IDIwMjQgMTA6MDY6NDQgQU0iLCJuYmYiOjE2ODE4MTI0MDQsImV4cCI6MTcxMzQxNTAwNCwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzE2OCIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjcxNjgifQ.UB3lq_EO7LV8sKO7995ID_q7SbGG8aUYs9pPy-ANB8M";

    const headers = new HttpHeaders({
      Authorization: "Bearer " + auth_token,
    });

    this.http
      .post("http://localhost:8000/api/file_uploader", this.form_data, {
        headers,
      })
      .subscribe({
        next(res) {
          console.log(res);
          if (typeof callback == "function") {
            callback(res);
          }
        },
        error(err) {
          console.log(err);
        },
      });
  }

  onFileChange(event: any) {
    if (event.target.files) {
      const file_upload = event.target.files[0];
      this.form_data.set("file", file_upload);
    }
  }

  sampleTemplateCallBack(event: any){
    this.SampleTemplateDownload(event,(res: any) => {
    this.sampleResponse = res.data
    window.open(this.sampleResponse)

  })
}

  SampleTemplateDownload(event: any, callback1: Function | undefined){
    
      if (event.target) {
        const payload = {
          "event_name": this.form_data.get('event_name'),
          "sub_portal": this.form_data.get('sub_portal')
        }
  
        const url = "http://localhost:8000/api/sample_template";
  
        this.httpService.getData(url, payload).subscribe(
          {
            next(res) {
              // callback1(res);
              if (typeof callback1 == "function") {
                callback1(res);
            }
          },
            error(err) {
                console.log(err)
              }
            ,
          })
        }
        
      }
    
  

  
  event_name_callback(event: any) {

    this.eventNameValidator(event, (res: any) => {
      this.event_name_validator1 = res
    });

  }

  eventNameValidator(event: any, callback?: Function | undefined) {
    if (event.target) {
      const payload = {
        "event_name": event.target.value
      }

      const url = "https://uatvendor.myndsolution.com/api/meta_data";

      this.httpService.getData(url, payload).subscribe(
        {
          next(res) {
            res = ''
          },
          error(err) {
            if (typeof callback == "function") {
              callback("Invalid event");
            }
          },
        }
      )
    }
  }

  

  // wizardMenuArr: any = [
  //   {
  //     formName: 'mf-wz-basic',
  //     control_name: "vm_wrd_lbl_basic",
  //     label: "vm_wrd_lbl_basic",
  //     menu_sequence: 1,
  //     menu_position: 0,
  //     data_step_target: "step3",
  //     spClass: "fa fa-credit-card"

  //   },
  //   {
  //     formName: 'mf-wz-property',
  //     control_name: "vm_wrd_lbl_properties",
  //     label: "vm_wrd_lbl_properties",
  //     menu_sequence: 2,
  //     menu_position: 1,
  //     data_step_target: "step3",
  //     spClass: "fa fa-building-o"
  //   },
  //   // {
  //   //     control_name: "vm_wrd_lbl_owner",
  //   //     label: "vm_wrd_lbl_owner",
  //   //     menu_sequence: 3,
  //   //     menu_position: 2,
  //   //     data_step_target: "step3",
  //   //     spClass: "fa fa-building-o"
  //   // },
  //   {
  //     formName: 'mf-wz-allocation',
  //     control_name: "vm_wrd_lbl_allocation",
  //     label: "vm_wrd_lbl_allocation",
  //     menu_sequence: 3,
  //     menu_position: 2,
  //     data_step_target: "step3",
  //     spClass: "fa fa-building-o"
  //   },

  //   {
  //     formName: 'mf-wz-deposit',
  //     control_name: "vm_wrd_lbl_deposit",
  //     label: "vm_wrd_lbl_deposit",
  //     menu_sequence: 4,
  //     menu_position: 3,
  //     data_step_target: "step3",
  //     spClass: "fa fa-building-o"
  //   },
  //   {
  //     formName: 'mf-wz-other-payout',
  //     control_name: "vm_wrd_lbl_otherPayout",
  //     label: "vm_wrd_lbl_otherPayout",
  //     menu_sequence: 5,
  //     menu_position: 4,
  //     data_step_target: "step3",
  //     spClass: "fa fa-building-o"
  //   },
  //   {
  //     formName: 'mf-wz-terms-and-conditions',
  //     control_name: "vm_wrd_lbl_termAndConditions",
  //     label: "vm_wrd_lbl_termAndConditions",
  //     menu_sequence: 6,
  //     menu_position: 5,
  //     data_step_target: "step3",
  //     spClass: "fa fa-building-o"
  //   },
  //   {
  //     formName: 'mf-wz-ind-as-116',
  //     control_name: "vm_wrd_lbl_indAs116",
  //     label: "vm_wrd_lbl_indAs116",
  //     menu_sequence: 7,
  //     menu_position: 6,
  //     data_step_target: "step3",
  //     spClass: "fa fa-building-o"
  //   },
  //   {
  //     formName: 'mf-wz-document',
  //     control_name: "vm_wrd_lbl_documents",
  //     label: "vm_wrd_lbl_documents",
  //     menu_sequence: 8,
  //     menu_position: 7,
  //     data_step_target: "step3",
  //     spClass: "fa fa-file-text-o"
  //   },
  //   {
  //     formName: 'mf-wz-rce',
  //     control_name: "vm_wrd_lbl_rent",
  //     label: "vm_wrd_lbl_rent",
  //     menu_sequence: 9,
  //     menu_position: 8,
  //     data_step_target: "step3",
  //     spClass: "fa fa-building-o"
  //   }
  // ]


  changeMenu(value: any) {
    this.form_data.set("event_name",this.wizardMenuArr[value].formName)
    this.sub_portal = (this.wizardMenuArr[value].control_name).split("mf-wz-")[1]
    this.form_data.set("sub_portal", this.sub_portal);
    console.log(this.form_data)
  
  }

  activeTab(tabname: any) {

    this.changeMenu(tabname)
   
    try {
      let el = this.elRef.nativeElement
        .querySelector(".menuwizard")
        .querySelector("ul")
        .querySelectorAll("li");
      let menuArr: any = []//this.getFinalWizardMenu();
      el.forEach((value: any, index: any) => {
        if (!menuArr.includes(index)) {
          this.renderer.removeClass(el[index], "active");
        }
        this.renderer.removeClass(el[index], "active");
        this.renderer.removeClass(el[index], "done");
        this.renderer.removeClass(el[index], "notdone");
        this.renderer.removeClass(el[index], "final");
        if (tabname == index) {
          this.renderer.addClass(el[index], "active");
          // if (menuArr.includes(index)) {
          //   // this.renderer.removeClass(el[index], "final");
          //   this.renderer.removeClass(el[index], "notdone");
          //   this.renderer.removeClass(el[index], "final");
          //   this.renderer.addClass(el[index], "active");
          //   this.renderer.addClass(el[index], "final");
          // }
          //else {
          this.renderer.addClass(el[index], "active");
          // this.renderer.addClass(el[index], "notdone");
          //}

        } else if (index < tabname) {
          //if (!menuArr.includes(index)) {
          this.renderer.addClass(el[index], "done");
          // this.renderer.addClass(el[index], "notdone");

          // } else {

          //   this.renderer.removeClass(el[index], "notdone");
          //   this.renderer.removeClass(el[index], "final");
          //   this.renderer.addClass(el[index], "done");
          //   this.renderer.addClass(el[index], "final");


          // }
          //this.renderer.addClass(el[index], "done");
        }
      });
    } catch (error) {
      console.log(error);
    }
  }


  public wizardBuilder() {
    const url = "https://uatvendor.myndsolution.com/api/meta_data";
    const payload = {
      "event_name": localStorage.getItem("event_name")
    }
    this.httpService.getData(url, payload).subscribe(
      (response) => {
        this.formMetaResponse = response.data.form
        for (var val in this.formMetaResponse) {
          const payload =
          {
            formName: localStorage.getItem("event_name"),
            control_name: this.formMetaResponse[val].name,
            label: this.formMetaResponse[val].name,
            menu_sequence: Number(val) + 1,
            menu_position: Number(val),
            data_step_target: "step3",
            spClass: "fa fa-building-o"
          }
          this.wizardMenuArr.push(payload)
        }
      },
      (error) => {
        console.log(error.error)

      }
    )
  }


}
