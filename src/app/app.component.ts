import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CalcService } from './calc.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  subscribeForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required])
  });
  subbed;
  navbar;
  header;
  @ViewChild('videocontainer') container: ElementRef;
  width: any;
  scrollWidth: any;
  oneWidth: any;
  service;
  timer;
  
  //vars for the responsive slide touch event listener
  snapValuesArr = [];
  otherArr = [];
  holdArr;
  index;
  
  childCount;

  constructor(_calcService: CalcService) {
    this.service = _calcService;
  }

  ngAfterViewInit() {
    //holds the amount of video divs
    this.childCount = this.container.nativeElement.childElementCount;
    //updates the service with the childCount
    this.service.setChildCount(this.childCount);

    ///here this is only to send the first snap values of the width of the container to an array
    this.width = this.container.nativeElement.scrollLeft;
    this.scrollWidth = this.container.nativeElement.scrollWidth;
    this.oneWidth = this.scrollWidth / this.childCount;

    for(let i = 0; i < this.childCount; i++) {
      if(this.otherArr.length > 2) {
        this.otherArr.shift();
      }
      let firstValue = this.oneWidth * i;
      this.otherArr.push(firstValue); 
      this.service.setArr(firstValue);
    }
    ///end of block

    /////Here is only if there a a resize
    window.addEventListener('resize', (e) => {
          if(this.timer != null) {
            clearTimeout(this.timer);
          }
          let mql = window.matchMedia("(min-width: 871px)")
        
          this.timer = setTimeout(() => {
          
            if(mql.matches) {
              this.container.nativeElement.classList.remove('animation');
            }
            
            this.width = this.container.nativeElement.scrollLeft;
            this.scrollWidth = this.container.nativeElement.scrollWidth;
            this.oneWidth = this.scrollWidth / this.childCount;
            this.container.nativeElement.classList.add('animation');
    
            for(let i = 0; i < this.childCount; i++) {
              if(this.otherArr.length > 2) {
                this.otherArr.shift();
              }
            
            let snapValue = this.oneWidth * i;
            this.otherArr.push(snapValue); 
            this.service.setArr(snapValue);
            }
            this.holdArr = this.service.getArr()
        
            for(let j = 0; j < this.holdArr.length - 3; j++) {
              if(this.width == this.holdArr[j]) {
                this.index = this.holdArr.indexOf(this.holdArr[j]);
              }
            }
            this.container.nativeElement.scrollLeft = this.holdArr[this.index + 3];
            
          }, 0);
      
      
    });
 
    document.querySelector('.vid').addEventListener('mousedown', (e: any) => {
      this.width = this.container.nativeElement.scrollLeft;
      this.scrollWidth = this.container.nativeElement.scrollWidth;
      this.oneWidth = this.scrollWidth / this.childCount;
  
      //array hold the scroll left values that the arrows and the circles snap to
      for(let i = 0; i < this.childCount; i++) {
        if(this.snapValuesArr.length > 2) {
          this.snapValuesArr.shift();
        }
      let snapValue = this.oneWidth * i;
      this.snapValuesArr.push(snapValue); 
      }

      let mouseX1, mouseX2; 
      mouseX1 = e.clientX;

      let drag = (e) => {
        if(mouseX1 < e.clientX) { //going right
          mouseX2 = e.clientX - mouseX1;
          if(mouseX2 > 0) {
          
            setTimeout(() => {
              this.service.slideRight(this.container, this.width, this.snapValuesArr);
              stopDrag();
              document.onmouseup = stopMouse;
            }, 300);

          }
        } else { //going left
          mouseX2 = mouseX1 - e.clientX;
          if(mouseX2 > 0) {
            
            setTimeout(() => {
              this.service.slideLeft(this.container, this.width, this.snapValuesArr);
              stopDrag();
              document.onmouseup = stopMouse;  
            }, 300);

          }
        }
      }
      
      document.onmousemove = drag;
      document.onmousedown = null;
    });


    function stopDrag() {
      document.onmousemove = null;
    }

    function stopMouse() {
      document.onmouseup = null;
      document.onmousemove = null;
    }



    let responsiveSlide = (e) => {
     
      //for loop only to add snap values to an array, to keep code separate and readable
      for(let i = 0; i < this.childCount; i++) {
        if(this.snapValuesArr.length > 2) {
          this.snapValuesArr.shift();
        }
        let snapValue = this.oneWidth * i;
        this.snapValuesArr.push(snapValue);
      }

      this.width = this.container.nativeElement.scrollLeft;
      this.scrollWidth = this.container.nativeElement.scrollWidth;
      this.oneWidth = this.scrollWidth / this.childCount;
      let touchX1, touchX2;
      touchX1 = e.touches[0].clientX;
      
      let touchDrag = (e) => {
          if(touchX1 < e.touches[0].clientX) { //going left
            touchX2 = e.touches[0].clientX - touchX1;
            if(touchX2 > 80) {
              setTimeout(() => {
                this.service.touchLeft(this.container, this.width, this.snapValuesArr);
              }, 60);
               
            }
           
            
          } else { //going right
            touchX2 = touchX1 - e.touches[0].clientX;
            if(touchX2 > 80) {
              setTimeout(() => {
                this.service.touchRight(this.container, this.width, this.snapValuesArr);
            }, 60);
          
           }

          }
        }
      document.ontouchmove = touchDrag;
    }

    document.querySelector('.vid').addEventListener('touchstart', responsiveSlide); 
    
  }

 
  openNav(event) {
      this.navbar = event.target.parentElement.parentElement.firstChild.lastChild;
      this.header = event.target.parentElement.parentElement.firstChild;
      if(this.navbar.style.visibility == 'hidden') {
        this.navbar.style.visibility = 'visible';
        this.header.style.height = '280px';
        this.navbar.addEventListener('click', (e) => {
          if(e.target.className == 'nav-link') {
            this.navbar.style.visibility = 'hidden';
            this.header.style.height = '80px';
          }
        });
      } else {
        this.navbar.style.visibility = 'hidden';
        this.header.style.height = '80px';
      }

      
  }



  closeNav() {
    if(this.header.style.height == '280px') {
      this.header.style.height = '80px';
      this.navbar.style.visibility = 'hidden';
    }
  }

  onSubmit() {
    this.subbed = this.subscribeForm.value.email;
  }

  slideLeft() {
    this.service.buttonSlideLeft(this.container);
  }

  slideRight() {
    this.service.buttonSlideRight(this.container);
  }

  move(event) {
    this.service.circleSlide(this.container, event.target.id);
  }

}
