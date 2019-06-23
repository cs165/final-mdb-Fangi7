//
// TODO(you): Add the JavaScript necessary to complete your final project.
//
class Menu {
  constructor() {

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    
    this.show();
  }
  // TODO(you): Add methods as necessary.
    show(){
        const createbtnElement = document.querySelector('#createbtn');
        createbtnElement.addEventListener('click',this.hide);
        console.log('show Menu');
 
       const newDiary = new Diary();

    }   
    hide(){
        console.log('hide Menu');
        const mainPageElement = document.querySelector('#main-page');
        const diaryPageElement = document.querySelector('#diary-page');
        mainPageElement.classList.add('inactive');
        diaryPageElement.classList.remove('inactive');
    }

}
    
