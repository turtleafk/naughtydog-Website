import { Injectable } from '@angular/core';

@Injectable()
export class CalcService {
    width;
    scrollWidth;
    oneWidth;
    childCount;
    childCountString;
    snapValuesArr = [];
    indexArr = [];
    index;
  timer;
    
    //sets the amount of video divs
    setChildCount(x) {
      this.childCount = x;
    }

    pause(div, x) {
      let iframe = div.nativeElement.children[x].firstChild;
      let iframesrc = iframe.src;
      iframe.src = iframesrc;
    }

    setArr(arr) {
      this.indexArr.push(arr);
    }

    getArr() {
      if(this.indexArr.length > 6) {
        this.indexArr.splice(0, 3);
      }
      
      return this.indexArr;
    }

    slideLeft(div, value, arr) {
      if(this.timer != null) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.width = div.nativeElement.scrollLeft;
        
        for(let i = 0; i < this.childCount; i++) {
          if(value == arr[i] && arr[i] == arr[this.childCount - 1]) {
            this.width = arr[0];
            this.pause(div, this.childCount - 1);
            div.nativeElement.scrollLeft = this.width;
            return this.width = div.nativeElement.scrollLeft;

          } else if(value == arr[i]) { 
            this.width = arr[i + 1];
            this.pause(div, i);
            div.nativeElement.scrollLeft = this.width;
            return this.width = div.nativeElement.scrollLeft;
          }
        }
      }, 30);
      
    }


    slideRight(div, value, arr) {
      if(this.timer != null) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.width = div.nativeElement.scrollLeft;

        for(let i = 0; i < this.childCount; i++) {
          if(value == arr[i] && arr[i] == 0) {
            this.width = arr[this.childCount - 1];
            this.pause(div, i);
            div.nativeElement.scrollLeft = this.width;
            return this.width = div.nativeElement.scrollLeft;

          } else if(value == arr[i + 1]) { 
            this.width = arr[i];
            this.pause(div, i + 1);
            div.nativeElement.scrollLeft = this.width;
            return this.width = div.nativeElement.scrollLeft;
          }
        }
      }, 30);
      
    }
     
    touchRight(div, value, arr) {
      if(this.timer != null) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.width = div.nativeElement.scrollLeft;

        for(let i = 0; i < this.childCount; i++) {
          if(value == arr[i] && arr[i] == arr[this.childCount - 1]) {
            this.width = arr[0];
            this.pause(div, this.childCount - 1);
            div.nativeElement.scrollLeft = this.width;
            return this.width = div.nativeElement.scrollLeft;

          } else if(value == arr[i]) { 
            this.width = arr[i + 1];
            this.pause(div, i);
            div.nativeElement.scrollLeft = this.width;
            return this.width = div.nativeElement.scrollLeft;
          }
        }
      }, 20);
    }

    touchLeft(div, value, arr) {
      if(this.timer != null) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.width = div.nativeElement.scrollLeft;

        for(let i = 0; i < this.childCount; i++) {
          if(value == arr[i] && arr[i] == 0) {
            this.width = arr[this.childCount - 1];
            this.pause(div, i);
            div.nativeElement.scrollLeft = this.width;
            return this.width = div.nativeElement.scrollLeft;

          } else if(value == arr[i + 1]) { 
            this.width = arr[i];
            this.pause(div, i + 1);
            div.nativeElement.scrollLeft = this.width;
            return this.width = div.nativeElement.scrollLeft;
          }
        }
      }, 20);
    }

    buttonSlideLeft(div) {
        this.width = div.nativeElement.scrollLeft;
        this.scrollWidth = div.nativeElement.scrollWidth;
        this.oneWidth = this.scrollWidth / this.childCount;

        for(let i = 0; i < this.childCount; i++) {
          if(this.width == this.oneWidth * i) {       //checks if the current scroll value is equal the fraction of the whole width times the child count or below
            
            if(i == 0) {    //checks if i is at 0 so it can move it up to child count - 2
              this.width = this.oneWidth * (this.childCount - 1);   //moves the scroll value up to the max value if at 0
              this.pause(div, i);
            } else {
              this.width = this.oneWidth * (i - 1); // if scroll value is == 2400, it will make the scroll value a fraction lower
              this.pause(div, i);
            }
            return div.nativeElement.scrollLeft = this.width;
            
          }
        }
    }

    buttonSlideRight(div) {
        this.width = div.nativeElement.scrollLeft;
        this.scrollWidth = div.nativeElement.scrollWidth;
        this.oneWidth = this.scrollWidth / this.childCount;

        for(let i = 0; i < this.childCount; i++) {
          if(this.width == this.oneWidth * i) { //checking if the current scroll value is equal to a fraction multiplied by the current iteration
            
            if(i == this.childCount - 1) {      //check if the scroll value is at the max value
              this.width = this.oneWidth * 0;   //resets the scroll to 0 again
              this.pause(div, this.childCount - 1);
            } else {
              this.width = this.oneWidth * (i + 1);
              this.pause(div, i);
            }
            div.nativeElement.scrollLeft = this.width;
            
            return this.width = div.nativeElement.scrollLeft;
            
          }
        }
    }


}