import { AfterContentInit, AfterViewInit, Component, DoCheck, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, Renderer2, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-mf-wizard',
  templateUrl: './mf-wizard.component.html',
  styleUrls: ['./mf-wizard.component.css']
})

export class MfWizardComponent implements OnInit, AfterViewInit {
  constructor(private renderer: Renderer2, private elRef: ElementRef) {
  }
  @Input() formProp: any;
  //frm: FormGroup = this.formBuilder.group({});
  @Output() wizardClick: EventEmitter<any> = new EventEmitter();
  @Output() res: EventEmitter<any> = new EventEmitter();
  @Output() formValid: EventEmitter<any> = new EventEmitter();


  changeMenu(value: any) {
    //console.log(value)

  }
  //this function call when click on wizard menu like Basic,document ..etc
  activeMenu(data: any) {
    
    this.res.emit(data);
  }
  ngOnInit() {
    this.formProp = this.formProp.sort((n1: any, n2: any) => n1.menu_sequence - n2.menu_sequence);
    
  }
  
  ngAfterViewInit() {
    
    setTimeout(() => {
      this.activeMenu(0);
    }, 2000);

  }
  
  // active/inactive wizard menu
  //----------------------Begin---------------------------
  activeTab(tabname: any) {

    let el = this.elRef.nativeElement
      .querySelector(".menuwizard")
      .querySelector("ul")
      .querySelectorAll("li");
    el.forEach((value: any, index: any) => {
      this.renderer.removeClass(el[index], "active");
      // this.renderer.removeClass(el[index], "done");
      if (tabname == index) {
        this.renderer.addClass(el[index], "active");
        this.renderer.addClass(el[index], "done");
      } else if (index < tabname) {
        // this.renderer.addClass(el[index], "done");
      }
    });
  }
  //----------------------End-----------------------------
}
